import { Link } from "react-router-dom";
import "./LeftSideBar.scss";

function LeftSideBar() {
  return (
    <div className="left-sidebar-container">
      <ul>
        <li>
          <Link className="link" to="/feeds">Feeds</Link>
        </li>
        <li>
          <Link className="link" to="/events">Events</Link>
        </li>
      </ul>
    </div>
  )
}

export default LeftSideBar
