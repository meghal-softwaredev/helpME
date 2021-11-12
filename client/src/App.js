import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Signin from './components/Signin';

function App() {
  
  return (
    <BrowserRouter>
      <div className="grid-container">
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
        <main>
          <Routes>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
          </Routes>
        </main>
        <footer className="row center">
          <div>All right reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
