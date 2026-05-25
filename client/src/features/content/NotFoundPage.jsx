import { Link } from 'react-router-dom';
import { Seo } from '../../shared/ui/Seo.jsx';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="404 | NOIRTHREAD" description="Page not found." path="/404" />
      <section className="noir-container grid min-h-[70vh] place-items-center text-center">
        <div>
          <p className="font-heading text-8xl font-bold">404</p>
          <h1 className="mt-4 font-heading text-4xl font-bold">This thread is no longer in the collection.</h1>
          <Link to="/shop" className="mt-8 inline-block bg-noir-accent px-6 py-4 font-semibold text-noir-bg">Return to shop</Link>
        </div>
      </section>
    </>
  );
}
