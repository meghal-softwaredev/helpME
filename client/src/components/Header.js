import { Link } from "react-router-dom"
import "./Header.scss";

function Header() {
  return (
    <header className="row">
      <div class="logo">
        <Link className="brand link" to="/">
          helpME
        </Link>
      </div>

      <nav>
        <Link className="link" to="/getHelp">
          Get Help
        </Link>
        {/* {userInfo ? ( */}
        <div className="dropdown">
          <Link className="link" to="#"> Name
            {/* {userInfo.name} <i className="fa fa-caret-down"></i>{' '} */}
          </Link>
          <ul className="dropdown-content">
            <li>
              <Link to="/profile">User Profile</Link>
            </li>
            <li>
              <Link to="#signout">
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
        {/* ) : (  */}
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
        {/* )}  */}
      </nav>
    </header>
  )
}

export default Header
