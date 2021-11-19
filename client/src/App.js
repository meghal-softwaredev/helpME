import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Signin from './components/Signin';
import LeftSideBar from './components/LeftSideBar';
import Home from './components/Home';
import FeedList from './components/FeedList';
import FeedListItem from './components/FeedListItem';
import Category from './components/Category';
import GroupList from './components/GroupList';
import EventList from './components/EventList';

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
              <Route path="/feeds/:id" element={<FeedListItem />}></Route>
              <Route path="/groups" element={<GroupList />}></Route>
              <Route path="/events" element={<EventList />}></Route>
            </Routes>
          </div>
        </main>
        ):(
          <main className="base-container">
            <Routes>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route path="/" element={<Home />} exact></Route>
            </Routes>
          </main>
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
