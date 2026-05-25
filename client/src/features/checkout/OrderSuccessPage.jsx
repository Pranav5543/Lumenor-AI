import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '../../shared/ui/Seo.jsx';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  return (
    <>
      <Seo title="Order confirmed | NOIRTHREAD" description="Your NOIRTHREAD order has been confirmed." path={`/order-success/${orderId}`} />
      <section className="noir-container grid min-h-[76vh] place-items-center py-16 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl border border-noir-border bg-noir-surface p-10">
          <CheckCircle2 className="mx-auto text-noir-success" size={56} />
          <h1 className="mt-6 font-heading text-5xl font-bold">Order confirmed</h1>
          <p className="mt-4 text-noir-muted">Invoice generation, order email, and shipment timeline are queued for {orderId}.</p>
          <Link to="/account" className="mt-8 inline-block bg-noir-accent px-6 py-4 font-semibold text-noir-bg">Track order</Link>
        </motion.div>
      </section>
    </>
  );
}
