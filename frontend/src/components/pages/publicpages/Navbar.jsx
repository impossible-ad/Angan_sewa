import { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

/* 🔹 Dropdown Data (TOP) */
const AGENCIES = [
  { country: "USA", cities: ["New York", "San Francisco", "Dallas"] },
  { country: "UK", cities: ["London", "Manchester", "Leeds"] },
  { country: "Canada", cities: ["Toronto", "Vancouver", "Ottawa"] },
];

/* 🔹 Menu Items (TOP) */
const MENU_ITEMS = [
  { label: "Team", link: "/team" },
  { label: "Contact", link: "/contact" },
  { label: "Source", link: "/source" },
  { label: "Partner", link: "/partner" },
  { label: "Feature", link: "/feature" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="border-b border-gray-300 bg-white min-h-17.5 relative z-50">
      <div className="flex items-center justify-between sm:px-10 px-6 py-3">
        {/* Logo */}
        <img src={logo} alt="logo" className="w-20 h-20" />

        {/* Menu */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:block max-lg:fixed max-lg:inset-0 max-lg:bg-black/40 z-40`}
        >
          <ul className="lg:flex lg:gap-x-10 max-lg:bg-white max-lg:w-2/3 max-lg:min-w-75 max-lg:h-full max-lg:p-6">
            {/* Close (Mobile) */}
            <button
              onClick={() => setMenuOpen(false)}
              className="lg:hidden absolute top-4 right-4 bg-white w-9 h-9 rounded-full border flex items-center justify-center"
            >
              <FaTimes />
            </button>

            <li className="font-medium text-blue-700">Home</li>

            {/* Branches Dropdown */}
            <li
              className="relative group cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="flex items-center font-medium hover:text-blue-700">
                Branches <FaChevronDown className="ml-1 text-sm" />
              </div>

              <div
                className={`absolute top-full left-0 mt-2 bg-white shadow-lg px-8 pt-6 pb-8 transition-all origin-top
                ${
                  dropdownOpen
                    ? "scale-y-100 opacity-100"
                    : "scale-y-0 opacity-0"
                }
                lg:group-hover:scale-y-100 lg:group-hover:opacity-100`}
              >
                <div className="flex gap-8">
                  {AGENCIES.map(({ country, cities }) => (
                    <div key={country}>
                      <h6 className="text-blue-700 font-medium">{country}</h6>
                      {cities.map((city) => (
                        <p key={city} className="mt-2 hover:text-blue-700">
                          {city}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </li>

            {/* Dynamic Menu Items */}
            {MENU_ITEMS.map(({ label, link }) => (
              <li key={label} className="font-medium hover:text-blue-700">
                <Link key={link}>{label}</Link>
              </li>
            ))}

            {/* Login (Mobile) */}
            <li className="lg:hidden mt-6">
              <Link to="/login">
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 rounded-md"
                >
                  Login
                </button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side (Desktop Login) */}
        <div className="hidden lg:block">
          <Link to="/login">
            <button className="bg-orange-500 text-white px-5 py-2  hover:bg-orange-600">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(true)} className="lg:hidden">
          <FaBars size={22} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
