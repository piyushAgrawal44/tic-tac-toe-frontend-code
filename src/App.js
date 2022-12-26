
import './App.css';
import Home from './components/Home';
import {
  BrowserRouter as Router,
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
          <Route exact path="/tic-tac-toe/" element={<Home />} />
          <Route exact path="/tic-tac-toe/login" element={<Login />} />
          <Route exact path="/tic-tac-toe/register" element={<Register />} />

          <Route exact path="/tic-tac-toe/user/home" element={<UserHome />} />
          <Route exact path="/tic-tac-toe/user/newgame" element={<NewGame />} />
          <Route exact path="/tic-tac-toe/user/game" element={<Game />} />
         
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
