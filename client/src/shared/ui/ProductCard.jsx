import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addGuestItem } from '../../features/cart/cartSlice.js';
import { toggleWishlistItem } from '../../features/wishlist/wishlistSlice.js';

export function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wished = useSelector((state) => state.wishlist.items.some((item) => item._id === product._id));
  const variant = product.variants?.[0];
  const price = variant?.price || product.pricing?.sale || product.pricing?.base;

  const addToCart = () => {
    dispatch(addGuestItem({
      productId: product._id,
      title: product.title,
      sku: variant?.sku || product.slug,
      price,
      image: product.images?.[0]?.url,
      quantity: 1
    }));
    toast.success(`${product.title} added to cart`);
  };

  const toggleWishlist = () => {
    dispatch(toggleWishlistItem(product));
    toast.success(wished ? `${product.title} removed from wishlist` : `${product.title} saved to wishlist`);
  };

  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group border border-noir-border bg-noir-card"
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-noir-surface">
          <img
            src={product.images?.[0]?.url}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute left-3 top-3 border border-white/20 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.16em]">
            {product.gender}
          </div>
        </div>
      </Link>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-lg font-semibold">{product.title}</h3>
            <p className="mt-1 text-sm text-noir-muted">{product.categories?.join(' / ')}</p>
          </div>
          <p className="font-semibold">${product.pricing?.sale || product.pricing?.base}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {product.variants?.slice(0, 4).map((variant) => (
              <span
                key={variant.sku}
                title={variant.color}
                className="size-4 border border-white/20"
                style={{ backgroundColor: variant.hex || '#A1A1AA' }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              onClick={toggleWishlist}
              className={`grid size-9 place-items-center border transition ${wished ? 'border-noir-accent bg-noir-accent text-noir-bg' : 'border-noir-border hover:border-noir-accent'}`}
            >
              <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
            </button>
            <button type="button" aria-label="Add to cart" onClick={addToCart} className="grid size-9 place-items-center bg-noir-accent text-noir-bg transition hover:bg-white">
              <ShoppingBag size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
