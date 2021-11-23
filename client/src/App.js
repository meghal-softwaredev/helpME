import "./styles/main.scss";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Signin from "./components/Signin";
import LeftSideBar from "./components/LeftSideBar";
import Home from "./components/Home";
import FeedList from "./components/FeedList";
import Category from "./components/Category";
import GroupList from "./components/GroupList";
import EventList from "./components/EventList";
import IndividualFeed from "./components/IndividualFeed";
import Navbar from "./components/Navbar";
import IndividualGroup from "./components/IndividualGroup";
import IndividualEvent from "./components/IndividualEvent";
function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <BrowserRouter>
      <div className={"" !== "/" && "grid-container"}>
        <Navbar />
        {userInfo ? (
          <main className="base-container">
            <LeftSideBar />
            <div className="main-container">
              <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/signin" element={<Signin />}></Route>
                <Route path="/category" element={<Category />}></Route>
                <Route path="/feeds" element={<FeedList />}></Route>
                <Route path="/feeds/:id" element={<IndividualFeed />}></Route>
                <Route path="/groups" element={<GroupList />}></Route>
                <Route path="/events" element={<EventList />}></Route>
              </Routes>
            </div>
          </main>
        ) : (
          <NotLoggedIn />
        )}
      </div>
    </BrowserRouter>
  );
}
const NotLoggedIn = () => {
  const location = useLocation();
  console.log("location", location);
  let inputStyle =
    location.pathname === "/"
      ? {
          display: "flex",
          "flex-direction": "column",
        }
      : {};
  console.log("inputStyle", inputStyle);

  return (
    <main className="base-container" style={inputStyle}>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/" element={<Home />} exact></Route>
        <Route path="/feeds" element={<FeedList />}></Route>
        <Route path="/feeds/:id" element={<IndividualFeed />}></Route>
        <Route path="/groups" element={<GroupList />}></Route>
        <Route path="/groups/:id" element={<IndividualGroup />}></Route>
        <Route path="/events" element={<EventList />}></Route>
        <Route path="/events/:id" element={<IndividualEvent />}></Route>
      </Routes>
    </main>
  );
};
export default App;
