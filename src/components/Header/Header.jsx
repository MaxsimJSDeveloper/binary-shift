// import Logo from "/src/assets/logoIcon.svg";
import css from "./Header.module.css";
// import { PiUserCircleThin } from "react-icons/pi";
// import { NavLink } from "react-router-dom";
// import { selectIsLoggedIn } from "../../redux/auth/selectors";
// import { useSelector } from "react-redux";
import Logo from "../Logo/Logo";
// import UserLogo from "../UserLogo/UserLogo";
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
// import UserLogoModal from "../UserLogoModal/UserLogoModal";
// import { useState } from "react";
export default function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      <Logo />
      {!isLoggedIn ? <UserAuth /> : <UserLogo />}
    </header>
  );
}
