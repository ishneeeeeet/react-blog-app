import { useDispatch } from "react-redux";
import authService from "../../appwrite/config";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
        dispatch(logout())
    })
  };
  return <button onClick={logoutHandler}>Logout</button>
};

export default LogoutBtn;
