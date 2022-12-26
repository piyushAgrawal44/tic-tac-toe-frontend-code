
import './App.css';
import Home from './components/Home';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import UserHome from './components/user/Home';
import NotFound from './components/NotFound';
import NewGame from './components/user/NewGame';
import Game from './components/user/Game';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          <Route exact path="/user/home" element={<UserHome />} />
          <Route exact path="/user/newgame" element={<NewGame />} />
          <Route exact path="/user/game" element={<Game />} />
         
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
