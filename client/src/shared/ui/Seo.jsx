import { Helmet } from 'react-helmet-async';

const defaultOgImage = 'https://res.cloudinary.com/dw7cppuwq/image/upload/v1779693187/photo-1509631179647-0177331693ae_rlm0mg.avif';

export function Seo({ title, description, path = '/', image = defaultOgImage, structuredData }) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://noirthread.vercel.app';
  const canonical = `${siteUrl}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}
