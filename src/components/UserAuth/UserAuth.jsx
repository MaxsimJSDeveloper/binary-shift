import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, logIn, logOut, refreshUser } from '../../redux/auth/operations.js';
import { selectIsLoggedIn, selectIsRefreshing, selectUser, selectAuthError } from '../../redux/auth/selectors.js';

const UserAuth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const error = useSelector(selectAuthError);
а
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(logIn({ email, password }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(register({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div>
     
    </div>
  );
};

export default UserAuth;