import { CreditCard, MapPin, Minus, PackageCheck, Plus, Tag } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Seo } from '../../shared/ui/Seo.jsx';
import { updateGuestQuantity } from '../cart/cartSlice.js';

const steps = ['Address', 'Payment', 'Review'];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.guestItems);
  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.max(0, subtotal - discount) * 0.0825;
    const shipping = subtotal > 500 || subtotal === 0 ? 0 : 18;
    return { subtotal, tax, shipping, discount, total: Math.max(0, subtotal - discount) + tax + shipping };
  }, [discount, items]);

  const complete = () => {
    if (!items.length) {
      toast.error('Add a product before placing an order');
      return;
    }
    toast.loading('Authorizing payment...', { id: 'checkout' });
    setTimeout(() => navigate('/order-success/NT-2026-0427'), 500);
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === 'NOIR10') {
      setDiscount(totals.subtotal * 0.1);
      toast.success('NOIR10 applied');
    } else if (code === 'ATELIER75') {
      setDiscount(Math.min(75, totals.subtotal));
      toast.success('ATELIER75 applied');
    } else {
      setDiscount(0);
      toast.error('Coupon not valid for this cart');
    }
  };

  return (
    <>
      <Seo title="Checkout | NOIRTHREAD" description="Complete your premium NOIRTHREAD checkout." path="/checkout" />
      <section className="noir-container grid gap-10 py-12 lg:grid-cols-[1fr_380px] lg:py-20">
        <div>
          <h1 className="font-heading text-5xl font-bold">Checkout</h1>
          <div className="mt-8 grid grid-cols-3 border border-noir-border">
            {steps.map((item, index) => (
              <button key={item} onClick={() => setStep(index)} className={`p-4 text-sm ${step === index ? 'bg-noir-accent text-noir-bg' : 'bg-noir-surface text-noir-muted'}`}>{item}</button>
            ))}
          </div>
          <div className="mt-6 border border-noir-border bg-noir-surface p-6">
            {step === 0 && <Panel icon={MapPin} title="Delivery address" copy="Select a saved address or add a new premium delivery destination." />}
            {step === 1 && <Panel icon={CreditCard} title="Dummy payment gateway" copy="Simulate authorization, payment capture, and payment status updates." />}
            {step === 2 && <Panel icon={PackageCheck} title="Review order" copy="Inventory, coupon, tax, and shipping validation run before order creation." />}
            <button onClick={step === 2 ? complete : () => setStep(step + 1)} className="mt-8 bg-noir-accent px-6 py-4 font-semibold text-noir-bg">
              {step === 2 ? 'Place order' : 'Continue'}
            </button>
          </div>
        </div>
        <aside className="h-fit border border-noir-border bg-noir-card p-6">
          <h2 className="font-heading text-2xl font-bold">Order</h2>
          {items.length === 0 && <p className="mt-4 text-sm text-noir-muted">Your cart is empty.</p>}
          {items.map((item) => (
            <div key={item.sku} className="mt-4 border-b border-noir-border pb-4">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-noir-muted">{item.title}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <div className="mt-3 flex w-fit items-center border border-noir-border">
                <button aria-label="Decrease quantity" onClick={() => dispatch(updateGuestQuantity({ sku: item.sku, quantity: item.quantity - 1 }))} className="grid size-8 place-items-center"><Minus size={14} /></button>
                <span className="grid size-8 place-items-center border-x border-noir-border text-sm">{item.quantity}</span>
                <button aria-label="Increase quantity" onClick={() => dispatch(updateGuestQuantity({ sku: item.sku, quantity: item.quantity + 1 }))} className="grid size-8 place-items-center"><Plus size={14} /></button>
              </div>
            </div>
          ))}
          <div className="mt-5 flex gap-2">
            <label className="flex min-w-0 flex-1 items-center gap-2 border border-noir-border bg-noir-bg px-3">
              <Tag size={15} className="text-noir-muted" />
              <input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="NOIR10" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none" />
            </label>
            <button onClick={applyCoupon} className="border border-noir-border px-4 text-sm">Apply</button>
          </div>
          <Line label="Subtotal" value={totals.subtotal} />
          <Line label="Discount" value={-totals.discount} />
          <Line label="Tax" value={totals.tax} />
          <Line label="Shipping" value={totals.shipping} />
          <div className="mt-4 flex justify-between border-t border-noir-border pt-4 text-xl font-bold">
            <span>Total</span>
            <AnimatedMoney value={totals.total} />
          </div>
        </aside>
      </section>
    </>
  );
}

function Line({ label, value }) {
  return (
    <div className="mt-4 flex justify-between text-sm text-noir-muted">
      <span>{label}</span>
      <span>{value < 0 ? '-' : ''}${Math.abs(value).toFixed(2)}</span>
    </div>
  );
}

function AnimatedMoney({ value }) {
  const spring = useSpring(value, { stiffness: 190, damping: 24 });
  const display = useTransform(spring, (latest) => `$${latest.toFixed(2)}`);
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  return <motion.span>{display}</motion.span>;
}

function Panel({ icon: Icon, title, copy }) {
  return (
    <div>
      <Icon />
      <h2 className="mt-4 font-heading text-3xl font-bold">{title}</h2>
      <p className="mt-3 max-w-xl text-noir-muted">{copy}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <input placeholder="Full name" className="border border-noir-border bg-noir-bg px-4 py-3" />
        <input placeholder="Postal code" className="border border-noir-border bg-noir-bg px-4 py-3" />
      </div>
    </div>
  );
}
