import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice.js';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error } = useSelector((s) => s.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    if (!username.trim() || !password.trim()) {
      setFormError('Please enter both a username and password.');
      return;
    }
    const result = await dispatch(loginUser({ username: username.trim(), password }));
    if (loginUser.fulfilled.match(result)) {
      navigate(location.state?.from || '/');
    }
  }

  function fillDemoAccount() {
    setUsername('emilys');
    setPassword('emilyspass');
  }

  return (
    <div className="container-x flex justify-center py-16">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl">SIGN IN</h1>
        <p className="mt-2 text-sm text-black/60">Welcome back. Enter your details to continue.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. emilys"
              autoComplete="username"
              className="mt-1.5 w-full rounded-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          {(formError || error) && <p className="text-sm text-red-500">{formError || error}</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="pill-btn w-full bg-black text-white hover:bg-black/80 disabled:opacity-50"
          >
            {status === 'loading' ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-xs text-black/60">
          <p>
            This app authenticates against the public <span className="font-medium">DummyJSON</span>{' '}
            API, which only accepts its own seeded test accounts — not ones created on the Sign Up page.
          </p>
          <button type="button" onClick={fillDemoAccount} className="mt-2 font-semibold underline">
            Fill in a demo account (emilys / emilyspass)
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-black/60">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-black underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
