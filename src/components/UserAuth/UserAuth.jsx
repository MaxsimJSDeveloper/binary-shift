import { PiUserCircleThin } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import css from "./UserAuth.module.css";

export default function UserAuth() {
  return (
    <div className={css.containerAuth}>
      <NavLink to={"/signin"} className={css.signIn}>
        Sign in
      </NavLink>
      {/* <button type="button" className={css.button}> */}
      {/* onClick={handleOpenModal} */}
      {/* Sign in
        </button> */}
      <div>
        <PiUserCircleThin className={css.iconUser} />
      </div>
    </div>
  );
}
