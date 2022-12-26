import React, { useEffect, useState } from 'react';

import '../css/UserHome.css';
import Card from './Card';

export default function Home() {

    function logout() {
        localStorage.removeItem("logged");
        localStorage.removeItem("logged_id");
        localStorage.removeItem("logged_name");
        localStorage.removeItem("logged_username");
        window.location.href = "/tic-tac-toe/#/";
    }

    let logged = localStorage.getItem("logged");
    if (!logged) {
        window.location.href = '/tic-tac-toe/#/login';
    }
    let myId = localStorage.getItem("logged_id");
    useEffect(() => {
        fetchRepo();
    }, []);

    const [allMatchDetails, setallMatchDetails] = useState([]);

    async function fetchRepo() {
        await fetch("https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/fetch-all-match-details.php?player_one_id=" + myId).then(res => res.json()).then(data => {
            setallMatchDetails(data);
        });
    }

    let gameCount = allMatchDetails.length;

    if (gameCount === 0) {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <h5 className="navbar-brand" href="">Your Games</h5>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/tic-tac-toe/#/user/account">Account</a>
                                </li>
                                <li className="nav-item">
                                    <button className="ps-0 btn" aria-current="page" onClick={() => { logout() }}><i className="bi bi-arrow-bar-left"></i> <b>Logout</b></button>
                                </li>

                            </ul>

                        </div>
                    </div>
                </nav>
                <div className="container-fluid ">
                    <br /><br /><br /><br />
                    <div className="noGames text-center h-100 align-self-center">
                        <h2>No Games Found !</h2>
                        <br />
                        <a href="/tic-tac-toe/#/user/newgame" className="btn btn-warning">Start a new game</a>
                    </div>
                </div>
            </>
        )

    } else {
        return (
            <>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <div className="container-fluid">
                        <h5 className="navbar-brand" href="">Your Games</h5>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/tic-tac-toe/#/user/account">Account</a>
                                </li>
                                <li className="nav-item">
                                    <button className="ps-0 btn" aria-current="page" onClick={() => { logout() }}><i className="bi bi-arrow-bar-left"></i> <b>Logout</b></button>
                                </li>

                            </ul>

                        </div>
                    </div>
                </nav>
                <div className="container-fluid">
                    <br />
                    <br />
                    {allMatchDetails.map((element, i) =>

                        <Card key={i} player_two_name={element.player_two_name} player_two_username={element.player_two_username}
                            match_status={element.match_status} current_move={element.current_move} match_id={element.match_id}
                            match_win_by={element.match_win_by} myId={myId}

                        />
                    )}

                    <br /><br />
                    <a href="/tic-tac-toe/#/user/newgame" className="btn btn-dark  newGameButton">+ new game</a>

                </div>
            </>
        )
    }

}
