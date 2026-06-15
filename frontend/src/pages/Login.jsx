import { useState } from "react";
import { loginUser } from "../services/api";
import { FaChartLine } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData =
        new URLSearchParams();

      formData.append(
        "username",
        email
      );

      formData.append(
        "password",
        password
      );

      const response =
        await loginUser(formData);

      localStorage.setItem(
        "access_token",
        response.data.access_token
      );

      alert("Login Successful");

      window.location.href = "/";
    } catch (error) {
      console.error(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex items-center justify-center px-6">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[180px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[180px] rounded-full"></div>

      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl w-full relative z-10">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center">

          <div className="flex items-center gap-4">

            <FaChartLine className="text-green-500 text-5xl" />

            <h1 className="text-5xl font-bold">
              Quant AI Trader
            </h1>

          </div>

          <h2 className="text-4xl font-bold mt-10">
            AI Powered Trading Intelligence
          </h2>

          <p className="text-slate-400 mt-6 text-lg">
            Institutional-grade analytics,
            real-time market intelligence,
            portfolio tracking and AI-powered
            trade recommendations.
          </p>

          <div className="mt-10 space-y-4">

            <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 p-4 rounded-xl">
              📈 Real-Time Market Analysis
            </div>

            <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 p-4 rounded-xl">
              🤖 AI Generated Trading Signals
            </div>

            <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 p-4 rounded-xl">
              💼 Portfolio Management
            </div>

          </div>

        </div>

        {/* Login Card */}

        <div className="flex justify-center items-center">

          <form
            onSubmit={handleLogin}
            className="
              w-full
              max-w-md
              bg-slate-900/70
              backdrop-blur-xl
              border
              border-slate-800
              p-8
              rounded-3xl
              shadow-2xl
            "
          >

            <h1 className="text-4xl font-bold mb-2">
              Welcome Back
            </h1>

            <p className="text-slate-400 mb-8">
              Sign in to continue trading.
            </p>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                p-4
                mb-4
                rounded-xl
                bg-slate-800
                border
                border-slate-700
                focus:border-green-500
                outline-none
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                mb-6
                rounded-xl
                bg-slate-800
                border
                border-slate-700
                focus:border-green-500
                outline-none
              "
            />

            <button
              type="submit"
              className="
                w-full
                bg-green-600
                hover:bg-green-700
                py-4
                rounded-xl
                font-bold
                transition-all
              "
            >
              Login
            </button>

            <p className="text-center text-slate-400 mt-6">
              Secure authentication powered by JWT
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;

