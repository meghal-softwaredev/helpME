import { Link } from "react-router-dom";
import "./LeftSideBar.scss";

function LeftSideBar() {
  return (
    <div className="left-sidebar-container">
      <ul>
        <li>
          <Link to="/feeds">Feeds</Link>
        </li>
        <li>
          <Link to="/sessions">Sessions</Link>
        </li>
        <li>
          <Link to="/post_question">Post Question</Link>
        </li>
      </ul>
    </div>
  )
}

export default LeftSideBar
