import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md bg-[#1E2226] border border-gray-700/80 shadow-2xl rounded-2xl p-5 md:p-6 z-[9999] backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-white text-base">Cookie Consent</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                We use cookies to optimize site functionality and display relevant advertisements in compliance with Google AdSense terms. By clicking "Accept", you agree to our cookie policies.
              </p>
            </div>
            
            <div className="flex items-center justify-between gap-4 pt-2">
              <Link
                to="/privacy"
                onClick={() => setIsVisible(false)}
                className="text-[11px] text-secondary hover:underline"
              >
                Learn More
              </Link>
              
              <div className="flex gap-2">
                <button
                  onClick={handleDecline}
                  className="text-xs font-semibold text-gray-400 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/5 transition-all"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="text-xs font-semibold bg-secondary text-black hover:bg-white px-4 py-1.5 rounded-md transition-all shadow-md shadow-secondary/10"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
