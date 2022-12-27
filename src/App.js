
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
import Account from './components/user/Account';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home key={"home"} />} />
          <Route exact path="/login" element={<Login key={"login"} />} />
          <Route exact path="/register" element={<Register key={"register"} />} />

          <Route exact path="/user/home" element={<UserHome key={"userhome"} />} />
          <Route exact path="/user/account" element={<Account key={"account"} />} />
          <Route exact path="/user/newgame" element={<NewGame key={"newgame"} />} />
          <Route exact path="/user/game" element={<Game key={"game"} />} />
         
          <Route path="*" element={<NotFound key={"notfound"} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
