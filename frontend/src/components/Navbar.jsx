import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("access_token");

  const logout = () => {

    localStorage.removeItem(
      "access_token"
    );

    navigate("/login");
  };

  return (
    <nav
      className="
        bg-slate-900
        text-white
        p-4
        flex
        gap-6
        items-center
      "
    >

      <Link to="/">
        Dashboard
      </Link>

      <Link to="/portfolio">
        Portfolio
      </Link>

      <Link to="/news">
        News
      </Link>

      <Link to="/trade">
        Trade
      </Link>

      {!token ? (
        <>
          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>
        </>
      ) : (
        <button
          onClick={logout}
          className="
            bg-red-600
            px-4
            py-2
            rounded-lg
          "
        >
          Logout
        </button>
      )}

    </nav>
  );
}

export default Navbar;