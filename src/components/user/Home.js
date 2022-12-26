import React, {useEffect, useState} from 'react';

import '../css/UserHome.css';
import Card from './Card';

export default function Home() {
    
   
    function logout() {
        localStorage.removeItem("logged");
        localStorage.removeItem("logged_id");
        localStorage.removeItem("logged_name");
        localStorage.removeItem("logged_username");
        window.location.href="/tic-tac-toe/#/";
    }

    let logged = localStorage.getItem("logged");
    if(!logged){
        window.location.href='/tic-tac-toe/#/login';
    }
    let myId = localStorage.getItem("logged_id");
    useEffect(() => {
        fetchRepo();
    }, []);

    const [allMatchDetails, setallMatchDetails] = useState([]);

    async function fetchRepo() {
        await fetch("https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/fetch-all-match-details.php?player_one_id="+myId).then(res => res.json()).then(data => {
            setallMatchDetails(data);
        });
    }  

    let gameCount=allMatchDetails.length;

    if(gameCount===0) {
        return (
            <>
                <div className="container-fluid ">
                    <h5 className='mt-2'>Your Games</h5>
                    <br /><br /><br /><br />
                    <div className="noGames text-center h-100 align-self-center">
                        <h2>No Games Found !</h2>
                        <br />
                        <a href="/tic-tac-toe/#/user/newgame" className="btn btn-warning">Start a new game</a>
                    </div>
                    <button className="btn fixed-bottom m-2 logoutButton" onClick={()=>{logout()}}>
                        <i className="bi bi-arrow-bar-left"></i> <b>Logout</b>
                    </button>
                </div>
            </>
          )
                    
    } else {
        return (
            <>
                <div className="container-fluid">
                    <h5 className='mt-2'>Your Games</h5>
                    <br />
                    {allMatchDetails.map((element, i) =>
                        
                            <Card key={i} player_two_name={element.player_two_name} player_two_username={element.player_two_username}
                            match_status={element.match_status} current_move={element.current_move} match_id={element.match_id}
                            match_win_by={element.match_win_by} myId={myId}
                            
                            />
                    )}
                   
                    <br /><br />
                    <a href="/tic-tac-toe/#/user/newgame" className="btn btn-dark  newGameButton">+ new game</a>

                    <button className="btn fixed-bottom m-2 logoutButton" onClick={()=>{logout()}}>
                        <i className="bi bi-arrow-bar-left"></i> <b>Logout</b>
                    </button>
                </div>
            </>
          )
    }
  
}
