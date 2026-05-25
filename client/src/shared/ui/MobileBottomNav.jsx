import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/shop', label: 'Shop', icon: Search },
  { to: '/cart', label: 'Cart', icon: ShoppingBag },
  { to: '/account', label: 'Account', icon: User }
];

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 border-t border-noir-border bg-noir-bg/92 backdrop-blur-xl lg:hidden">
      {items.map((item) => (
        <Link key={item.label} to={item.to} className="grid place-items-center gap-1 py-3 text-[11px] text-noir-muted">
          <item.icon size={18} />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
