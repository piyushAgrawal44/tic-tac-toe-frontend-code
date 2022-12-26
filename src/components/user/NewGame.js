import React, { useState,useEffect } from 'react'
import '../css/NewGame.css';
import $ from 'jquery'

export default function NewGame() {
    let logged = localStorage.getItem("logged");
    if(!logged){
        window.location.href='/tic-tac-toe/#/login';
    }
    let myId = localStorage.getItem("logged_id");
    const [users, setusers] = useState([])

    useEffect(() => {
        fetchRepo();
    }, []);

    async function fetchRepo() {
        await fetch("https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/fetch-user.php").then(res => res.json()).then(data => {
            setusers(data);
        });
    }
    
    function selectUser(id) {
        for (let i = 0; i < users.length; i++) {
            if (users[i]['id'] === id) {
                document.getElementById('email').value = users[i]['email'];
                break;
            }
        }
        showUsersList();
    
    }

    function searchEmail(ele) {

        let keyword = ele.target.value;
        if (keyword === '' || keyword === " ") {
            removeusersList();
            return 0;
        }
    
        let myUsers = [];
    
        let sno = 0;
        for (let index = 0; index < users.length; index++) {
            if ((parseInt(users[index]["id"]) !== parseInt(myId)) && users[index]["email"].includes(keyword) ) {
                myUsers[sno] = users[index];
                sno++;
            }
        }
        removeusersList();

        // console.log(myUsers);

        if (myUsers.length > 0) {
    
            for (let index = 0; index < myUsers.length; index++) {
                let data = myUsers[index];
    
    
                let newSpan = document.createElement('span');
                newSpan.classList.add("userName");
                newSpan.innerText = data["email"];

                let innerDiv1 = document.createElement('div');
                innerDiv1.append(newSpan);
               

                let newButton = document.createElement('button');
                newButton.classList.add("btn");
                newButton.classList.add("btn-primary");
                newButton.classList.add("btn-sm");
                newButton.classList.add("p-1");
                // newButton.setAttribute('onclick', 'selectUser(' + data["id"] + ')');
                newButton.addEventListener('click',()=>{selectUser(data["id"])});
                newButton.innerText = "Select";
                newButton.type = "button";
    
                let innerDiv2 = document.createElement('div');
                innerDiv2.append(newButton);
    
                let newDiv = document.createElement('div');
                newDiv.classList.add("users");
                newDiv.id = data["email"];
                newDiv.append(innerDiv1);
                newDiv.append(innerDiv2);
    
                let usersListDiv = document.getElementById('usersList');
                usersListDiv.append(newDiv);
    
            }
    
        } else {
            removeusersList();
        }
    
    }
    
    function removeusersList() {
        let usersListDiv = document.getElementById('usersList');
        let childCount = usersListDiv.children.length;
        for (let index = 0; index < childCount; index++) {
            usersListDiv.children[0].remove();
        }
    }
    
    let showCustomer = 1;
    function showUsersList() {
        if (showCustomer === 1) {
            document.getElementsByClassName('inputArrow')[0].style.bottom = "10%";
            document.getElementById('bi-chevron-down').classList.remove('bi-chevron-down');
            document.getElementById('bi-chevron-down').classList.add('bi-chevron-up');
            document.getElementById('usersList').style.display = 'block';
            showCustomer = 0;
        }
        else {
    
            document.getElementsByClassName('inputArrow')[0].style.bottom = "10%";
            document.getElementById('bi-chevron-down').classList.add('bi-chevron-down');
            document.getElementById('bi-chevron-down').classList.remove('bi-chevron-up');
            document.getElementById('usersList').style.display = 'none';
            showCustomer = 1;
        }
    }


    function newGameForm(e) {
        e.preventDefault();
        let email=document.getElementById('email').value;
        let id=-1;
        for (let index = 0; index < users.length; index++) {
            if (users[index]["email"]===email && (parseInt(users[index]["id"]) !== parseInt(myId))) {
                id = users[index]['id'];
            }
        }
        if(id===-1){
            alert("User does not exist !");
            return 0;
        }

        $.ajax({
            url: "https://wodrsbattlegame.000webhostapp.com/backend_for_tic_tac_toe/newGame.php",
            type: 'POST',
            data: {
                
                'player_one_id': myId,
                'player_two_id':id,
            },
            cache: false,
            success: function(data) {
                
                let myData=JSON.parse(data);

                if(myData.success===true){
                    window.location.href=`/tic-tac-toe/#/user/game?match_id=${myData.match_id}`;
                }
            },
            error: function(error) {
                document.getElementById('alertMessage').innerText=error.responseText;
                document.getElementById('loginAlert').style.visibility='visible';
                
                setTimeout(() => {
                    document.getElementById('loginAlert').style.visibility='hidden';
                }, 3000);
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
                    <p className="text-muted">Start a new game</p>
                    <h3>Whom do you want to play with ?</h3>
                </div>

                <div className="myForm">
                    <form id='newGameForm' onSubmit={(e)=>{newGameForm(e)}}>
                        <div className="emailBox" >
                            <label htmlFor="email" className="form-label" >Email</label>
                            <div className="inputArrow"><b><i id="bi-chevron-down" onClick={()=>showUsersList()} className="bi bi-chevron-down"></i></b></div>
                            <input type="text" className="form-control" id="email" onClick={()=>showUsersList()} onInput={(e)=>searchEmail(e)} placeholder='Type their email here' aria-describedby="emailHelp" />
                        </div>
                        <div className="usersList mb-3" id="usersList">
                        </div>
                        <br />
                        <div className="alert alert-danger loginAlert" id='loginAlert' role="alert">
                            <span className="alertMessage" id="alertMessage"></span>
                        </div>
                       
                        <button type="submit" className="btn btn-warning fixed-bottom m-2">Start Game</button>
                    </form>
                </div>

            </div>
    </>
  )
}
