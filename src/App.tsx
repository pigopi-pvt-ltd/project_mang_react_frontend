import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { useGetMeQuery } from "./features/auth/authApi";
import { setUser, clearUser } from "./features/auth/authSlice";
import type { AppDispatch } from "./app/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const [authChecked, setAuthChecked] = useState(false);

  const { data: user, isSuccess, isError } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setUser(user));
      setAuthChecked(true);
    }

    if (isError) {
      dispatch(clearUser());
      setAuthChecked(true);
    }
  }, [isSuccess, isError, user, dispatch]);

  if (!authChecked) {
    return <div>Checking authentication...</div>;
  }

  return <AppRoutes />;
}

export default App;
