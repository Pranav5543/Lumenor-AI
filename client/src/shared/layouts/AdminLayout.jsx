import { BarChart3, Boxes, TicketPercent, Users } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { label: 'Analytics', icon: BarChart3, to: '/admin' },
  { label: 'Products', icon: Boxes, to: '/admin?panel=products' },
  { label: 'Customers', icon: Users, to: '/admin?panel=customers' },
  { label: 'Coupons', icon: TicketPercent, to: '/admin?panel=coupons' }
];

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-noir-bg text-noir-text lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="sticky top-0 hidden h-screen border-r border-noir-border bg-noir-surface/90 p-6 lg:block">
        <div className="font-heading text-2xl font-bold tracking-tight">NOIRTHREAD</div>
        <p className="mt-2 text-sm text-noir-muted">Commerce operating system</p>
        <nav className="mt-10 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className="flex items-center gap-3 border border-transparent px-4 py-3 text-sm text-noir-muted transition hover:border-noir-border hover:bg-noir-card hover:text-noir-text"
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
