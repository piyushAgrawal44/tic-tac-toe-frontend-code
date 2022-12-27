import React from 'react';
import './css/Home.css';

export default function Home() {
    let logged = localStorage.getItem("logged");
    if(logged){
        window.location.href='/tic-tac-toe/#/user/home';
    }
    return (
        <>
            <div className="container-fluid">
                <br /><br />
                <div className="text-center">
                    <h1>Multiplayer Tic Tac Toe Game</h1>
                </div>
                <br /><br />
                <div className="d-flex flex-direction-column justify-content-center">
                    <a href="/tic-tac-toe/#/login" className="btn btn-warning buttonCat1 btn-lg px-4 mb-3">
                        Login
                    </a>

                    <div className='text-center mb-3'>Or</div>

                    <a href="/tic-tac-toe/#/register" className="btn btn-primary buttonCat1 btn-lg px-4 mb-3">
                        Register
                    </a>
                </div>
            </div>
        </>
    )
}
