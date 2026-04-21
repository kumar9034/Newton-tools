import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Login = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      // Replace '/api/login' with your real auth endpoint

      const res = await axios.post(`http://localhost:3000/api/admin/login`, form) 
    

      console.log(res)

      if(res.status === 200){
        localStorage.setItem("token", res.data.token);
        navigate("/admin/dashboard");
      }

      
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bgimag.jpeg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
        
        {/* Logo */}
        <h1 className="w-70 ml-10 font-bold text-center mb-2 text-yellow-400">
        <img src="/logo.svg" alt="" />
        </h1>
    

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gray-500 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gray-500 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm mb-2" role="alert">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 ${loading ? 'bg-yellow-300' : 'bg-yellow-500 hover:bg-yellow-600'} text-black font-semibold py-2 rounded-lg transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
