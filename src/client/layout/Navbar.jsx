import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken, selectId } from "../features/auth/authSlice";

import "./Navbar.less";

/**
 * A simple navigation bar that displays "Log In" if the user is not logged in,
 * and "Log Out" if the user is logged in.
 */
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  const usrId = sessionStorage.getItem('userId')
  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="top">
      <menu>
        {token ? (
          <>
            <li>
              <NavLink to={`/home`}>Home</NavLink>
            </li>
            <li>
              <NavLink to={`/pilot/${usrId}`}>Profile</NavLink>
            </li>
          </>
        ) : null}
        {token ? (
          <li>
            <a onClick={handleLogout}>Log Out</a>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        )}
      </menu>
    </nav>
  );
}