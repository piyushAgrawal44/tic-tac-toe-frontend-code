import React, { useEffect, useState } from 'react';

export default function Card(props) {
    

    const [opponentDetails, setopponentDetails] = useState([]);

  
   
    async function fetchRepo() {
        await fetch("https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/fetch-match-opponent.php?match_id="+props.match_id).then(res => res.json()).then(data => {
            setopponentDetails(data);
        });
    }  
    useEffect(() => {
        fetchRepo();
    }, []);

    function setOpponentName(data) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (parseInt(element.id) !== parseInt(props.myId)) {
                return element.name;
            }   
        }
    }

    if(parseInt(props.match_status)===1){
        return (
            <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Match with {setOpponentName(opponentDetails)}</h5>
                        <p className="card-text">{parseInt(props.current_move) !== parseInt(props.myId)?"It your turn to play the game !":"Waiting for "+props.player_two_name+" to play !" }</p>
                        <a href={`/tic-tac-toe/#/user/game?match_id=${props.match_id}`} className="btn btn-warning">{(parseInt(props.match_status)===1) && (parseInt(props.current_move) ===parseInt(props.myId))?"View Game !":"Play !"}</a>
                    </div>
            </div>
        )
    }
    else if(parseInt(props.match_status)===2){
        return (
            <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Match with {setOpponentName(opponentDetails)}</h5>
                        <p className="card-text">{parseInt(props.match_win_by) === parseInt(props.myId)?"You won the match !":"You loss the match !" }</p>
                        <a href={`/tic-tac-toe/#/user/game?match_id=${props.match_id}`} className="btn btn-warning">{(parseInt(props.match_status)===1) && (parseInt(props.current_move) ===parseInt(props.myId))?"View Game !":"Play !"}</a>
                    </div>
            </div>
        )
    }
    else{
        return (
            <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Match with {setOpponentName(opponentDetails)}</h5>
                        <p className="card-text">Match Draw !!</p>
                        <a href={`/tic-tac-toe/#/user/game?match_id=${props.match_id}`} className="btn btn-warning">View Game !</a>
                    </div>
            </div>
        )
    }



    
}
