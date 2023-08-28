import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { OAuth } from "../components";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SITE_KEY = import.meta.env.VITE_SITE_KEY;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let recaptchaToken;
    await new Promise((resolve) => {
      grecaptcha.enterprise.ready(async () => {
        recaptchaToken = await grecaptcha.enterprise.execute(SITE_KEY, {
          action: "LOGIN",
        });
        resolve();
      });
    });

    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginFailure(data));
        return;
      }
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };

  if (currentUser) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleInputChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg
    uppercase hover:opacity-95 disabled:opacity-80 g-recaptcha"
          data-sitekey={SITE_KEY}
          data-callback="onSubmit"
          data-action="LOGIN"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>New User?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Something Went Wrong" : ""}
      </p>
    </div>
  );
}
