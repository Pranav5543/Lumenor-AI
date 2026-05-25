import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Seo } from '../../shared/ui/Seo.jsx';
import { ProductCard } from '../../shared/ui/ProductCard.jsx';
import { fallbackProducts } from '../../data/fallbackProducts.js';

const heroImage = 'https://res.cloudinary.com/dw7cppuwq/image/upload/v1779693187/photo-1509631179647-0177331693ae_rlm0mg.avif';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <>
      <Seo
        title="NOIRTHREAD | Premium Fashion Commerce"
        description="Dark luxury essentials, cinematic shopping, and modern fashion commerce engineering."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'NOIRTHREAD',
          url: 'https://noirthread.vercel.app'
        }}
      />
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        <motion.img
          src={heroImage}
          alt="NOIRTHREAD editorial campaign"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-noir-bg/45 to-noir-bg" />
        <div className="noir-container relative z-10 flex min-h-[calc(100vh-80px)] flex-col justify-end pb-20 pt-28">
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-sm uppercase tracking-[0.36em] text-noir-muted">
            engineered luxury / 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-6 max-w-6xl font-heading text-[clamp(4rem,12vw,12rem)] font-bold leading-[0.86] tracking-tight text-balance"
          >
            NOIRTHREAD
          </motion.h1>
          <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-xl text-lg leading-8 text-noir-muted">
              A premium fashion platform for people who treat restraint as a statement. Matte surfaces, sculptural silhouettes, and commerce that moves with intent.
            </p>
            <Link to="/shop" className="inline-flex w-fit items-center gap-3 bg-noir-accent px-6 py-4 font-semibold text-noir-bg transition hover:bg-white">
              Enter collection <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="noir-container grid gap-4 py-16 md:grid-cols-3">
        {[
          ['Private Client Service', 'Concierge sizing and priority support.', ShieldCheck],
          ['Responsible Materials', 'Traceable wool, silk, and technical blends.', Sparkles],
          ['Express Fulfillment', 'Carbon-aware shipping with recovery flows.', Truck]
        ].map(([title, copy, Icon]) => (
          <motion.div
            key={title}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            viewport={{ once: true, margin: '-80px' }}
            className="border border-noir-border bg-noir-surface p-6"
          >
            <Icon className="text-noir-accent" />
            <h2 className="mt-8 font-heading text-2xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-noir-muted">{copy}</p>
          </motion.div>
        ))}
      </section>

      <section className="border-y border-noir-border bg-noir-surface py-20">
        <div className="noir-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-noir-muted">Featured edit</p>
            <h2 className="mt-4 font-heading text-5xl font-bold leading-tight md:text-7xl">Quiet clothes with sharp presence.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {fallbackProducts.slice(0, 2).map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="noir-container grid gap-10 py-24 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid grid-cols-2 gap-4">
          {fallbackProducts.map((product, index) => (
            <motion.img
              key={product._id}
              src={product.images[0].url}
              alt={product.title}
              loading="lazy"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              viewport={{ once: true }}
              className="aspect-[3/4] w-full object-cover even:mt-12"
            />
          ))}
        </div>
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-sm uppercase tracking-[0.26em] text-noir-muted">Lookbook</p>
          <h2 className="mt-4 font-heading text-4xl font-bold md:text-6xl">Designed for evening flights, late dinners, and precise first impressions.</h2>
          <p className="mt-6 text-lg leading-8 text-noir-muted">
            Every surface is deliberately quiet. Every interaction is engineered to feel fast, considered, and premium.
          </p>
        </div>
      </section>

      <section className="bg-noir-card py-20">
        <div className="noir-container grid gap-6 md:grid-cols-3">
          {['Founder-grade polish.', 'The smoothest fashion checkout I have used.', 'Feels like a real brand from the first scroll.'].map((quote) => (
            <blockquote key={quote} className="border border-noir-border bg-noir-bg p-8 text-xl leading-8">
              “{quote}”
              <footer className="mt-8 text-sm uppercase tracking-[0.18em] text-noir-muted">NOIR private client</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
