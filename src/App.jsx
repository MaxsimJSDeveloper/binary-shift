import { Route, Routes } from "react-router-dom";

import "./App.css";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />        
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
