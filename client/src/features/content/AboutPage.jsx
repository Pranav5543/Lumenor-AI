import { Seo } from '../../shared/ui/Seo.jsx';

export default function AboutPage() {
  return (
    <>
      <Seo title="About | NOIRTHREAD" description="NOIRTHREAD builds premium essentials with a technical fashion point of view." path="/about" />
      <section className="noir-container grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-noir-muted">Atelier system</p>
          <h1 className="mt-4 font-heading text-6xl font-bold">Luxury reduced to its strongest signal.</h1>
        </div>
        <p className="text-xl leading-9 text-noir-muted">
          NOIRTHREAD merges premium fashion restraint with modern commerce engineering. The product is built around traceable materials, cinematic browsing, data-informed personalization, and frictionless post-purchase care.
        </p>
      </section>
    </>
  );
}
