import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/register', form);
      alert("Registered successfully");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || "Error registering");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Username"
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition"
        >
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-purple-700 font-semibold">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
