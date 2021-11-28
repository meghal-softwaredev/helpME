import "./styles/main.scss";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Signin from "./components/Signin";
import LeftSideBar from "./components/LeftSideBar";
import Home from "./components/Home";
import FeedList from "./components/FeedList";
import CategoryList from "./components/CategoryList";
import GroupList from "./components/GroupList";
import EventList from "./components/EventList";
import IndividualFeed from "./components/IndividualFeed";
import Navbar from "./components/Navbar";
import IndividualGroup from "./components/IndividualGroup";
import IndividualEvent from "./components/IndividualEvent";
import ShowProfile from "./components/ShowProfile";
import Chat from "./components/Chat";
import GetHelp from "./components/GetHelp";
import AboutUs from "./components/AboutUs";
function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const location = window.location.pathname;

  return (
    <BrowserRouter>
      <div className={"" !== "/" && "grid-container"}>
        <Navbar />
        {userInfo ? (
          <main className="base-container">
            {/* location !== "/categories" && (<LeftSideBar />) */}
            <ShowLeftSidebar />
            <div className="main-container">
              <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/signin" element={<Signin />}></Route>
                <Route path="/" element={<FeedList />} exact></Route>
                <Route path="/categories" element={<CategoryList />}></Route>
                <Route path="/feeds" element={<FeedList />}></Route>
                <Route path="/feeds/:id" element={<IndividualFeed />}></Route>
                <Route path="/groups" element={<GroupList />}></Route>
                <Route path="/groups/:id" element={<IndividualGroup />}></Route>
                <Route path="/events" element={<EventList />}></Route>
                <Route path="/profile" element={<ShowProfile />}></Route>
                <Route path="/events/:id" element={<IndividualEvent />}></Route>
                <Route path="/chat" element={<Chat />}></Route>
                <Route path="/get-help" element={<GetHelp />}></Route>
              </Routes>
            </div>
          </main>
        ) : (
          <NotLoggedIn />
        )}
      </div>
      {/* <div>
       <Footer />
      </div> */}
    </BrowserRouter>
  );
}

const ShowLeftSidebar = () => {
  const location = useLocation();
  if (location.pathname !== "/categories") {
    return <LeftSideBar />;
  }
  return "";
};

const NotLoggedIn = () => {
  const location = useLocation();
  let inputStyle =
    location.pathname === "/"
      ? {
          display: "flex",
          "flex-direction": "column",
          padding: 0,
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
        <Route path="/about-us" element={<AboutUs />}></Route>
      </Routes>
    </main>
  );
};
export default App;
