import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Import icons for hamburger and close
import logo from "../../assets/logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import UserProfile from "./UserProfile";

const navItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Project",
    path: "/projects",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu toggle
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  //for profile toggle
  const user = JSON.parse(localStorage.getItem("users"));
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-[0.22,1,0.36,1] ${scrolled
        ? " backdrop-blur-md shadow-2xl py-2"
        : "bg-transparent py-6"
        }`}
    >
      <div
        className={`lg:mx-24 md:mx-16 sm:mx-6 mx-2 bg-[#1E2226]/80 backdrop-blur-xl rounded-2xl md:rounded-full px-4 py-2 border border-white/10 transition-all duration-500 ease-[0.22,1,0.36,1] ${scrolled ? "shadow-2xl border-white/20" : ""
          }`}
      >
        <div className="flex items-center justify-between">
          <div
            className="md:h-14 h-10 rounded-full cursor-pointer"
            onClick={() => navigate("/")}
            onDoubleClick={() => navigate("/login")}
          >
            <img src={logo} className="h-full rounded-full" alt="Logo" />
          </div>

          {/* Desktop View */}
          <ul className="hidden md:flex bg-white border rounded-full md:h-14 h-10 items-center px-2 lg:gap-4 md:gap-2 lowercase">
            {navItems.map((item, i) => (
              <li
                key={i}
                className="text-black md:text-lg lg:text-xl lg:font-medium"
              >
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "border-blue-400 md:px-4 md:py-2 px-3 py-1 bg-primary text-white rounded-full"
                      : "text-black px-3 py-1"
                  }
                  to={item.path}
                >
                  <span className="text-secondary">#</span>
                  {item.title}
                </NavLink>
              </li>
            ))}

            {/* profie icons when user login */}
            <div>
              {user && (
                <div className="cursor-pointer relative">
                  <FaRegCircleUser
                    className="text-black text-2xl"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                  />
                  {isProfileOpen && (
                    <UserProfile setIsProfileOpen={setIsProfileOpen} />
                  )}
                </div>
              )}
            </div>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile View */}
        {isOpen && (
          <ul className="mt-4 bg-[#1E2226] rounded-lg md:hidden flex flex-col items-start space-y-2 px-4 py-2 border border-gray-500">
            {navItems.map((item, i) => (
              <li key={i}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "block px-3 py-2 rounded text-white bg-primary"
                      : "block px-3 py-2 rounded text-white"
                  }
                  to={item.path}
                  onClick={toggleMenu} // Close menu when clicking a link
                >
                  <span className="text-secondary">#</span>
                  {item.title}
                </NavLink>
              </li>
            ))}
            <div className="px-4">
              {user && (
                <div className="cursor-pointer relative">
                  <FaRegCircleUser
                    className="text-2xl text-white"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                  />
                  {isProfileOpen && (
                    <UserProfile setIsProfileOpen={setIsProfileOpen} />
                  )}
                </div>
              )}
            </div>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
