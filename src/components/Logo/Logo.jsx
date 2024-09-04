import { NavLink } from "react-router-dom";
import LogoSvg from "../../assets/LogoSvg.svg";
import css from "./Logo.module.css";

export default function Logo() {
  return (
    <div>
      <NavLink to="/">
        <img className={css.iconLogo} src={LogoSvg} alt="LogoSvg" />
      </NavLink>
    </div>
  );
}
