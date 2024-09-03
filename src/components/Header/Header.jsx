import Logo from "/src/assets/logoIcon.svg";
import css from "./Header.module.css";
import { PiUserCircleThin } from "react-icons/pi";
// import UserLogoModal from "../UserLogoModal/UserLogoModal";
// import { useState } from "react";
export default function Header() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <header className={css.header}>
      <img className={css.iconLogo} src={Logo} alt="Logo" />
      <div className={css.containerAuth}>
        <button type="button" className={css.button}>
          {/* onClick={handleOpenModal} */}
          Sign in
        </button>
        <div>
          <PiUserCircleThin className={css.iconUser} />
        </div>
      </div>
      {/* <UserLogoModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className={css.openModal}>
          <button className={css.buttonOpenAndCloseModal}>Settings</button>
          <button className={css.buttonOpenAndCloseModal}>Log out</button>
        </div>
      </UserLogoModal> */}
    </header>
  );
}
