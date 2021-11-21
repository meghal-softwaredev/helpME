import './styles/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Signin from './components/Signin';
import LeftSideBar from './components/LeftSideBar';
import Home from './components/Home';
import FeedList from './components/FeedList';
import Category from './components/Category';
import GroupList from './components/GroupList';
import EventList from './components/EventList';
import IndividualFeed from './components/IndividualFeed';
import IndividualGroup from './components/IndividualGroup';
import IndividualEvent from './components/IndividualEvent';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
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
              <Route path="/groups/:id" element={<IndividualGroup />}></Route>
              <Route path="/events" element={<EventList />}></Route>
              <Route path="/events/:id" element={<IndividualEvent />}></Route>
            </Routes>
          </div>
        </main>
        ):(
          <main className="base-container">
            <Routes>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route path="/" element={<Home />} exact></Route>
              <Route path="/feeds" element={<FeedList />}></Route>
              <Route path="/feeds/:id" element={<IndividualFeed />}></Route>
              <Route path="/events" element={<EventList />}></Route>
            </Routes>
          </main>
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
