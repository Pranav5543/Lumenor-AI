import { Mail, MapPin, Phone } from 'lucide-react';
import { Seo } from '../../shared/ui/Seo.jsx';

export default function ContactPage() {
  return (
    <>
      <Seo title="Contact | NOIRTHREAD" description="Contact NOIRTHREAD private client support." path="/contact" />
      <section className="noir-container grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div>
          <h1 className="font-heading text-6xl font-bold">Private client desk</h1>
          <div className="mt-8 grid gap-4 text-noir-muted">
            <p className="flex gap-3"><Mail /> care@noirthread.example</p>
            <p className="flex gap-3"><Phone /> +1 212 555 0186</p>
            <p className="flex gap-3"><MapPin /> 42 Mercer Street, New York</p>
          </div>
        </div>
        <form className="border border-noir-border bg-noir-surface p-6">
          <input placeholder="Email" className="w-full border border-noir-border bg-noir-bg px-4 py-3" />
          <textarea placeholder="Message" rows="7" className="mt-4 w-full border border-noir-border bg-noir-bg px-4 py-3" />
          <button className="mt-4 bg-noir-accent px-6 py-4 font-semibold text-noir-bg">Send</button>
        </form>
      </section>
    </>
  );
}
