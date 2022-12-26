import React from 'react'
import './css/Register.css';
import $ from 'jquery';
export default function Register() {
    function createUser(e) {
        e.preventDefault();
        let name=document.getElementById('name').value;
        let username=document.getElementById('username').value;

        let email=document.getElementById('email').value;
        let password=document.getElementById('password').value;

        if (!name) {
            document.getElementById('alertMessage').innerText="Please enter a valid name !"
            document.getElementById('loginAlert').style.visibility='visible'; 
            return ;
        }
        else{
            document.getElementById('loginAlert').style.visibility='hidden';
        }

        if (!username) {
            document.getElementById('alertMessage').innerText="Please enter a valid username !"
            document.getElementById('loginAlert').style.visibility='visible'; 
            return ;
        }
        else{
            document.getElementById('loginAlert').style.visibility='hidden';
        }

        if (!email) {
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
        

        // check for duplicates
        $.ajax({
            url: "https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/check-duplicates.php",
            type: 'POST',
            data: {
                'username': username,
                'email': email
            },
            cache: false,
            success: function(data) {
                let myData=JSON.parse(data);
                let email_registered,username_registered;
                email_registered=myData.email_registered;
                username_registered=myData.username_registered;
                // console.log(myData.email_registered);

                if(username_registered){
                    document.getElementById('alertMessage').innerText="Username is already registered !"
                    document.getElementById('loginAlert').style.visibility='visible'; 
                    return 0;
                }
                else{
                    document.getElementById('loginAlert').style.visibility='hidden';
                }

                if(email_registered){
                    document.getElementById('alertMessage').innerText="Email id is already registered !"
                    document.getElementById('loginAlert').style.visibility='visible'; 
                    return 0;
                }
                else{
                    document.getElementById('loginAlert').style.visibility='hidden';
                }
        
                $.ajax({
                    url: "https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/register.php",
                    type: 'POST',
                    data: {
                        'name': name,
                        'username': username,
                        'email': email,
                        'password': password
                    },
                    cache: false,
                    success: function(data) {
                    //    console.log(data); 
                        document.getElementById('loginAlert').className="";
                        document.getElementById('loginAlert').classList.add("text-success");  
                        document.getElementById('alertMessage').innerText="Successfully account created !"
                        document.getElementById('loginAlert').style.visibility='visible'; 
                        window.location.href="/tic-tac-toe/#/login?success=true&message=Successfully account created";
                    },
                    error: function(error) {
                        alert("Sorry some technical issue.");
                    }
                });
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

  return (
    <>
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
                    <p className="text-muted">Register</p>
                    <h3>Let's get to know you better!</h3>
                </div>

                <div className="myForm">
                    <form onSubmit={(e)=>{createUser(e)}}>
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="name" className="form-control" id="name" placeholder='Type your full name here' aria-describedby="nameHelp" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" placeholder='Type your username here' aria-describedby="usernameHelp" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder='Type your email here' aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder='Type your password here' id="password" />
                        </div>

                        <div className="mb-2 form-check">
                            <input type="checkbox" className="form-check-input" onClick={(e)=>{showPassword(e)}} />
                            <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                        </div>

                        <div className="alert alert-danger loginAlert" id='loginAlert' role="alert">
                            <span className="alertMessage" id="alertMessage"></span>
                        </div>
                        <button type="submit" className="btn btn-primary  fixed-bottom loginButton">Register</button>
                    </form>
                </div>

            </div>
        </>
  )
}
