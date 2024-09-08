import { Route, Routes } from "react-router-dom";

import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import SignIn from "./pages/SignInPage/SignInPage";
import SignUp from "./pages/SignUpPage/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import { refreshUser } from "./redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectIsLoggedIn, selectIsRefreshing } from "./redux/auth/selectors";
import Loader from "./components/Loader/Loader";
import SharedLayout from "./components/SharedLayout/SharedLayout";

function App() {
  const dispatch = useDispatch();
  const isRefreshingUser = useSelector(selectIsRefreshing);

  useEffect(() => {
    console.log(dispatch(refreshUser()));
  }, [dispatch]);

  const isLogged = useSelector(selectIsLoggedIn);
  return isRefreshingUser ? (
    <div>REFRESHING USER...</div>
  ) : (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {isLogged ? (
          <Route path="/home" element={<HomePage />} />
        ) : (
          <Route path="/signin" element={<SignIn />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
    </>
  );
}

export default App;
