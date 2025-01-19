//acess all element
let boxes= document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newgameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

//create a variable to track the turn of player
let turnO= true;                                           //playerO, playerX
let count=0;

//store our winning patterns 
let winPattern =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
]


//loop to execute the game
boxes.forEach((box) =>  {                                   //to add eventlistener for each box select the all boxes
    box.addEventListener ('click',()=>{                    //add the function on which the loop works but not consider the winning
        if(turnO){ //playerO
           box.innerText = "O";
           box.style.color = "red"; 
           turnO = false;
        } else{ //playerX
            box.innerText = "X";
            box.style.color = "blue";
            turnO= true;
        }
        box.disabled = true;
        count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
    });
});
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

//disable variale
const disableBoxes =() =>{
    for (let box of boxes){
        box.disabled =true;
    }
}

//enable varaiable
const enableBoxes=()=>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText= "";
    }
}

//showwinner variable
const showWinner =(winner) =>{
    msg.innerText=`Congratulations!, Winner is ${winner}`;
    msgContainer.classList.remove("hide"); //to hide fisrt
    disableBoxes();
}

//for check winner 
const checkWinner = () =>{                                  //the fuction that check the winning condition
    for (let pattern of winPattern) {
        let pos1Val=boxes[pattern[0]].innerText;            //check th position in array 3 positions
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {      //condition: every postion should not be empty
            if (pos1Val === pos2Val && pos2Val === pos3Val) {       //condition: if all of these position will match than it consider as a winner
                  showWinner(pos1Val);                  //winner will be the position value
                  return true;
            
                }
        }
    }
} 

//reset game
const resetGame=() =>{
    turnO= true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}
newgameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);