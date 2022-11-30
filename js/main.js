console.log("main.js is connected!)");
const userGrid = document.querySelector('.user-grid')
const computerGrid = document.querySelector('.computer-grid')
const userShipsArea = document.querySelector('.user-ships')
const computerShipsArea = document.querySelector('.computer-ships')
const ships = document.querySelectorAll('.ship')
const AllSquares = document.querySelectorAll('.square')
const userSquares = []
const computerSquares = []
const width = 10
const countShips = 10
let gameStart = false;
let isPlayer1 = true;
const turnDisplay = document.querySelector('#whose-go')

const startG = document.querySelector("#startGame");
startG.addEventListener("click", startGame);

const randForMe = document.querySelector("#randForMe");
randForMe.addEventListener("click", () => createShips(userSquares));

const randForEnemy = document.querySelector("#randForEnemy");
randForEnemy.addEventListener("click", () => createShips(computerSquares));

const CleanMe = document.querySelector("#CleanMe");
CleanMe.addEventListener("click", () => cleanBoard(userSquares));

const CleanEnemy = document.querySelector("#CleanEnemy");
CleanEnemy.addEventListener("click", () => cleanBoard(computerSquares));

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
if (!gameStart) {
    ships.forEach(ship => {
        ship.addEventListener('dragstart', dragStart),
            ship.addEventListener('dragend', dragEnd)
        ship.addEventListener('drag', drag)
    });

    userSquares.forEach(square => {
        //square.addEventListener('dragenter', dragEnter),
        //square.addEventListener('dragleave', dragLeave),
        square.addEventListener('dragover', dragOver),
            square.addEventListener('drop', dragDrop)
    });

    ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
        //const takingSection = e.target.id
        takingSectionId = parseInt(e.target.id.substr(-1))
        console.log("takingSection", takingSectionId)
    }))
}


let draggedShip
let draggedShipLength
let currentSquare
let takingSectionId

// userSquares.forEach(sq => sq.addEventListener('mousedown', (e) => {
//   generate()
// }))




function drag() {
    //console.log('drag')
}

function dragStart(e) {
    draggedShip = this
    draggedShipLength = this.childElementCount
    console.log("draggedShipLength", draggedShipLength)
    this.classList.add("ship-active")
    e.dataTransfer.setData("ship", this.id);
    console.log("ship", this.id)
}

function dragEnter(e) {
    e.preventDefault()
    //console.log('dragOver')

    currentSquare = parseInt(this.dataset.y) * 10 + parseInt(this.dataset.x)

    let shipStartY = Math.floor((currentSquare - takingSectionId) / 10)
    let shipEndY = Math.floor((currentSquare - takingSectionId + draggedShipLength - 1) / 10)
    if (shipStartY === shipEndY) {
        for (let i = currentSquare - takingSectionId; i < (currentSquare - takingSectionId + draggedShipLength); i++) {
            userSquares[i].classList.add('taken')
        }
    }
}

// function dragEnter(e) {
//    e.preventDefault()
//    console.log('dragEnter')
// }

function dragLeave() {
    console.log('dragLeave')

    for (let i = currentSquare - takingSectionId; i < (currentSquare - takingSectionId + draggedShipLength); i++) {
        //userSquares[i].classList.remove('taken')
    }
}

function dragDrop(ev) {

    let shipStartY = Math.floor((currentSquare - takingSectionId) / 10);
    let shipEndY = Math.floor((currentSquare - takingSectionId + draggedShipLength - 1) / 10);

    //taken заменить на АКТИВ а так же полностью описать новый taken
    let isTaken = false;
    for (let i = currentSquare - takingSectionId; i < (currentSquare - takingSectionId + draggedShipLength) && i < userSquares.length - 1; i++) {
        if (userSquares[i].classList.contains("taken")) {
            isTaken = true;
        }
    }

    if (shipStartY === shipEndY) { //&& !isTaken
        const flag = ev.dataTransfer.getData("ship");
        const ditem = document.querySelector(`[id="${flag}"]`)

        const y = Math.floor((currentSquare - takingSectionId) / 10);
        const x = (currentSquare - takingSectionId) % 10;

        console.log(y)
        console.log(x)

        const dsq = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)

        console.log('currentSquare', currentSquare, " ", takingSectionId)

        //console.log(ditem)
        console.log("dsq", dsq)
        dsq.append(ditem)
        //this.classList.remove("box-active") 
    }
}

function dragEnd() {
    console.log('dragend')
    draggedShip.classList.remove("ship-active")

    userSquares.forEach(sq => sq.classList.remove('taken'))
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

    for (let j = 0; j < 200; j++) { //while(true){
        let isTaken = false;
        let randomStart = Math.abs(Math.floor(Math.random() * GridSquares.length));
        //var randomStart = 4;

        //console.log("try", j);
        //console.log("randomStart",randomStart,GridSquares.length)

        let shipStartY = Math.floor(randomStart / 10)
        let shipEndY = Math.floor((randomStart + shipById.childElementCount - 1) / 10)

        for (let i = randomStart; i < (randomStart + shipById.childElementCount) && i < GridSquares.length - 1; i++) { // проверить не мешают ли ему корабли на другом У
            if (GridSquares[i].classList.contains("taken")) {
                isTaken = true;
            }
        }

        //console.log("shipStartY",shipStartY)
        if (shipStartY === shipEndY && !isTaken) {

            for (let i = -1; i <= 1; i++) {

                //console.log("ArroundY", Math.floor((randomStart + i*10) / 10));

                if ((randomStart + i * 10) < 0 || (randomStart + i * 10) > 99) {
                    continue;
                }

                for (let j = randomStart + i * 10 - 1; j < (randomStart + i * 10 + shipById.childElementCount + 1); j++) {

                    if (j < (shipStartY + i) * 10 || j > (shipStartY + i) * 10 + 9) {
                        //console.log("i,j", i,j )
                        continue;
                    }
                    GridSquares[j].classList.add('taken');

                    if (i === 0 && j > (randomStart + i * 10 - 1) && j < (randomStart + i * 10 + shipById.childElementCount)) {
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

//console.log("ship1")
// generate(computerSquares,"enemyShip1");

// generate(computerSquares,"enemyShip2");
// generate(computerSquares,"enemyShip3");

// generate(computerSquares,"enemyShip4");
// generate(computerSquares,"enemyShip5");
// generate(computerSquares,"enemyShip6");

// generate(computerSquares,"enemyShip7");
// generate(computerSquares,"enemyShip8");
// generate(computerSquares,"enemyShip9");
// generate(computerSquares,"enemyShip10");


// for(let i = randomStart; i < (randomStart + shipById.childElementCount) ; i++){
//   GridSquares[i].classList.add('taken');
// }


function createShips(squares) {
    console.log("squares", squares);
    cleanBoard(squares);

    if (squares === computerSquares) {
        console.log("ENEMY");
        generate(squares, "enemyShip1");

        generate(squares, "enemyShip2");
        generate(squares, "enemyShip3");

        generate(squares, "enemyShip4");
        generate(squares, "enemyShip5");
        generate(squares, "enemyShip6");

        generate(squares, "enemyShip7");
        generate(squares, "enemyShip8");
        generate(squares, "enemyShip9");
        generate(squares, "enemyShip10");
    }
    else if (squares === userSquares) {
        generate(squares, "ship1");

        generate(squares, "ship2");
        generate(squares, "ship3");

        generate(squares, "ship4");
        generate(squares, "ship5");
        generate(squares, "ship6");

        generate(squares, "ship7");
        generate(squares, "ship8");
        generate(squares, "ship9");
        generate(squares, "ship10");
    }
}

function cleanBoard(squares) {
    let shipsArea
    let shipNameStart
    squares.forEach(square => {
        square.classList.remove('taken')
        square.classList.remove('takenByShip')
    })

    if (squares === userSquares) {
        shipsArea = userShipsArea
        shipNameStart = 's'
    }
    else if (squares === computerSquares) {
        shipsArea = computerShipsArea
        shipNameStart = 'enemyS'
    }

    for (let i = 1; i <= countShips; i++) {
        //console.log(`[id="${shipNameStart}hip${i}"]`)
        shipById = document.querySelector(`[id="${shipNameStart}hip${i}"]`)
        shipsArea.append(shipById)
    }
}

let isGameOver = false

// function startGame(){
//   if (isGameOver) return
//   if (currentPlayer === 'user') {
//     turnDisplay.innerHTML = 'Your Go'
//     computerSquares.forEach(square => square.addEventListener('click', function(e) {
//       revealSquare(square)
//     }))
//   }
//   if (currentPlayer === 'computer') {
//     turnDisplay.innerHTML = 'Computers Go'
//     setTimeout(computerGo, 1000)
//   }

//   gameStart = true
//   console.log("gameStart",gameStart)
//   ships.forEach(ship =>{
//       ship.setAttribute('draggable', false);
//       ship.addEventListener('dragstart', ()=>false);
//       ship.classList.add('unselectable');
//     }
//   )
//   ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
//     let takingSectionDead = e.target.id
//     console.log("takingSectionDead",takingSectionDead)
//     let shipsdead = document.querySelector(`[id="${takingSectionDead}"]`)
//     console.log("shipsdead",shipsdead)
//     shipsdead.classList.add('dead')
//     //takingSectionId = parseInt(e.target.id.substr(-1)) 
//   }))

//   AllSquares.forEach(sq => sq.addEventListener('mousedown', (e) => {
//     console.log("sqDead")
//     //let sqDead = e.target.dataset.x
//     //console.log("sqDead",sqDead)
//     // let shipsdead = document.querySelector(`[id="${takingSectionDead}"]`)
//     // console.log("shipsdead",shipsdead)
//     // shipsdead.classList.add('dead')
//     //takingSectionId = parseInt(e.target.id.substr(-1)) 
//   }))
// }    


function playGame() {
    if (isGameOver) return
    if (isPlayer1) {
        turnDisplay.innerHTML = 'Your Go'
        computerSquares.forEach(square => square.addEventListener('click', function (e) {
            revealSquare(square)
        }))
    }
    if (!isPlayer1) {
        turnDisplay.innerHTML = 'Computers Go'
        setTimeout(computerGo, 1000)
    }
}
startButton.addEventListener('click', playGame)

let destroyerCount = 0
let submarineCount = 0
let cruiserCount = 0
let battleshipCount = 0
let carrierCount = 0


function revealSquare(square) {
    if (!square.classList.contains('boom')) {
        if (square.classList.contains('destroyer')) destroyerCount++
        if (square.classList.contains('submarine')) submarineCount++
        if (square.classList.contains('cruiser')) cruiserCount++
        if (square.classList.contains('battleship')) battleshipCount++
        if (square.classList.contains('carrier')) carrierCount++
    }
    if (square.classList.contains('taken')) {
        square.classList.add('boom')
    } else {
        square.classList.add('miss')
    }
    checkForWins()
    isPlayer1 = false
    playGame()
}

let cpuDestroyerCount = 0
let cpuSubmarineCount = 0
let cpuCruiserCount = 0
let cpuBattleshipCount = 0
let cpuCarrierCount = 0


function computerGo() {
    let random = Math.floor(Math.random() * userSquares.length)
    if (!userSquares[random].classList.contains('boom')) {
        userSquares[random].classList.add('boom')
        if (userSquares[random].classList.contains('destroyer')) cpuDestroyerCount++
        if (userSquares[random].classList.contains('submarine')) cpuSubmarineCount++
        if (userSquares[random].classList.contains('cruiser')) cpuCruiserCount++
        if (userSquares[random].classList.contains('battleship')) cpuBattleshipCount++
        if (userSquares[random].classList.contains('carrier')) cpuCarrierCount++
        checkForWins()
    } else computerGo()
    isPlayer1 = true
    turnDisplay.innerHTML = 'Your Go'
}

function checkForWins() {
    if (destroyerCount === 2) {
        infoDisplay.innerHTML = 'You sunk the computers destroyer'
        destroyerCount = 10
    }
    if (submarineCount === 3) {
        infoDisplay.innerHTML = 'You sunk the computers submarine'
        submarineCount = 10
    }
    if (cruiserCount === 3) {
        infoDisplay.innerHTML = 'You sunk the computers cruiser'
        cruiserCount = 10
    }
    if (battleshipCount === 4) {
        infoDisplay.innerHTML = 'You sunk the computers battleship'
        battleshipCount = 10
    }
    if (carrierCount === 5) {
        infoDisplay.innerHTML = 'You sunk the computers carrier'
        carrierCount = 10
    }
    if (cpuDestroyerCount === 2) {
        infoDisplay.innerHTML = 'You sunk the computers Destroyer'
        destroyerCount = 10
    }
    if (cpuSubmarineCount === 3) {
        infoDisplay.innerHTML = 'You sunk the computers Submarine'
        cpuSubmarineCount = 10
    }
    if (cpuCruiserCount === 3) {
        infoDisplay.innerHTML = 'You sunk the computers Cruiser'
        cpuCruiserCount = 10
    }
    if (cpuBattleshipCount === 4) {
        infoDisplay.innerHTML = 'You sunk the computers Battleship'
        cpuBattleshipCount = 10
    }
    if (cpuCarrierCount === 5) {
        infoDisplay.innerHTML = 'You sunk the computers Carrier'
        cpuCarrierCount = 10
    }
    if ((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50) {
        infoDisplay.innerHTML = "YOU WIN"
        gameOver()
    }
    if ((cpuDestroyerCount + cpuSubmarineCount + cpuCruiserCount + cpuBattleshipCount + cpuCarrierCount) === 50) {
        infoDisplay.innerHTML = "COMPUTER WINS"
        gameOver()
    }
}

function gameOver() {
    isGameOver = true
    startButton.removeEventListener('click', playGame)
}