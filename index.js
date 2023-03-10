const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;

const winningPositions = [  [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]  ];
let grid;

//game Initialization

function start(){
    currentPlayer = "X";
    grid = ["","","","","","","","",""];
    boxes.forEach((box, index)=>{
        box.innerText = "";
        box.classList.remove('ptr');
        box.classList.remove('win');
    })
    newGameBtn.classList.add('newgame');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
start();

function swapPlayer(){
    if(currentPlayer=="X") currentPlayer = "O";
    else currentPlayer = "X";
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}


function checkGameOver(){
   let ans = "";
    winningPositions.forEach((position)=>{
        if(grid[position[0]]!=="" && grid[position[1]]!=="" && grid[position[2]]!=="" && 
           grid[position[0]]==grid[position[1]] && grid[position[1]]==grid[position[2]]){
        
            if(grid[position[0]] === "X") ans = "X";
            else ans = "O";
            boxes.forEach((box, index)=>{
                box.classList.add('ptr');
            })
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    })

    if(ans!==""){
        newGameBtn.classList.remove('newgame');
        gameInfo.innerText = `Winner Player - ${ans}`;
        return;
    }

    //for tie
    let count = 0;
    grid.forEach((box)=>{
        if(box !== "") count++;
    });

    if(count === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.remove("newgame");
    }

}


boxes.forEach((box,index)=>{
    box.addEventListener('click', ()=>{
      box.innerHTML = currentPlayer;
      grid[index] = currentPlayer;
      box.classList.add('ptr');
      swapPlayer();
      checkGameOver();
    })
})

newGameBtn.addEventListener('click', start);