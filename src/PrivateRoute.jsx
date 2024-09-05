import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "./redux/auth/selectors";

export default function PrivateRoute({ component, redirectTo }) {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    console.log(useSelector(state=>state.auth.user));
    
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}