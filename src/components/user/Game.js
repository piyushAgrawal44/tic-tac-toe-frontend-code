import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import '../css/Game.css';
import tapSound from '../music/tap.wav';
import celebrationSound from '../music/celebration.mp3';
// import failureSound from '../music/failure.wav';
export default function Game() {

    let logged = localStorage.getItem("logged");
    if(!logged){
        window.location.href='/tic-tac-toe/#/login';
    }
    let myId = localStorage.getItem("logged_id");


    let url_string = window.location.href; 
    let result=url_string.split('?').reduce(function (res, item) {
        var parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
    }, {});

    // not working for hash url
    // let url = new URL(url_string);
    // let match_id = url.searchParams.get("match_id");


    let match_id = result["match_id"];
    
    
    useEffect(() => {
        fetchRepo();
    }, []);

    const [matchDetails, setmatchDetails] = useState([]);
   
    async function fetchRepo() {
        await fetch("https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/fetch-match-details.php?id="+match_id).then(res => res.json()).then(data => {
            setmatchDetails(data);
          
        });
    }  
  
    let tapSoundEffect=new Audio(tapSound);
    let celebrationSoundEffect=new Audio(celebrationSound);
    // let failureSoundEffect=new Audio(failureSound);

    function setBox(element){
        
        if((parseInt(matchDetails[0].current_move) !== parseInt(myId)) && (element.target.innerText==='') ){
            element.target.innerText="X";
            tapSoundEffect.play();
            // Check for a win
            let match_status=1,match_win_by=0;
            let matchWin=false;

            let winRules=[
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
            ];
    
            let boxes=document.getElementsByClassName('box');
    
            winRules.forEach(element => {
               
                if(boxes[element[0]].innerText !=="" && (boxes[element[0]].innerText===boxes[element[1]].innerText) && (boxes[element[1]].innerText===boxes[element[2]].innerText)){
                    
                    if(boxes[element[0]].innerText==='X'){
                        celebrationSoundEffect.play();
                        matchWin= true;
                        match_status=2;
                        match_win_by=myId;
                    }
                   
                }
            });
           

            if(!matchWin){
                let matchDraw=true;
                let boxes=document.getElementsByClassName('box');
                for (let i = 0; i < boxes.length; i++) {
                    const element = boxes[i];
                    if(element.innerText===''){
                        matchDraw=false;
                    }
                }
                if(matchDraw){
                    match_status=3;
                        match_win_by=3;
                }
            }
            
            $.ajax({
                url: "https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/game-update.php",
                type: 'POST',
                data: {
                    'match_id': match_id,
                    'box_id': element.target.id,
                    'user_id': myId,
                    "match_status":match_status,
                    "match_win_by":match_win_by
                },
                cache: false,
                success: function(data) {
                    
                    fetchRepo();
                    // console.log(data)
                },
                error: function(error) {
                    alert("Sorry some technical issue.");
                    // console.log(error)
                }
            });

        }
       
    }

    let statusMessage="Your Move",statusColor="warning";

   
    let match_status=1;
 
    const [opponentDetails, setopponentDetails] = useState([]);

  
   
    async function fetchPlayerDetails() {
        await fetch("https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/fetch-match-opponent.php?match_id="+match_id).then(res => res.json()).then(data => {
            setopponentDetails(data);
        });
    }  
    useEffect(() => {
        fetchPlayerDetails();
    }, []);

    function setOpponentName(data) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (parseInt(element.id) !== parseInt(myId)) {
                return element.name;
            }   
        }
    }

    function setOpponentUserName(data) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (parseInt(element.id) !== parseInt(myId)) {
                return element.username;
            }   
        }
    }

    if(matchDetails.length>0){
        match_status=matchDetails[0]["match_status"];

        if (parseInt(matchDetails[0]["match_win_by"]) === parseInt(myId)) {
            statusMessage="Congratulations ! You Won The Match";
            statusColor="success";
        }
        else if(parseInt(matchDetails[0]["match_win_by"]) ===3 && (parseInt(matchDetails[0]["match_win_by"]) ===3)){
            statusMessage="Match draw !";
            statusColor="info";
        } 
        else if(parseInt(matchDetails[0]["match_win_by"]) !==0 && (parseInt(matchDetails[0]["match_win_by"]) !==parseInt(myId))){
            statusMessage="Failure ! You loss The Match";
            statusColor="danger";
        } 
        else if(parseInt(matchDetails[0]["current_move"]) === parseInt(myId) && matchDetails[0]["match_status"]===1){
            statusMessage="Waiting for "+setOpponentName(opponentDetails)+" response !";
            statusColor="warning";
        } 
        else if(parseInt(matchDetails[0]["current_move"]) !== parseInt(myId) && matchDetails[0]["match_status"]===1){
            statusMessage="Your Move";
            statusColor="warning";
        } 
        else {
            statusMessage="Your Move";
            statusColor="warning";
        }


        let boxes=document.getElementsByClassName('box');
        
        for (let i = 0; i < boxes.length; i++) {
            const element = boxes[i];
            
            if(parseInt(matchDetails[0]["box"+i]) === parseInt(myId)){
                element.innerText='X';
            }
            else if(parseInt(matchDetails[0]["box"+i]) === 0){
                element.innerText='';
            }
            else{
                element.innerText='0';
            }

            if((parseInt(matchDetails[0].current_move) === parseInt(myId)) || (parseInt(matchDetails[0]["box"+i]) !== 0)){
                element.style.cursor = "not-allowed";
            } 
        }


    }

    function resetGame() {
        $.ajax({
            url: "https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/game-reset.php",
            type: 'POST',
            data: {
                'match_id': match_id,
            },
            cache: false,
            success: function(data) {
                fetchRepo();

                let boxes=document.getElementsByClassName('box');
        
                for (let i = 0; i < boxes.length; i++) {
                    const element = boxes[i];
                    
                        element.style.cursor = "pointer";
                    
                }
            },
            error: function(error) {
                alert("Sorry some technical issue.");
                // console.log(error)
            }
        });
    }

    

  return (
    <>
            <br />
            <div className="container-fluid">
                <div className="backButton ms-0 mb-2">
                    <a href="/tic-tac-toe/#/user/home" className="text-dark ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>
                    </a>
                </div>

                <div className="topText mb-4">
                    <h3>Game with {setOpponentName(opponentDetails)} ({setOpponentUserName(opponentDetails)})</h3>
                </div>

                <div className="d-flex fw-bold">
                    <div className="img me-2">
                      <b>X</b>
                    </div>
                    <span className='me-2'>-</span>
                    <span>You</span>
                </div>
                <br />
                <div className={`alert alert-${statusColor}`} role="alert">
                    <div className="statusAlert  text-center" id='statusAlert'>{statusMessage}</div>
                </div>
                <br />
                <div className="myBox">
                    <div className="row text-center gameBox">
                        <div id="0" className="box col-4 border border-3 border-warning border-top-0  border-start-0  border-end-0 p-3 " onClick={(e)=>{setBox(e)}}></div>
                        <div id="1" className="box col-4 border border-3 border-warning border-top-0 p-3" onClick={(e)=>{setBox(e)}}></div>
                        <div id="2" className="box col-4 border border-3 border-warning border-top-0  border-start-0  border-end-0 p-3" onClick={(e)=>{setBox(e)}}></div>
                    </div>

                    <div className="row text-center gameBox">
                        <div id="3" className="box col-4 border border-3 border-warning border-top-0  border-start-0  border-end-0 p-3 " onClick={(e)=>{setBox(e)}}></div>
                        <div id="4" className="box col-4 border border-3 border-warning border-top-0 p-3" onClick={(e)=>{setBox(e)}}></div>
                        <div id="5" className="box col-4 border border-3 border-warning border-top-0  border-start-0  border-end-0 p-3" onClick={(e)=>{setBox(e)}}></div>
                    </div>

                    <div className="row text-center gameBox">
                        <div id="6" className="box col-4 p-3 " onClick={(e)=>{setBox(e)}}></div>
                        <div id="7" className="box col-4 border border-3 border-warning border-top-0 border-bottom-0 p-3" onClick={(e)=>{setBox(e)}}></div>
                        <div id="8" className="box col-4  p-3" onClick={(e)=>{setBox(e)}}></div>
                    </div>
                </div>

                <br />
                <div className={`d-${match_status===1?"none":"block"} text-center`}>
                    <button onClick={()=>{resetGame()}} className='btn btn-warning'>Reset</button>
                </div>
            </div>


    </>
  )
}
