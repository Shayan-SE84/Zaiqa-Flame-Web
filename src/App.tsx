import React from 'react';
import { BackToTop } from './components/BackToTop';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { MobileCartBar } from './components/MobileCartBar';
import { Navbar } from './components/Navbar';
import { OwnerMenuModal } from './components/OwnerMenuModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Toast } from './components/Toast';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DealsPage } from './pages/DealsPage';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';

function RestaurantShell() {
  const { currentPage } = useRestaurant();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#121C2A]">
      <Navbar />

      <div className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'menu' && <MenuPage />}
        {currentPage === 'deals' && <DealsPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </div>

      <Footer />

      <CartDrawer />
      <ProductDetailModal />
      <OwnerMenuModal />
      <MobileCartBar />
      <BackToTop />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <RestaurantProvider>
      <RestaurantShell />
    </RestaurantProvider>
  );
}
