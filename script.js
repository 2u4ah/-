const startBtn=document.getElementById("startBtn");
const game=document.getElementById("game");
const countdown=document.getElementById("countdown");
const focus=document.getElementById("focus");

let score=0;
let speed=7;

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

setInterval(createNote,900);

setInterval(createDistraction,5000);

setTimeout(()=>{

speed=10;

},20000);

setTimeout(endGame,120000);

}

function createNote(){

let laneNum=Math.floor(Math.random()*4);

let lanes=document.querySelectorAll(".lane");

let note=document.createElement("div");

note.className="note";

note.dataset.lane=laneNum;

note.style.top="0px";

lanes[laneNum].appendChild(note);

let y=0;

let move=setInterval(()=>{

y+=speed;

note.style.top=y+"px";

note.dataset.y=y;

if(y>window.innerHeight){

note.remove();
clearInterval(move);

}

},20);

note.dataset.move=move;

}

document.addEventListener("keydown",(e)=>{

let key=e.key.toUpperCase();

let index=keys.indexOf(key);

if(index===-1) return;

let lane=document.querySelectorAll(".lane")[index];

let note=lane.querySelector(".note");

if(!note) return;

let y=parseInt(note.dataset.y);

let hitPosition=window.innerHeight-150;

let distance=Math.abs(hitPosition-y);

let point=0;

if(distance<20){

point=10;
console.log("Perfect");

}
else if(distance<50){

point=5;
console.log("Good");

}
else{

point=0;
console.log("Miss");

}

score+=point;

focus.innerText=score;

if(point>0){

clearInterval(note.dataset.move);

note.remove();

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
