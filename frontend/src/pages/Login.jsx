import { useState } from "react";
import { loginUser } from "../services/api";

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

    } catch (error) {

      console.error(error);

      alert("Login Failed");

    }
  };

  return (
    <div className="
      min-h-screen
      bg-slate-950
      text-white
      flex
      justify-center
      items-center
    ">

      <form
        onSubmit={handleLogin}
        className="
          bg-slate-800
          p-8
          rounded-xl
          w-96
        "
      >

        <h1 className="
          text-3xl
          mb-6
          font-bold
        ">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            p-3
            mb-4
            rounded
            bg-slate-700
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
            p-3
            mb-4
            rounded
            bg-slate-700
          "
        />

        <button
          type="submit"
          className="
            w-full
            bg-green-600
            p-3
            rounded
          "
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;