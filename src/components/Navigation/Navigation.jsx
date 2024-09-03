import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
    </nav>
  );
}

export default Navigation;
