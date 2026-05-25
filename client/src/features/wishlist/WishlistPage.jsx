import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Seo } from '../../shared/ui/Seo.jsx';
import { addGuestItem } from '../cart/cartSlice.js';
import { removeWishlistItem } from './wishlistSlice.js';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);

  const moveToCart = (product) => {
    const variant = product.variants?.[0];
    dispatch(addGuestItem({
      productId: product._id,
      title: product.title,
      sku: variant?.sku || product.slug,
      price: variant?.price || product.pricing?.sale || product.pricing?.base,
      image: product.images?.[0]?.url,
      quantity: 1
    }));
    toast.success(`${product.title} added to cart`);
  };

  return (
    <>
      <Seo title="Wishlist | NOIRTHREAD" description="Saved NOIRTHREAD pieces." path="/wishlist" />
      <section className="noir-container min-h-[70vh] py-16">
        <Heart />
        <h1 className="mt-4 font-heading text-5xl font-bold">Wishlist</h1>
        <p className="mt-4 text-noir-muted">Saved pieces sync across devices and feed recommendation scoring.</p>
        {items.length === 0 ? (
          <p className="mt-8 border border-noir-border bg-noir-surface p-8 text-noir-muted">No saved pieces yet. Tap the heart on any product to build your edit.</p>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((product) => (
              <article key={product._id} className="border border-noir-border bg-noir-surface p-4">
                <img src={product.images?.[0]?.url} alt={product.title} className="aspect-[3/4] w-full object-cover" />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl font-semibold">{product.title}</h2>
                    <p className="mt-1 text-sm text-noir-muted">{product.categories?.join(' / ')}</p>
                  </div>
                  <p className="font-semibold">${product.pricing?.sale || product.pricing?.base}</p>
                </div>
                <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">
                  <button onClick={() => moveToCart(product)} className="inline-flex items-center justify-center gap-2 bg-noir-accent py-3 font-semibold text-noir-bg">
                    <ShoppingBag size={16} /> Add to cart
                  </button>
                  <button
                    aria-label="Remove from wishlist"
                    onClick={() => {
                      dispatch(removeWishlistItem(product._id));
                      toast.success(`${product.title} removed`);
                    }}
                    className="grid size-12 place-items-center border border-noir-border"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
