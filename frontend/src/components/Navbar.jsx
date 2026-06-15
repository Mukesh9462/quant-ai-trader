import { Link, useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem(
    "access_token"
  );

  const logout = () => {
    localStorage.removeItem(
      "access_token"
    );

    navigate("/login");
  };

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        bg-black/40
        backdrop-blur-xl
        border-b
        border-slate-800
        shadow-lg
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          justify-between
          items-center
        "
      >
        {/* Logo */}

        <Link
          to="/"
          className="
            flex
            items-center
            gap-3
          "
        >
          <FaChartLine
            className="
              text-green-500
              text-2xl
            "
          />

          <span
            className="
              text-xl
              font-extrabold
              tracking-wider
              text-white
            "
          >
            Quant AI Trader
          </span>
        </Link>

        {/* Navigation */}

        <div
          className="
            flex
            items-center
            gap-8
            text-slate-300
            font-medium
          "
        >
          <Link
            to="/"
            className="
              hover:text-green-400
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Dashboard
          </Link>

          <Link
            to="/portfolio"
            className="
              hover:text-green-400
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Portfolio
          </Link>

          <Link
            to="/news"
            className="
              hover:text-green-400
              transition-all
              duration-300
              hover:scale-105
            "
          >
            News
          </Link>

          <Link
            to="/trade"
            className="
              hover:text-green-400
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Trade
          </Link>

          <Link
            to="/signals"
            className="
              hover:text-green-400
              transition-all
              duration-300
              hover:scale-105
            "
          >
            AI Signals
          </Link>

          <Link
            to="/charts"
            className="
              hover:text-green-400
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Charts
          </Link>

          <Link
            to="/watchlist"
            className="
              hover:text-green-400
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Watchlist
          </Link>
        </div>

        {/* Auth Buttons */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          {!token ? (
            <>
              <Link
                to="/login"
                className="
                  border
                  border-slate-700
                  px-4
                  py-2
                  rounded-lg
                  hover:border-green-500
                  hover:text-green-400
                  transition-all
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  bg-green-600
                  hover:bg-green-700
                  px-5
                  py-2
                  rounded-lg
                  font-semibold
                  transition-all
                "
              >
                Get Started
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="
                bg-red-600
                hover:bg-red-700
                px-5
                py-2
                rounded-lg
                font-semibold
                transition-all
              "
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;