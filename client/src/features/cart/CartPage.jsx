import { Minus, Plus, Trash2 } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Seo } from '../../shared/ui/Seo.jsx';
import { updateGuestQuantity } from './cartSlice.js';

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.guestItems);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.0825;
  const shipping = subtotal > 500 ? 0 : 18;
  const total = subtotal + tax + shipping;

  return (
    <>
      <Seo title="Cart | NOIRTHREAD" description="Review your NOIRTHREAD cart and continue to checkout." path="/cart" />
      <section className="noir-container grid gap-10 py-12 lg:grid-cols-[1fr_400px] lg:py-20">
        <div>
          <h1 className="font-heading text-5xl font-bold">Cart</h1>
          <div className="mt-8 grid gap-4">
            {items.length === 0 && <p className="border border-noir-border bg-noir-surface p-8 text-noir-muted">Your cart is waiting for something precise.</p>}
            {items.map((item) => (
              <article key={item.sku} className="grid grid-cols-[96px_1fr_auto] gap-4 border border-noir-border bg-noir-surface p-4">
                <img src={item.image} alt={item.title} className="aspect-[3/4] object-cover" />
                <div>
                  <h2 className="font-heading text-xl font-semibold">{item.title}</h2>
                  <p className="mt-1 text-sm text-noir-muted">{item.sku}</p>
                  <div className="mt-4 flex w-fit items-center border border-noir-border">
                    <button aria-label="Decrease quantity" onClick={() => dispatch(updateGuestQuantity({ sku: item.sku, quantity: item.quantity - 1 }))} className="grid size-10 place-items-center"><Minus size={15} /></button>
                    <span className="grid size-10 place-items-center border-x border-noir-border">{item.quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => dispatch(updateGuestQuantity({ sku: item.sku, quantity: item.quantity + 1 }))} className="grid size-10 place-items-center"><Plus size={15} /></button>
                  </div>
                </div>
                <button
                  aria-label="Remove item"
                  onClick={() => {
                    dispatch(updateGuestQuantity({ sku: item.sku, quantity: 0 }));
                    toast.success(`${item.title} removed from cart`);
                  }}
                >
                  <Trash2 />
                </button>
              </article>
            ))}
          </div>
        </div>
        <aside className="h-fit border border-noir-border bg-noir-card p-6 lg:sticky lg:top-28">
          <h2 className="font-heading text-2xl font-bold">Order summary</h2>
          <Summary label="Subtotal" value={subtotal} />
          <Summary label="Tax" value={tax} />
          <Summary label="Shipping" value={shipping} />
          <Summary label="Total" value={total} strong animated />
          <Link to="/checkout" className={`mt-6 block py-4 text-center font-semibold ${items.length ? 'bg-noir-accent text-noir-bg' : 'pointer-events-none bg-noir-border text-noir-muted'}`}>Checkout</Link>
        </aside>
      </section>
    </>
  );
}

function Summary({ label, value, strong, animated }) {
  return (
    <div className={`mt-4 flex justify-between border-t border-noir-border pt-4 ${strong ? 'text-xl font-bold' : 'text-noir-muted'}`}>
      <span>{label}</span>
      {animated ? <AnimatedMoney value={value} /> : <span>${value.toFixed(2)}</span>}
    </div>
  );
}

function AnimatedMoney({ value }) {
  const spring = useSpring(value, { stiffness: 180, damping: 26 });
  const display = useTransform(spring, (latest) => `$${latest.toFixed(2)}`);
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  return <motion.span>{display}</motion.span>;
}
