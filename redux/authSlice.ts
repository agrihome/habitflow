import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { AuthUser } from "@/types/auth";

// --- State Type ---
interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "checking" | "authenticated" | "unauthenticated";
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  status: "idle",
};

// --- Thunks ---
export const loginWithGoogle = createAsyncThunk<AuthUser, void, { rejectValue: string }>(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user: User = result.user;
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

export const listenToAuthChanges = createAsyncThunk<void, void>(
  "auth/listenToAuthChanges",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    return new Promise<void>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(
            setUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
          );
        } else {
          dispatch(setUser(null));
        }
        dispatch(setLoading(false));
        resolve();
      });
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.status = action.payload ? "authenticated" : "unauthenticated";
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
      state.status = "unauthenticated";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.loading = false;
        state.user = action.payload;
        state.status = "authenticated";
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "unauthenticated";
      });
  },
});

export const { setUser, setLoading, setError, clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
