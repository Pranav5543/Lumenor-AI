import { AlertTriangle, Boxes, PackagePlus, Search, TicketPercent, TrendingUp, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAdminAnalyticsQuery } from '../../store/api.js';
import { fallbackProducts } from '../../data/fallbackProducts.js';

const fallback = {
  revenue: 428600,
  orders: 1264,
  customers: 18420,
  lowStock: 9,
  series: [
    { month: 'Jan', revenue: 42000 },
    { month: 'Feb', revenue: 51000 },
    { month: 'Mar', revenue: 76000 },
    { month: 'Apr', revenue: 89000 },
    { month: 'May', revenue: 112000 }
  ],
  insights: ['Outerwear is over-indexing for recently viewed users.', 'Wishlist velocity indicates low inventory risk on Sculpt Knit Dress.', 'Collaborative scores favor technical trousers for repeat clients.']
};

export default function AdminDashboardPage() {
  const [panel, setPanel] = useState('analytics');
  const [query, setQuery] = useState('');
  const { data } = useAdminAnalyticsQuery();
  const analytics = data || fallback;
  const products = useMemo(() => fallbackProducts.filter((product) => product.title.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <section className="p-5 lg:p-10">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-noir-muted">Admin command center</p>
          <h1 className="mt-3 font-heading text-5xl font-bold">Commerce analytics</h1>
        </div>
        <button onClick={() => setPanel('products')} className="inline-flex items-center gap-2 bg-noir-accent px-5 py-3 font-semibold text-noir-bg">
          <PackagePlus size={18} /> New product
        </button>
      </div>
      <div className="mt-8 flex gap-2 overflow-x-auto">
        {[
          ['analytics', TrendingUp, 'Analytics'],
          ['products', Boxes, 'Products'],
          ['orders', PackagePlus, 'Orders'],
          ['customers', Users, 'Customers'],
          ['coupons', TicketPercent, 'Coupons']
        ].map(([key, Icon, label]) => (
          <button
            key={key}
            onClick={() => setPanel(key)}
            className={`inline-flex shrink-0 items-center gap-2 border px-4 py-3 text-sm ${panel === key ? 'border-noir-accent bg-noir-accent text-noir-bg' : 'border-noir-border bg-noir-surface text-noir-muted'}`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>
      {panel === 'analytics' && <AnalyticsPanel analytics={analytics} />}
      {panel === 'products' && <ProductsPanel products={products} query={query} setQuery={setQuery} />}
      {panel === 'orders' && <OperationsPanel title="Order management" rows={['NT-2026-0427 / paid / processing / $728.15', 'NT-2026-0428 / authorized / packed / $344.40', 'NT-2026-0429 / paid / shipped / $1,104.90']} />}
      {panel === 'customers' && <OperationsPanel title="Customer management" rows={['Private Client / 12 orders / high outerwear intent', 'Avery Stone / 4 orders / knitwear preference', 'Morgan Vale / 2 orders / checkout recovery active']} />}
      {panel === 'coupons' && <OperationsPanel title="Coupon management" rows={['NOIR10 / 10% / min $300 / 74 uses left', 'ATELIER75 / fixed $75 / VIP segment', 'FREESHIP / shipping / expiring soon']} />}
    </section>
  );
}

function AnalyticsPanel({ analytics }) {
  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <Metric label="Revenue" value={`$${analytics.revenue.toLocaleString()}`} icon={TrendingUp} />
        <Metric label="Orders" value={analytics.orders.toLocaleString()} icon={PackagePlus} />
        <Metric label="Customers" value={analytics.customers.toLocaleString()} icon={Users} />
        <Metric label="Low stock" value={analytics.lowStock} icon={AlertTriangle} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
        <article className="border border-noir-border bg-noir-surface p-6">
          <h2 className="font-heading text-2xl font-bold">Revenue performance</h2>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.series}>
                <CartesianGrid stroke="#27272A" />
                <XAxis dataKey="month" stroke="#A1A1AA" />
                <YAxis stroke="#A1A1AA" />
                <Tooltip contentStyle={{ background: '#18181B', border: '1px solid #27272A' }} />
                <Area type="monotone" dataKey="revenue" stroke="#E5E5E5" fill="#E5E5E5" fillOpacity={0.12} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="border border-noir-border bg-noir-surface p-6">
          <h2 className="font-heading text-2xl font-bold">Recommendation insights</h2>
          <div className="mt-6 grid gap-4">
            {analytics.insights.map((insight) => (
              <p key={insight} className="border border-noir-border bg-noir-bg p-4 text-sm leading-6 text-noir-muted">{insight}</p>
            ))}
          </div>
        </article>
      </div>
    </>
  );
}

function ProductsPanel({ products, query, setQuery }) {
  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_420px]">
      <article className="border border-noir-border bg-noir-surface p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="font-heading text-2xl font-bold">Product CRUD</h2>
          <label className="flex items-center gap-3 border border-noir-border bg-noir-bg px-3 py-2 text-noir-muted">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="bg-transparent text-sm outline-none" />
          </label>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-noir-muted">
              <tr>
                <th className="border-b border-noir-border py-3">Product</th>
                <th className="border-b border-noir-border py-3">Category</th>
                <th className="border-b border-noir-border py-3">Stock</th>
                <th className="border-b border-noir-border py-3">Price</th>
                <th className="border-b border-noir-border py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="border-b border-noir-border py-4 font-medium">{product.title}</td>
                  <td className="border-b border-noir-border py-4 text-noir-muted">{product.categories.join(', ')}</td>
                  <td className="border-b border-noir-border py-4">{product.stock}</td>
                  <td className="border-b border-noir-border py-4">${product.pricing.sale || product.pricing.base}</td>
                  <td className="border-b border-noir-border py-4 text-noir-success">{product.trending ? 'Trending' : 'Active'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
      <article className="border border-noir-border bg-noir-surface p-6">
        <h2 className="font-heading text-2xl font-bold">Inventory editor</h2>
        <div className="mt-6 grid gap-4">
          {['Title', 'SKU', 'Base price', 'Inventory', 'SEO title'].map((field) => (
            <input key={field} placeholder={field} className="border border-noir-border bg-noir-bg px-4 py-3 text-sm outline-none focus:border-noir-accent" />
          ))}
          <textarea placeholder="Product description" rows="5" className="border border-noir-border bg-noir-bg px-4 py-3 text-sm outline-none focus:border-noir-accent" />
          <button className="bg-noir-accent py-4 font-semibold text-noir-bg">Save product draft</button>
        </div>
      </article>
    </div>
  );
}

function OperationsPanel({ title, rows }) {
  return (
    <article className="mt-8 border border-noir-border bg-noir-surface p-6">
      <h2 className="font-heading text-2xl font-bold">{title}</h2>
      <div className="mt-6 grid gap-3">
        {rows.map((row) => (
          <div key={row} className="flex flex-col justify-between gap-3 border border-noir-border bg-noir-bg p-4 text-sm text-noir-muted md:flex-row md:items-center">
            <span>{row}</span>
            <button className="w-fit border border-noir-border px-4 py-2 text-noir-text">Manage</button>
          </div>
        ))}
      </div>
    </article>
  );
}

function Metric({ label, value, icon: Icon }) {
  return (
    <article className="border border-noir-border bg-noir-surface p-5">
      <Icon className="text-noir-muted" />
      <p className="mt-6 text-sm text-noir-muted">{label}</p>
      <p className="mt-2 font-heading text-3xl font-bold">{value}</p>
    </article>
  );
}
