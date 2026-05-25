const startBtn=document.getElementById("startBtn");
const game=document.getElementById("game");
const countdown=document.getElementById("countdown");
const focus=document.getElementById("focus");

let score=0;
let speed=7;

const keys=["D","F","J","K"];

startBtn.onclick=startGame;

function startGame(){

document.getElementById(
"startScreen"
).style.display="none";

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

setTimeout(endGame,60000);

}

function createNote(){

let laneNum=Math.floor(Math.random()*4);

let lanes=document.querySelectorAll(".lane");

let note=document.createElement("div");

note.className="note";

note.dataset.y=0;

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

note.moveInterval=move;

}

document.addEventListener("keydown",(e)=>{

let key=e.key.toUpperCase();

let index=keys.indexOf(key);

if(index===-1)return;

let lane=document.querySelectorAll(".lane")[index];

let note=lane.querySelector(".note");

if(!note)return;

let y=parseInt(note.dataset.y);

let hitPosition=
window.innerHeight-150;

let distance=
Math.abs(hitPosition-y);

let point=0;

if(distance<20){

point=10;
showJudge("Perfect");

}

else if(distance<50){

point=5;
showJudge("Good");

}

else{

showJudge("Miss");
return;

}

score+=point;

focus.innerText=score;

clearInterval(
note.moveInterval
);

note.remove();

});

function showJudge(text){

let judge=
document.createElement("div");

judge.innerText=text;

judge.style.position="absolute";
judge.style.left="50%";
judge.style.top="40%";
judge.style.transform=
"translateX(-50%)";

judge.style.fontSize="40px";
judge.style.fontWeight="bold";

document.body.appendChild(judge);

setTimeout(()=>{

judge.remove();

},500);

}

function createDistraction(){

let messages=[

"📱 SNS 알림!",
"🎮 게임 초대!",
"💬 새 메시지!",
"📢 광고 등장!",
"🔥 오늘만 할인!",
"📺 새 영상 업로드!"

];

let popup=
document.createElement("div");

popup.className="popup";

popup.innerText=
messages[
Math.floor(
Math.random()
*messages.length
)
];

if(Math.random()<0.5){

popup.style.top="50px";
popup.style.left=
Math.random()*70+"%";

}

else{

popup.style.top="50%";
popup.style.left="50%";

popup.style.transform=
"translate(-50%,-50%)";

}

document.body.appendChild(
popup
);

setTimeout(()=>{

popup.remove();

},3000);

}

function endGame(){

alert(
"당신의 집중도는 "
+score+
" 입니다"
);

location.reload();

}
