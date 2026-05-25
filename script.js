const startBtn=document.getElementById("startBtn");
const game=document.getElementById("game");
const countdown=document.getElementById("countdown");
const focus=document.getElementById("focus");

let score=0;
let speed=5;

const keys=["D","F","J","K"];

startBtn.onclick=startGame;

function startGame(){

document.getElementById("startScreen").style.display="none";

let count=3;

countdown.innerText=count;

let timer=setInterval(()=>{

count--;

if(count>0){

countdown.innerText=count;

}
else if(count===0){

countdown.innerText="START";

}
else{

clearInterval(timer);

countdown.style.display="none";

game.style.display="block";

playGame();

}

},1000);

}

function playGame(){

setInterval(createNote,1000);

setInterval(createDistraction,5000);

setTimeout(endGame,120000);

}

function createNote(){

let laneNum=Math.floor(Math.random()*4);

let lanes=document.querySelectorAll(".lane");

let note=document.createElement("div");

note.className="note";

lanes[laneNum].appendChild(note);

let y=0;

let move=setInterval(()=>{

y+=speed;

note.style.top=y+"px";

if(y>window.innerHeight){

note.remove();

clearInterval(move);

}

},20);

}

document.addEventListener("keydown",(e)=>{

let key=e.key.toUpperCase();

if(keys.includes(key)){

score+=10;

focus.innerText=score;

}

});

function createDistraction(){

let popup=document.createElement("div");

popup.className="popup";

popup.innerText="📱 SNS 알림!";

document.body.appendChild(popup);

setTimeout(()=>{

popup.remove();

},3000);

}

function endGame(){

alert("당신의 집중도는 "+score+" 입니다");

location.reload();

}
