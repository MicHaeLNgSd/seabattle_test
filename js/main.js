console.log("main.js is working!)");
const userGrid = document.querySelector('.user-grid')
const computerGrid = document.querySelector('.computer-grid')
const ships = document.querySelectorAll('.ship')
const AllSquares = document.querySelectorAll('.square')
const userSquares = []
const computerSquares = []
const width = 10
var gameStart = false;

const startGam = document.querySelector("#startGame");
startGam.addEventListener("click", startGame);

const randForMe = document.querySelector("#randForMe");
randForMe.addEventListener("click", createShips);

// const randForComp = document.querySelector("#randForComp");
// randForComp.addEventListener("click", cleanBoard(computerSquares));



//Create Board
function createBoard(grid, squares) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        const square = document.createElement('div')
        square.dataset.y = i
        square.dataset.x = j
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
      } 
    }
}

createBoard(userGrid, userSquares)
createBoard(computerGrid, computerSquares)

//move around user ship
if(!gameStart){
  ships.forEach(ship =>{
    ship.addEventListener('dragstart', dragStart),
    ship.addEventListener('dragend', dragEnd)
    ship.addEventListener('drag', drag)
  });
  
  userSquares.forEach(square =>{
    //square.addEventListener('dragenter', dragEnter),
    //square.addEventListener('dragleave', dragLeave),
    square.addEventListener('dragover', dragOver),
    square.addEventListener('drop', dragDrop)
  });

  ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
    //const takingSection = e.target.id
    takingSectionId = parseInt(e.target.id.substr(-1))
    console.log("takingSection",takingSectionId)
  }))
}


let draggedShip
let draggedShipLength
let currentSquare
let takingSectionId

// userSquares.forEach(sq => sq.addEventListener('mousedown', (e) => {
//   generate()
// }))




function drag(){
  //console.log('drag')
}

function dragStart(e) {
  draggedShip = this
  draggedShipLength = this.childElementCount
  console.log("draggedShipLength", draggedShipLength)
  this.classList.add("ship-active")
  e.dataTransfer.setData("ship", this.id);
  console.log("ship",this.id)
}

function dragOver(e) {
  e.preventDefault()
  //console.log('dragOver')

  currentSquare = parseInt(this.dataset.y)*10 + parseInt(this.dataset.x)

  let shipStartY = Math.floor((currentSquare - takingSectionId)/10) 
  let shipEndY = Math.floor((currentSquare - takingSectionId + draggedShipLength - 1)/10)
  if (shipStartY === shipEndY){
    for(let i = currentSquare - takingSectionId; i < (currentSquare - takingSectionId + draggedShipLength); i++){
      userSquares[i].classList.add('taken')
    }
  }
}

function dragEnter(e) {
  e.preventDefault()
  console.log('dragEnter')
}

function dragLeave() {
 console.log('dragLeave')

  for(let i = currentSquare - takingSectionId; i < (currentSquare - takingSectionId + draggedShipLength); i++){
    userSquares[i].classList.remove('taken')
  }
}

function dragDrop(ev) {

  let shipStartY = Math.floor((currentSquare - takingSectionId)/10);
  let shipEndY = Math.floor((currentSquare - takingSectionId + draggedShipLength - 1)/10);

  //taken заменить на АКТИВ а так же полностью описать новый taken
  let isTaken = false;
  for(let i = currentSquare - takingSectionId; i < (currentSquare - takingSectionId + draggedShipLength) && i < userSquares.length - 1; i++){
    if(userSquares[i].classList.contains("taken")){
      isTaken = true;
    }
  }

  if (shipStartY === shipEndY ){ //&& !isTaken
  const flag = ev.dataTransfer.getData("ship");
  const ditem = document.querySelector(`[id="${flag}"]`)

  const y = Math.floor((currentSquare - takingSectionId)/10);
  const x = (currentSquare - takingSectionId)%10;

  console.log(y)
  console.log(x)

  const dsq = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
  
  console.log('currentSquare',currentSquare," ",takingSectionId)

  //console.log(ditem)
  console.log("dsq", dsq)
  dsq.append(ditem)
  //this.classList.remove("box-active") 
  }
}

function dragEnd() {
  console.log('dragend')
  draggedShip.classList.remove("ship-active")

  userSquares.forEach(sq=> sq.classList.remove('taken'))
}

//enemy board
function generate(GridSquares, shipId) {
  //let randomDirection = Math.round(Math.random())
  let shipById = document.querySelector(`[id="${shipId}"]`)
  //console.log("shipById", shipId, shipById)
  
  // let shipByIdChildCount  = shipById.childElementCount
  //console.log("shipByIdChildCount", shipByIdChildCount)
  //console.log("hi")
  //console.log(randomDirection)

  // for(let j = 0; j < 100; j++){
  //   computerSquares[j].classList.add('taken')
  // }

  for(let j = 0; j < 200; j++){ //while(true){
    let isTaken = false;
    let randomStart = Math.abs(Math.floor(Math.random() * GridSquares.length));
    //var randomStart = 4;

    //console.log("try", j);
    //console.log("randomStart",randomStart,GridSquares.length)

    let shipStartY = Math.floor(randomStart/10) 
    let shipEndY = Math.floor((randomStart + shipById.childElementCount - 1)/10)

    for(let i = randomStart; i < (randomStart + shipById.childElementCount) && i < GridSquares.length - 1; i++){ // проверить не мешают ли ему корабли на другом У
      if(GridSquares[i].classList.contains("taken")){
        isTaken = true;
      }
    }

    //console.log("shipStartY",shipStartY)
    if (shipStartY === shipEndY && !isTaken){

      for(let i = -1; i <= 1; i++){
        
        //console.log("ArroundY", Math.floor((randomStart + i*10) / 10));

        if( (randomStart + i*10) < 0 || (randomStart + i*10) > 99){ 
          continue;
        }

        for(let j = randomStart + i*10 - 1; j < (randomStart + i*10 + shipById.childElementCount + 1); j++){

          if(j < (shipStartY + i)*10 || j > (shipStartY + i) * 10 + 9){ 
            //console.log("i,j", i,j )
            continue;
          }
          GridSquares[j].classList.add('taken');

          if(i === 0 && j > (randomStart + i*10 - 1) && j < (randomStart + i*10 + shipById.childElementCount)){ 
            GridSquares[j].classList.add('takenByShip');
          }
        }
      }
      GridSquares[randomStart].append(shipById);
      break;
      //console.log("ship",this.id)
    }
  }

  //const isTaken = GridSquares[randomStart].classList.contains('taken');
  
  //GridSquares[randomStart].classList.add('taken');

  //if(!isTaken){
  //  console.log("not taking")
  // } else {
  //   console.log("taking")
  // }

}

console.log("ship1")
generate(computerSquares,"enemyShip1");

generate(computerSquares,"enemyShip2");
generate(computerSquares,"enemyShip3");

generate(computerSquares,"enemyShip4");
generate(computerSquares,"enemyShip5");
generate(computerSquares,"enemyShip6");

generate(computerSquares,"enemyShip7");
generate(computerSquares,"enemyShip8");
generate(computerSquares,"enemyShip9");
generate(computerSquares,"enemyShip10");


// for(let i = randomStart; i < (randomStart + shipById.childElementCount) ; i++){
      //   GridSquares[i].classList.add('taken');
      // }


function createShips(){
  cleanBoard(userSquares);

  generate(userSquares,"ship1");

  generate(userSquares,"ship2");
  generate(userSquares,"ship3");

  generate(userSquares,"ship4");
  generate(userSquares,"ship5");
  generate(userSquares,"ship6");

  generate(userSquares,"ship7");
  generate(userSquares,"ship8");
  generate(userSquares,"ship9");
  generate(userSquares,"ship10");
}

function cleanBoard(sq){
  for(let i = 0; i < width*width; i++){
    sq[i].classList.remove('taken')
    sq[i].classList.remove('takenByShip')
  }
} 

function startGame(){
  gameStart = true
  console.log("gameStart",gameStart)
  ships.forEach(ship =>{
      ship.setAttribute('draggable', false);
      ship.addEventListener('dragstart', ()=>false);
      ship.classList.add('unselectable');
    }
  )
  ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
    let takingSectionDead = e.target.id
    console.log("takingSectionDead",takingSectionDead)
    let shipsdead = document.querySelector(`[id="${takingSectionDead}"]`)
    console.log("shipsdead",shipsdead)
    shipsdead.classList.add('dead')
    //takingSectionId = parseInt(e.target.id.substr(-1)) 
  }))

  AllSquares.forEach(sq => sq.addEventListener('mousedown', (e) => {
    console.log("sqDead")
    //let sqDead = e.target.dataset.x
    //console.log("sqDead",sqDead)
    // let shipsdead = document.querySelector(`[id="${takingSectionDead}"]`)
    // console.log("shipsdead",shipsdead)
    // shipsdead.classList.add('dead')
    //takingSectionId = parseInt(e.target.id.substr(-1)) 
  }))
}      