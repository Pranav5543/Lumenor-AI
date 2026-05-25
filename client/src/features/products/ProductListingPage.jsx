import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useProductsQuery } from '../../store/api.js';
import { fallbackProducts } from '../../data/fallbackProducts.js';
import { ProductCard } from '../../shared/ui/ProductCard.jsx';
import { Seo } from '../../shared/ui/Seo.jsx';

export default function ProductListingPage() {
  const [searchParams] = useSearchParams();
  const collectionMode = searchParams.get('featured') === 'true';
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(collectionMode ? 'Featured' : 'All');
  const [sort, setSort] = useState('trending');
  const { data, isLoading } = useProductsQuery({ search: query, category, sort });
  const products = data?.items?.length ? data.items : fallbackProducts;
  const categories = collectionMode
    ? ['Featured', 'Trending', 'Atelier', 'Technical', 'Resort']
    : ['All', ...new Set(fallbackProducts.flatMap((product) => product.categories))];

  const filtered = useMemo(() => {
    return products
      .filter((product) => {
        if (category === 'All') return true;
        if (category === 'Featured') return product.featured;
        if (category === 'Trending') return product.trending;
        return product.categories.includes(category);
      })
      .filter((product) => product.title.toLowerCase().includes(query.toLowerCase()) || product.tags.join(' ').includes(query.toLowerCase()))
      .sort((a, b) => sort === 'price-asc' ? a.pricing.base - b.pricing.base : Number(b.trending) - Number(a.trending));
  }, [products, category, query, sort]);

  return (
    <>
      <Seo
        title={collectionMode ? 'Collections | NOIRTHREAD' : 'Shop NOIRTHREAD'}
        description={collectionMode ? 'Explore curated NOIRTHREAD collections and featured edits.' : 'Explore premium outerwear, tailoring, knitwear, dresses, and technical essentials.'}
        path={collectionMode ? '/shop?featured=true' : '/shop'}
      />
      <section className="noir-container py-12 md:py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-noir-muted">{collectionMode ? 'Curated collection system' : 'Product system'}</p>
            <h1 className="mt-4 font-heading text-5xl font-bold md:text-7xl">{collectionMode ? 'Featured collections' : 'Shop the edit'}</h1>
            <p className="mt-4 max-w-2xl text-noir-muted">
              {collectionMode
                ? 'Founder-level edits grouped by story, styling intent, and behavioral demand.'
                : 'Browse the full catalog with search, categories, sorting, wishlist, and instant cart actions.'}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search silhouettes, tags, materials"
              className="w-full border border-noir-border bg-noir-surface px-4 py-3 text-sm outline-none transition focus:border-noir-accent sm:w-80"
            />
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="border border-noir-border bg-noir-surface px-4 py-3 text-sm">
              <option value="trending">Trending</option>
              <option value="price-asc">Price low to high</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          <SlidersHorizontal className="mt-3 shrink-0 text-noir-muted" size={18} />
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 border px-4 py-2 text-sm transition ${category === item ? 'border-noir-accent bg-noir-accent text-noir-bg' : 'border-noir-border bg-noir-surface text-noir-muted hover:text-noir-text'}`}
            >
              {item}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => <div key={index} className="aspect-[3/4] bg-noir-card shimmer" />)
            : filtered.map((product) => <ProductCard key={product._id} product={product} />)}
        </motion.div>
        {!isLoading && filtered.length === 0 && (
          <p className="mt-10 border border-noir-border bg-noir-surface p-8 text-noir-muted">No pieces matched that selection.</p>
        )}
      </section>
    </>
  );
}
  useEffect(() => {
    setCategory(collectionMode ? 'Featured' : 'All');
  }, [collectionMode]);
