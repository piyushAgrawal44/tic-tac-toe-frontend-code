import React, { useEffect, useState } from 'react';

export default function Card(props) {
    useEffect(() => {
        fetchRepo();
    }, []);

    const [opponentDetails, setopponentDetails] = useState([]);
  
    let opponent_name="";
    async function fetchRepo() {
        await fetch("https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/fetch-match-opponent.php?match_id="+props.match_id).then(res => res.json()).then(data => {
            setopponentDetails(data);
        });
    }  
    if(opponentDetails.length>0){
        for (let i = 0; i < opponentDetails.length; i++) {
            const element = opponentDetails[i];
            if (parseInt(element.id) !== parseInt(props.myId)) {
                opponent_name=element.name;
                break;
            }
            
        }

        if(parseInt(props.match_status)===1){
            return (
                <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Match with {props.player_two_name}</h5>
                            <p className="card-text">{parseInt(props.current_move) !== parseInt(props.myId)?"It your turn to play the game !":"Waiting for "+props.player_two_name+" to play !" }</p>
                            <a href={`/user/game?match_id=${props.match_id}`} className="btn btn-warning">{(parseInt(props.match_status)===1) && (parseInt(props.current_move) ===parseInt(props.myId))?"View Game !":"Play !"}</a>
                        </div>
                </div>
            )
        }
        else if(parseInt(props.match_status)===2){
            return (
                <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Match with {props.player_two_name}</h5>
                            <p className="card-text">{parseInt(props.match_win_by) === parseInt(props.myId)?"You won the match !":"You loss the match !" }</p>
                            <a href={`/user/game?match_id=${props.match_id}`} className="btn btn-warning">{(parseInt(props.match_status)===1) && (parseInt(props.current_move) ===parseInt(props.myId))?"View Game !":"Play !"}</a>
                        </div>
                </div>
            )
        }
        else{
            return (
                <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Match with {props.player_two_name}</h5>
                            <p className="card-text">Match Draw !!</p>
                            <a href={`/user/game?match_id=${props.match_id}`} className="btn btn-warning">View Game !</a>
                        </div>
                </div>
            )
        }
    }




    
}
