import React from 'react';
import './css/Login.css';
import $ from 'jquery'
export default function Login() {
    let logged = localStorage.getItem("logged");
    if(logged){
        window.location.href='/tic-tac-toe/user/home';
    }

    function loginUser(e) {
        e.preventDefault();
        let username=document.getElementById('username').value;
        let password=document.getElementById('password').value;

        if (!username) {
            document.getElementById('alertMessage').innerText="Please enter a valid email id !"
            document.getElementById('loginAlert').style.visibility='visible'; 
            return ;
        }
        else{
            document.getElementById('loginAlert').style.visibility='hidden';
        }
        if(!password || password.length<6){
            document.getElementById('alertMessage').innerText="Please enter a valid password !"
            document.getElementById('loginAlert').style.visibility='visible'; 
            return ;
        }
        else{
            document.getElementById('loginAlert').style.visibility='hidden';
        }

        $.ajax({
            url: "https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/login.php",
            type: 'POST',
            data: {
                'username': username,
                'password': password
            },
            cache: false,
            success: function(data) {
                let myData=JSON.parse(data);
                if(myData.status===true){
                    localStorage.setItem("logged", true);
                    localStorage.setItem("logged_id", myData.user_id);
                    localStorage.setItem("logged_name", myData.name);
                    localStorage.setItem("logged_username", myData.username);
                    window.location.href="/tic-tac-toe/user/home";
                }
                else{
                    alert("Sorry some technical issue.");
                }
                // console.log(data);
            },
            error: function(error) {
                alert("Sorry some technical issue.");
            }
        });
    }

    function showPassword(e) {
        
        if (e.target.checked) {
            document.getElementById('password').type='text';
        }else{
            document.getElementById('password').type='password';
        }
    }

    let url_string = window.location.href; 
    let url = new URL(url_string);
    let success = url.searchParams.get("success");
    let message = url.searchParams.get("message");


    return (
        <>
            
            <div className={`alert alert-${success?"primary":"danger"} alert-dismissible fade show ${success===null?"d-none":""}`} role="alert">
                 {message}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <br />
            <div className="container-fluid">
                <div className="backButton ms-0 mb-2">
                    <a href="/" className="text-dark ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>
                    </a>
                </div>

                <div className="topText mb-4">
                    <p className="text-muted">Login</p>
                    <h3>Please enter your details</h3>
                </div>

                <div className="myForm">
                    <form id='loginForm' onSubmit={(e)=>{loginUser(e)}}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" placeholder='Type your username here' aria-describedby="usernameHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder='Type your password here' id="password" />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" onClick={(e)=>{showPassword(e)}} />
                            <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                        </div>

                        <div className="alert alert-danger loginAlert" id='loginAlert' role="alert">
                            <span className="alertMessage" id="alertMessage"></span>
                        </div>
                        <button type="submit" className="btn btn-warning fixed-bottom loginButton">Login</button>
                    </form>
                </div>

            </div>
        </>
    )
}
