import { Link } from "react-router-dom"
import "./Header.scss";
import { useDispatch, useSelector } from 'react-redux';
import { signout } from "../actions/userActions";

function Header() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <header className="row">
      <div className="logo">
        <Link className="brand link" to="/">
          helpME
        </Link>
      </div>
      {userInfo ? (
        <nav>
          <Link className="link" to="/getHelp">
            Get Help
          </Link>
        
          <div className="dropdown">
            <Link className="link" to="#"> Name
              {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link className="link" to="/profile">User Profile</Link>
              </li>
              <li>
                <Link className="link" to="#signout" onClick={signoutHandler}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </nav>
          ) : ( 
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </ul>
        </nav>
        )}  
    </header>
  )
}

export default Header
