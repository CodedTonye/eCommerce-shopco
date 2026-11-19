import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = 'https://dummyjson.com';
const STORAGE_KEY = 'shopco_auth';

function loadStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistAuth(data) {
  try {
    if (data) localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore storage errors */
  }
}

// DummyJSON's /users/add simulates creating a user but doesn't persist it,
// so a new account can't be used to sign in afterwards.
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ firstName, lastName, email, username, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/users/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, username, password }),
      });
      if (!res.ok) throw new Error('Could not create account');
      return res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 60 }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Invalid username or password');
      }
      const data = await res.json();
      persistAuth(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  user: loadStoredAuth(),
  status: 'idle',
  error: null,
  signupStatus: 'idle',
  signupResult: null,
  signupError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      persistAuth(null);
    },
    clearSignupResult: (state) => {
      state.signupStatus = 'idle';
      state.signupResult = null;
      state.signupError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })
      .addCase(signupUser.pending, (state) => {
        state.signupStatus = 'loading';
        state.signupError = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signupStatus = 'succeeded';
        state.signupResult = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupStatus = 'failed';
        state.signupError = action.payload || 'Signup failed';
      });
  },
});

export const { logout, clearSignupResult } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export default authSlice.reducer;
