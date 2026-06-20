// ============================================================
// AZZURRA — SUPABASE EDGE FUNCTION: verifyPayment
// Deno runtime. Deploy via: supabase functions deploy verifyPayment
//
// Required environment variables:
//   RAZORPAY_KEY_SECRET — used to verify the HMAC signature
//   SUPABASE_SERVICE_ROLE_KEY — to update orders and payments
//
// Receives (POST JSON):
//   { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId }
// Returns:
//   { success: true, orderId } on valid signature
//   { error: "..." }         on invalid signature or failure
// ============================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { hmac } from 'https://deno.land/x/hmac@v2.0.1/mod.ts';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderId,
    } = await req.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !orderId) {
      return errorResponse('Missing required payment verification fields', 400);
    }

    // ---- Verify HMAC signature ----
    // Razorpay signature = HMAC-SHA256(razorpay_order_id + "|" + razorpay_payment_id, key_secret)
    const secret    = Deno.env.get('RAZORPAY_KEY_SECRET')!;
    const body      = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated = hmac('sha256', secret, body, 'utf8', 'hex');

    if (generated !== razorpay_signature) {
      console.error('[verifyPayment] Signature mismatch — possible tampered request.');
      return errorResponse('Payment signature verification failed. Contact support.', 400);
    }

    // ---- Signature is valid: update order and payment ----
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // 1. Update order status to 'paid'
    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', orderId);

    if (orderError) throw new Error(`Failed to update order status: ${orderError.message}`);

    // 2. Update the payment row — find by gateway_payment_id (Razorpay order ID)
    const { error: paymentError } = await supabase
      .from('payments')
      .update({
        status:             'success',
        gateway_payment_id: razorpay_payment_id,
        metadata: {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        }
      })
      .eq('order_id', orderId)
      .eq('status', 'initiated');

    if (paymentError) {
      // Non-fatal: log but don't fail the whole verification
      console.error('[verifyPayment] Failed to update payment row:', paymentError.message);
    }

    // 3. Update customer lifetime value (best-effort)
    try {
      const { data: order } = await supabase
        .from('orders')
        .select('customer_id, total_amount')
        .eq('id', orderId)
        .single();

      if (order?.customer_id) {
        await supabase.rpc('increment_customer_ltv', {
          customer_id: order.customer_id,
          amount:      order.total_amount,
        });
      }
    } catch (_) { /* ignore — LTV update is non-critical */ }

    return new Response(JSON.stringify({ success: true, orderId }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    console.error('[verifyPayment]', err);
    return errorResponse(err.message, 500);
  }
});

function errorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    status,
  });
}
