import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-noir-border bg-noir-bg pb-24 pt-16 lg:pb-10">
      <div className="noir-container grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight">NOIRTHREAD</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-noir-muted">
            Precision essentials, engineered silhouettes, and a commerce experience built for the pace of modern luxury.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-noir-muted">
          <Link to="/shop">Shop</Link>
          <Link to="/account">Account</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div className="grid gap-3 text-sm text-noir-muted">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
