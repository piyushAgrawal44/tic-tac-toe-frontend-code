import React from 'react'

export default function Account() {
    let logged = localStorage.getItem("logged");
    if (!logged) {
        window.location.href = '/tic-tac-toe/#/login';
    }
    let myId = localStorage.getItem("logged_id");
    let name = localStorage.getItem("logged_name");
    let username = localStorage.getItem("logged_username");

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
                    <p className="text-muted">Account</p>
                    <h3>We never share your information with anyone !</h3>
                </div>

                <div className="myForm">
                    
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" readOnly className="form-control" id="username" placeholder='Type your username here' value={username} aria-describedby="usernameHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" readOnly className="form-control" id="name" placeholder='Type your name here' value={name} aria-describedby="nameHelp" />
                        </div>
                </div>

            </div>
    </>
  )
}
