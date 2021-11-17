import { Link } from "react-router-dom";
import "./LeftSideBar.scss";

function LeftSideBar() {
  return (
    <div className="left-sidebar-container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/feeds">Feeds</Link>
        </li>
        <li>
          <Link to="/groups">Events</Link>
        </li>
      </ul>
    </div>
  )
}

export default LeftSideBar
