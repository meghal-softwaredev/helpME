import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Signin from './components/Signin';
import Header from './components/Header';

function App() {
  
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
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
