import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

// --- Async thunks ---
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  return null;
});

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as null | {
      uid: string;
      email: string | null;
      displayName: string | null;
      photoURL: string | null;
    },
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
      } | null>
    ) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, setLoading, setError, clearError, resetAuth } =
  authSlice.actions;

export default authSlice.reducer;
