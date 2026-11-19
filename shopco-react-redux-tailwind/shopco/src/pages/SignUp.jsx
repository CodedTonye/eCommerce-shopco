import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, clearSignupResult } from '../store/authSlice.js';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const inputClass =
  'mt-1.5 w-full rounded-full border border-black/15 px-4 py-3 text-sm outline-none focus:border-black';

export default function SignUp() {
  const dispatch = useDispatch();
  const { signupStatus, signupResult, signupError } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!validateEmail(form.email)) e.email = 'Enter a valid email address';
    if (form.username.trim().length < 3) e.username = 'Username must be at least 3 characters';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.confirmPassword !== form.password) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(clearSignupResult());
    if (!validate()) return;
    await dispatch(
      signupUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        username: form.username.trim(),
        password: form.password,
      })
    );
  }

  const Field = ({ label, field, type = 'text' }) => (
    <div className="flex-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => update(field, e.target.value)}
        className={inputClass}
      />
      {errors[field] && <p className="mt-1 text-xs text-red-500">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="container-x flex justify-center py-16">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl">CREATE ACCOUNT</h1>
        <p className="mt-2 text-sm text-black/60">Join Shop.co and start finding your style.</p>

        {signupStatus === 'succeeded' && signupResult && (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 text-sm">
            <p className="font-semibold text-green-700">
              Account created for {signupResult.firstName} {signupResult.lastName} ✓
            </p>
            <p className="mt-2 text-black/60">
              Since this demo runs on the public DummyJSON API, new accounts are simulated and
              aren't saved for login. Head to Sign In and use the demo account instead.
            </p>
            <div className="mt-4 flex gap-3">
              <Link to="/signin" className="pill-btn bg-black px-5 py-2 text-sm text-white">
                Go to Sign In
              </Link>
              <button
                onClick={() => dispatch(clearSignupResult())}
                className="pill-btn border border-black/20 px-5 py-2 text-sm"
              >
                Create another
              </button>
            </div>
          </div>
        )}

        {signupStatus !== 'succeeded' && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="flex gap-3">
              {Field({ label: 'First name', field: 'firstName' })}
              {Field({ label: 'Last name', field: 'lastName' })}
            </div>
            {Field({ label: 'Email', field: 'email', type: 'email' })}
            {Field({ label: 'Username', field: 'username' })}
            {Field({ label: 'Password', field: 'password', type: 'password' })}
            {Field({ label: 'Confirm password', field: 'confirmPassword', type: 'password' })}

            {signupError && <p className="text-sm text-red-500">{signupError}</p>}

            <button
              type="submit"
              disabled={signupStatus === 'loading'}
              className="pill-btn w-full bg-black text-white hover:bg-black/80 disabled:opacity-50"
            >
              {signupStatus === 'loading' ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-black/60">
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold text-black underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
