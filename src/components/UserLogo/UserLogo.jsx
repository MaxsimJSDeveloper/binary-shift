import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "../../redux/users/operations";
import { PiUserCircleThin } from "react-icons/pi";
import css from "./UserLogo.module.css";
import {
  HiArrowRightOnRectangle,
  HiOutlineChevronDown,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import UserLogoModal from "../UserLogoModal/UserLogoModal"; // Импортируйте ваш компонент модального окна
import { NavLink } from "react-router-dom";

export default function UserLogo() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUser());
    }
  }, [dispatch, isLoggedIn]);

  const getInitials = (name, email) => {
    if (name) {
      return name.charAt(0).toUpperCase();
    } else if (email) {
      return email.charAt(0).toUpperCase();
    }
    return "?";
  };

  const avatarUrl = user?.photo;
  const initials = getInitials(user?.name, user?.email);

  return (
    <div>
      <button className={css.containerUserAvatar} onClick={handleOpenModal}>
        {isLoggedIn ? (
          <div className={css.namePhoto}>
            <span className={css.nameUser}>{user?.name || user?.email}</span>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User Avatar"
                className={css.userAvatar}
              />
            ) : (
              <div className={css.avatarInithial}>{initials}</div>
            )}
          </div>
        ) : (
          <div>
            <PiUserCircleThin />
          </div>
        )}
        <div className={css.button}>
          <HiOutlineChevronDown className={css.iconArrow} />
        </div>
      </button>

      {isModalOpen && (
        <UserLogoModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className={css.openModal}>
            <NavLink className={css.buttonOpenAndCloseModal}>
              <HiOutlineCog6Tooth className={css.iconSettingAndLogOut} />
              Setting
            </NavLink>
            <NavLink className={css.buttonOpenAndCloseModal}>
              <HiArrowRightOnRectangle className={css.iconSettingAndLogOut} />
              Log out
            </NavLink>
          </div>
        </UserLogoModal>
      )}
    </div>
  );
}

//www33333333333@gmail.com
// dmytro111@gmail.com
//Dangerous1488@gmail.com
