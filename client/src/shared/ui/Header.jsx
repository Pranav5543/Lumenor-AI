import { Dialog } from '@headlessui/react';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
  { label: 'Shop', to: '/shop' },
  { label: 'Collections', to: '/shop?featured=true' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-noir-bg/78 backdrop-blur-xl">
      <div className="noir-container flex h-20 items-center justify-between">
        <Link to="/" className="font-heading text-xl font-bold tracking-[0.16em]">NOIRTHREAD</Link>
        <nav className="hidden items-center gap-9 text-sm uppercase tracking-[0.18em] text-noir-muted lg:flex">
          {links.map((link) => (
            <NavLink className="premium-link hover:text-noir-text" key={link.label} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <IconLink to="/shop" label="Search"><Search size={18} /></IconLink>
          <IconLink to="/wishlist" label="Wishlist"><Heart size={18} /></IconLink>
          <IconLink to="/cart" label="Cart"><ShoppingBag size={18} /></IconLink>
          <IconLink to="/account" label="Account"><User size={18} /></IconLink>
        </div>
        <button aria-label="Open menu" className="lg:hidden" onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        <Dialog.Panel
          as={motion.div}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed right-0 top-0 h-full w-[86vw] border-l border-noir-border bg-noir-surface p-6 shadow-premium"
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-heading text-lg font-bold tracking-[0.16em]">NOIRTHREAD</Dialog.Title>
            <button aria-label="Close menu" onClick={() => setOpen(false)}><X /></button>
          </div>
          <nav className="mt-12 grid gap-6 text-2xl font-semibold">
            {links.map((link) => (
              <Link key={link.label} to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>
            ))}
          </nav>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

function IconLink({ to, label, children }) {
  return (
    <Link
      to={to}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center border border-noir-border bg-noir-surface transition hover:border-noir-accent hover:bg-noir-card"
    >
      {children}
    </Link>
  );
}
