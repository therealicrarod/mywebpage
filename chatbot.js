'use strict'

var ini = document.getElementById("accept");
var usr, res;
var conversation=document.getElementById("conversation");

//check cookies
window.addEventListener('load', function() {
    checkCookie();
});

//validate username & start conversation
ini.addEventListener("click",()=>{
    start();
    nonValidUsr(false);
})

// send user to validation & in case of valid user start app
async function start (){ 
  usr = {"user" : document.getElementById("user").value};
  
  //set user unique id
  let id = crypto.randomUUID();
  //console.log(usr);
 
  //send the user payload to server
  await fetch('https://rowan-general-buffet.glitch.me/chatbot', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ "type": "user",
      "data" :{
      "name" : usr,
      "ID" : id
    }}),
})
.then(async function(response) {
   if(response.ok) {
     let res = await response.json();
     console.log(res);
      await responseStatusHandler(res.message);
   } else {
       throw "Error en la llamada Ajax de usuario";
   }

})}

//what to do in validation cases
function responseStatusHandler(value) {
  switch (value){
    case "NonValidUser":
      nonValidUsr(true);
      break
    case "ValidUser":
      startChat();
      break;
    case "NonValidMsg":
      nonValidMsg(true);
      break
    case "validMsg":
      createResponse(res);
  }
}

//nonvalid user function
function nonValidUsr(value){
  let error = document.getElementById("wrongUsr");
  let display = value;
  
  if (display){
    error.style.display="block"
  }else{
    error.style.display="none"
  }
}

//non valid message function
function nonValidMsg(value){
  let error = document.getElementById("wrongMsg");
  let display = value;
  
  if (display){
    error.style.display="block";
    let usrMsg = document.getElementById("usrMsg");
    usrMsg.addEventListener("click",()=>{
      error.style.display="none";
    })
  }
}

// if is valid the user
async function startChat(){
  setCookie("username", usr.user, 10);
  
  let messageInput = document.getElementById("input");
  let start = document.getElementById("usr_input");
  let conversation = document.getElementById("conversation");
  start.style.display='none';
  messageInput.style.display='flex';
  conversation.style.display='flex';
  sendMessage();
}

//start the send message function
async function sendMessage () {
  
  let msg = document.getElementById("usrMsg");
  let send = document.getElementById("sendMsg");
  
  send.addEventListener("click",async () =>{
  /**
  * @param {object} message payload
  */
  fetchMsg(msg);
    })
  //the start button also send message
  addEventListener('keydown', (e)=>{
    if (e.code === "Enter"){
      fetchMsg(msg);
    }
  })
}

//this function sends the msg payload to server

async function fetchMsg(value){
    echoMsg(value);
     await fetch('https://rowan-general-buffet.glitch.me/chatbot', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"type":"message",
      "data":{
        "user":usr,
      "message":value.value}})     
              
            })
    .then(async function(response) {
   if(response.ok) {
     res = await response.json();
      console.log(res);
      responseStatusHandler(res.message.validation);
   } else {
       throw "Error en la llamada Ajax";
   }   
  }
)}

//if the response is success or code 200 create the response element to display
async function createResponse(payload){
  let p = document.createElement("P");
  await p.classList.add("botTxt");
  //console.log(payload);
  p.innerHTML=payload.message.payload.value;
  await conversation.appendChild(p);
  conversation.scrollTop=conversation.scrollHeight;
}

//show the user input on the dialog space
/**
*@param {object} get the response object and display
*/
async function echoMsg(payload){
  console.log(payload);
  let p = document.createElement("P");
  await p.classList.add("usrTxt");
  if(payload.value != undefined){
  p.innerHTML=payload.value;
  await conversation.appendChild(p);
  let msg = document.getElementById("usrMsg");
  msg.value = "";
  }
}

//cookie code
function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  console.log(user);
  if (user != "") {
    document.getElementById("user").setAttribute("value",user);
  }
}