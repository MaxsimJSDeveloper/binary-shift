import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectUserState } from "../../redux/users/selectors";
import { getUserData } from "../../redux/users/operations";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { PiUserCircleThin } from "react-icons/pi";

export default function UserLogo() {
  //   const user = useSelector(selectUserState);
  //   const dispatch = useDispatch();
  //   const isLoggedIn = useSelector(selectIsLoggedIn);

  //   useEffect(() => {
  //     if (isLoggedIn) {
  //       dispatch(getUserData());
  //     }
  //   }, [dispatch, isLoggedIn]);

  //   const getInitials = (name, email) => {
  //     if (name) {
  //       return name.charAt(0).toUpperCase();
  //     } else if (email) {
  //       return email.charAt(0).toUpperCase();
  //     }
  //     return "?";
  //   };

  //   const avatarUrl = user?.photo;
  //   const initials = getInitials(user?.name, user?.email);

  //   return (
  //     <div>
  //       {isLoggedIn ? (
  //         <div>
  //           {avatarUrl ? (
  //             <img src={avatarUrl} alt={user?.name || "User Avatar"} />
  //           ) : (
  //             <div className="avatar-initials">{initials}</div>
  //           )}
  //           <span>{user?.name || "User"}</span>
  //         </div>
  //       ) : (
  //         <div>
  //           <PiUserCircleThin />
  //         </div>
  //       )}
  //     </div>
  //   );
  //   const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);

  return (
    <div>
      {user ? (
        <>
          <div>{user.name}</div>
          <div>{user.email}</div>
        </>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
}

//www33333333333@gmail.com
