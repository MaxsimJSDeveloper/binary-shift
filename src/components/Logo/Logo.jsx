import { NavLink } from "react-router-dom";
import logoIcon from "../../assets/logoIcon.svg";
import css from "./Logo.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function Logo() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      {isLoggedIn ? (
        <NavLink to="/home">
          <img className={css.iconLogo} src={logoIcon} alt="LogoSvg" />
        </NavLink>
      ) : (
        <NavLink to="/">
          <img className={css.iconLogo} src={logoIcon} alt="LogoSvg" />
        </NavLink>
      )}
    </div>
  );
}
