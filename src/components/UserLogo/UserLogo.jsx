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
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import { selectUser } from "../../redux/users/selectors";
import SettingModal from "../SettingModal/SettingModal";
import UserLogOutModal from "../UserLogoutModal/UserLogoutModal";

export default function UserLogo() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false); // resolved variable name

  const handleButtonClick = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSettingClick = () => {
    setIsSettingModalOpen(true);
  };

  const handleCloseSettingModal = () => {
    setIsSettingModalOpen(false);
  };

  const handleOpenLogoutModal = () => {
    setIsLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModal(false);
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
      <button className={css.containerUserAvatar} onClick={handleButtonClick}>
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
              <div className={css.lettersContainer}>
                <p className={css.letters}>{initials}</p>
              </div>
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
            <button
              className={css.buttonOpenAndCloseModal}
              onClick={handleSettingClick}
            >
              <HiOutlineCog6Tooth className={css.iconSettingAndLogOut} />
              Setting
            </button>

            <button
              className={css.buttonOpenAndCloseModal}
              onClick={handleOpenLogoutModal}
            >
              <HiArrowRightOnRectangle className={css.iconSettingAndLogOut} />
              Log out
            </button>
          </div>
        </UserLogoModal>
      )}

      <SettingModal
        isOpen={isSettingModalOpen}
        onClose={handleCloseSettingModal}
        avatarUrl={avatarUrl}
        initials={initials}
      />
      <UserLogOutModal
        isOpen={isLogoutModal} // use the resolved variable name
        onClose={handleCloseLogoutModal}
      />
    </div>
  );
}
