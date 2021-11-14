import './App.scss';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Signin from './components/Signin';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import Home from './components/Home';
import FeedList from './components/FeedList';
import FeedListItem from './components/FeedListItem';

function App() {
  
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main className="base-container">
          <LeftSideBar />
          <div className="main-container">
            <Routes>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route path="/feeds" element={<FeedList />}></Route>
              <Route path="/feeds/:id" element={<FeedListItem />}></Route>
              <Route path="/" element={<Home />} exact></Route>
            </Routes>
          </div>
          <RightSideBar />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
