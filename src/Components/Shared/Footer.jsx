import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="py-6 bg-[#1E2226] rounded-t-md text-white border-t border-gray-800">
      <div className="mx-auto flex flex-col md:flex-row gap-4 items-center justify-between px-6 lg:px-28 md:px-24 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="md:h-10 md:w-10 h-8 w-8 flex items-center justify-center relative">
            <img
              src={logo}
              alt="Logo"
              onClick={() => navigate("/")}
              className="h-full w-full object-cover rounded-full cursor-pointer"
            />
          </div>
          <span className="text-sm font-semibold tracking-wider text-gray-300">Manoj Belbase</span>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
          <Link to="/blog" className="hover:text-secondary transition-colors">Blog</Link>
          <Link to="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link>
        </div>

        <div className="text-center text-xs md:text-sm">
          <p className="flex items-center md:space-x-1 text-accent">
            Designed & Developed by
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="md:font-semibold ml-2 border-b-2 text-[10px] md:text-xs border-secondary text-white"
            >
              Manoj Belbase
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
