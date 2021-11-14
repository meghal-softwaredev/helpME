import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="row">
      <div>
        <Link className="brand" to="/">
          helpME
        </Link>
      </div>

      <div>
        <Link to="/getHelp">
          Get Help
        </Link>
        {/* {userInfo ? ( */}
        <div className="dropdown">
          <Link to="#"> Name
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
      </div>
    </header>
  )
}

export default Header
