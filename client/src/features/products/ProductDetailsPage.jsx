import { Check, Heart, Minus, Plus, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Seo } from '../../shared/ui/Seo.jsx';
import { fallbackProducts } from '../../data/fallbackProducts.js';
import { useProductQuery, useRecommendationsQuery } from '../../store/api.js';
import { addGuestItem } from '../cart/cartSlice.js';
import { toggleWishlistItem } from '../wishlist/wishlistSlice.js';
import { ProductCard } from '../../shared/ui/ProductCard.jsx';

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { data } = useProductQuery(slug);
  const { data: recommendations } = useRecommendationsQuery();
  const product = data?.product || fallbackProducts.find((item) => item.slug === slug) || fallbackProducts[0];
  const [variant, setVariant] = useState(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const similar = useMemo(() => recommendations?.items || fallbackProducts.filter((item) => item.slug !== product.slug).slice(0, 3), [recommendations, product.slug]);

  return (
    <>
      <Seo title={`${product.title} | NOIRTHREAD`} description={product.description} path={`/products/${product.slug}`} />
      <section className="noir-container grid gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {[product.images?.[0]?.url, product.images?.[0]?.url].map((image, index) => (
            <motion.div key={index} whileHover={{ scale: 0.985 }} className="overflow-hidden bg-noir-card">
              <img src={image} alt={product.title} className="aspect-[3/4] h-full w-full object-cover transition duration-700 hover:scale-110" />
            </motion.div>
          ))}
        </div>
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-sm uppercase tracking-[0.24em] text-noir-muted">{product.categories?.join(' / ')}</p>
          <h1 className="mt-4 font-heading text-5xl font-bold leading-tight">{product.title}</h1>
          <div className="mt-5 flex items-center gap-3 text-sm text-noir-muted">
            <Star size={16} fill="currentColor" /> {product.ratings?.average} ({product.ratings?.count} reviews)
          </div>
          <p className="mt-6 text-lg leading-8 text-noir-muted">{product.description}</p>
          <p className="mt-8 text-3xl font-semibold">${variant?.price || product.pricing?.sale || product.pricing?.base}</p>
          <div className="mt-8">
            <p className="text-sm uppercase tracking-[0.18em] text-noir-muted">Color / size</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.variants?.map((item) => (
                <button
                  key={item.sku}
                  onClick={() => setVariant(item)}
                  className={`flex items-center justify-between border p-4 text-left transition ${variant?.sku === item.sku ? 'border-noir-accent bg-noir-card' : 'border-noir-border bg-noir-surface'}`}
                >
                  <span>{item.color} / {item.size}</span>
                  {variant?.sku === item.sku && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="grid size-12 place-items-center border border-noir-border"><Minus /></button>
            <span className="grid size-12 place-items-center border border-noir-border">{quantity}</span>
            <button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)} className="grid size-12 place-items-center border border-noir-border"><Plus /></button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <button
              onClick={() => {
                dispatch(addGuestItem({ productId: product._id, title: product.title, sku: variant?.sku, price: variant?.price || product.pricing.base, image: product.images[0].url, quantity }));
                toast.success(`${product.title} added to cart`);
              }}
              className="bg-noir-accent px-6 py-4 font-semibold text-noir-bg"
            >
              Add to cart
            </button>
            <button
              aria-label="Wishlist"
              onClick={() => {
                dispatch(toggleWishlistItem(product));
                toast.success(`${product.title} wishlist updated`);
              }}
              className="grid size-14 place-items-center border border-noir-border"
            >
              <Heart />
            </button>
          </div>
        </aside>
      </section>

      <section className="noir-container pb-20">
        <h2 className="font-heading text-3xl font-bold">Recommended by behavior</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((item) => <ProductCard key={item._id} product={item} />)}
        </div>
      </section>
    </>
  );
}
