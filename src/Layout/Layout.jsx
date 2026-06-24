import { useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import CookieConsent from "../Components/Shared/CookieConsent";
import { motion } from "framer-motion";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="bg-black relative min-h-screen selection:bg-secondary selection:text-black">
      <Navbar />

      <main className="sm:pt-24 pt-20">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="lg:mx-24 md:mx-16 sm:mx-6 mx-2 md:my-10 my-6"
        >
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <Outlet />
          </Suspense>
        </motion.div>
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
