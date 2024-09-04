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
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <header className={css.header}>
      <Logo />
      {!isLoggedIn ? <UserAuth /> : <UserLogo />}

      {/* <UserLogoModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className={css.openModal}>
          <button className={css.buttonOpenAndCloseModal}>Settings</button>
          <button className={css.buttonOpenAndCloseModal}>Log out</button>
        </div>
      </UserLogoModal> */}
    </header>
  );
}
