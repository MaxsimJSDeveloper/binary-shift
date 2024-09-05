import { Route, Routes } from "react-router-dom";

import "./App.css";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import PrivateRoute from "./PrivateRoute";
import { refreshUser } from "./redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectIsRefreshing } from "./redux/auth/selectors";

function App() {
  const dispatch = useDispatch();
  const isRefreshingUser = useSelector(selectIsRefreshing);

   useEffect(() => {
    console.log(dispatch(refreshUser()))
  },[dispatch])

  return isRefreshingUser? (<div>REFRESHING USER...</div>):(
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<PrivateRoute component={<HomePage/>} redirectTo='/signin'/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
