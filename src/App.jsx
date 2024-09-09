import { Route, Routes } from "react-router-dom";

import "./App.css";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { refreshUser } from "./redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import { selectIsLoggedIn, selectIsRefreshing } from "./redux/auth/selectors";
import Loader from "./components/Loader/Loader";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import RedirectPage from "./pages/RedirectPage/RedirectPage";

const MainPage = lazy(() => import("../src/pages/MainPage/MainPage"));
const HomePage = lazy(() => import("../src/pages/HomePage/HomePage"));
const SignUp = lazy(() => import("../src/pages/SignUpPage/SignUpPage"));
const SignIn = lazy(() => import("../src/pages/SignInPage/SignInPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshingUser = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const isLogged = useSelector(selectIsLoggedIn);
  return isRefreshingUser ? (
    <Loader/>
  ) : (
    <>
    <SharedLayout>
    <Suspense fallback={null}>
      <Routes>
        {!isLogged?<Route path="/" element={<MainPage />} />:<Route path="*" element={<RedirectPage />} />}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {isLogged ? (
          <Route path="/home" element={<HomePage />} />
        ) : (
          <Route path="/signin" element={<SignIn />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>  
    </SharedLayout>
    </>
  );
}

export default App;
