import React, { Suspense, lazy, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Lenis from 'lenis';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store.js';
import { MainLayout } from './shared/layouts/MainLayout.jsx';
import { AdminLayout } from './shared/layouts/AdminLayout.jsx';
import { ProtectedRoute } from './shared/routes/ProtectedRoute.jsx';
import { PageLoader } from './shared/ui/PageLoader.jsx';
import './styles/index.css';

const LandingPage = lazy(() => import('./features/marketing/LandingPage.jsx'));
const ProductListingPage = lazy(() => import('./features/products/ProductListingPage.jsx'));
const ProductDetailsPage = lazy(() => import('./features/products/ProductDetailsPage.jsx'));
const AuthPage = lazy(() => import('./features/auth/AuthPage.jsx'));
const WishlistPage = lazy(() => import('./features/wishlist/WishlistPage.jsx'));
const CartPage = lazy(() => import('./features/cart/CartPage.jsx'));
const CheckoutPage = lazy(() => import('./features/checkout/CheckoutPage.jsx'));
const OrderSuccessPage = lazy(() => import('./features/checkout/OrderSuccessPage.jsx'));
const DashboardPage = lazy(() => import('./features/account/DashboardPage.jsx'));
const AdminDashboardPage = lazy(() => import('./features/admin/AdminDashboardPage.jsx'));
const AboutPage = lazy(() => import('./features/content/AboutPage.jsx'));
const ContactPage = lazy(() => import('./features/content/ContactPage.jsx'));
const NotFoundPage = lazy(() => import('./features/content/NotFoundPage.jsx'));

function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, smoothWheel: true });
    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return children;
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/shop', element: <ProductListingPage /> },
      { path: '/products/:slug', element: <ProductDetailsPage /> },
      { path: '/auth', element: <AuthPage /> },
      { path: '/wishlist', element: <ProtectedRoute><WishlistPage /></ProtectedRoute> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/order-success/:orderId', element: <OrderSuccessPage /> },
      { path: '/account', element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  },
  {
    path: '/admin',
    element: <ProtectedRoute roles={['admin']}><AdminLayout /></ProtectedRoute>,
    children: [{ index: true, element: <AdminDashboardPage /> }]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <SmoothScrollProvider>
          <Suspense fallback={<PageLoader />}>
            <RouterProvider router={router} />
          </Suspense>
          <Toaster position="top-right" toastOptions={{ className: 'noir-toast' }} />
        </SmoothScrollProvider>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
