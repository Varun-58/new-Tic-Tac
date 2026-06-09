const buttons = document.querySelectorAll(".G-btn")
const nBtn = document.querySelector(".newGame")
const pBtn = document.querySelector(".playGame")
const oSound = new Audio("./oSound000.wav")
const xSound = new Audio("./xSound00.wav")
const winSound = new Audio("./win.mp3")
const drawSound = new Audio("./draw.mp3")
const clickSound = new Audio("./clickSound.wav")
const oWin = document.querySelector(".oWin")
const xWin = document.querySelector(".xWin")
const oLoss = document.querySelector(".oLoss")
const xLoss = document.querySelector(".xLoss")

let Ctext = document.querySelector(".G-con-text")
let wLine = document.querySelector(".G-wl")
let oWinner = 0;
let oLosser = 0;
let xWinner = 0;
let xLosser = 0;
let turn0 = true;
let Win = false;

const winingPatterns = [
  [0, 1, 2, 3, 0, 35, 0],
  [4, 5, 6, 7, 0, 105, 0],
  [8, 9, 10, 11, 0, 175, 0],
  [12, 13, 14, 15, 0, 245, 0],
  [0, 4, 8, 12, 35, 0, 90],
  [1, 5, 9, 13, 105, 0, 90],
  [2, 6, 10, 14, 175, 0, 90],
  [3, 7, 11, 15, 245, 0, 90],
  [0, 5, 10, 15, 40, 40, 45],
  [3, 6, 9, 12, 238, 39, 135],
]

buttons.forEach((btn)=>{
  btn.addEventListener("click", ()=>{
    if(turn0){
      btn.textContent = "O";
      btn.classList.add("orange");
      oSound.currentTime = 0;
      oSound.play();
      turn0 = false;
    } else {
      btn.textContent = "X";
      btn.classList.add("blue");
      xSound.currentTime = 0;
      xSound.play();
      turn0 = true;
    }
    btn.disabled = true;
    checkWin();
    checkDraw();

    btn.classList.remove("btnBounce")
    void btn.offsetWidth;
    btn.classList.add("btnBounce")
  })
})

function checkWin(){
  winingPatterns.forEach((pattern)=>{
    let pos01 = buttons[pattern[0]].textContent;
    let pos02 = buttons[pattern[1]].textContent;
    let pos03 = buttons[pattern[2]].textContent;
    let pos04 = buttons[pattern[3]].textContent;
    let pos05 = pattern[4];
    let pos06 = pattern[5];
    let pos07 = pattern[6];

    if(pos01 != "" && pos02 != "" && pos03 != "" && pos04 != ""){
      if(pos01 == pos02 && pos02 == pos03 && pos03 == pos04){
        Ctext.textContent = `${pos01} wins 🥳`
        Win = true;
        winSound.currentTime = 0;
        winSound.play();
        buttons.forEach(btn => btn.disabled = true)

        wLine.style.transform = `translate(${pos05}px, ${pos06}px) rotate(${pos07}deg)`
        wLine.style.width = `100%`

        if(pos01 == "X"){
          xWinner++;
          oLosser++;
          xWin.textContent = `${xWinner}`
          oLoss.textContent = `${oLosser}`
        }
        if(pos01 == "O"){
          oWinner++;
          xLosser++
          oWin.textContent = `${oWinner}`
          xLoss.textContent = `${xLosser}`
        }
      }
    }
  })
}

function checkDraw(){
  if(Win) return;

  let fillCount = 0;
  buttons.forEach((btn)=>{
    if(btn.textContent !== ""){
      fillCount++;
    }
  })

  if(fillCount == 16){
    Ctext.textContent = `Draw 😵‍💫`
    drawSound.currentTime = 0;
    drawSound.play();
  }
}

nBtn.addEventListener("click", ()=>{
  buttons.forEach((btn)=>{
    btn.textContent = "";
    btn.disabled = false;
    Ctext.textContent = "";
    wLine.style.width = "0px";
    btn.classList.remove("orange")
    btn.classList.remove("blue")
    turn0 = true;
    Win = false;

    xWin.textContent = `0`
    oLoss.textContent = `0`
    oWin.textContent = `0`
    xLoss.textContent = `0`

    xWinner = 0;
    xLosser = 0;
    oWinner = 0;
    oLosser = 0;
  })

  nBtn.classList.remove("ctrl1Bounce")
  void nBtn.offsetWidth;
  nBtn.classList.add("ctrl1Bounce")

  clickSound.currentTime = 0;
  clickSound.play();
})

pBtn.addEventListener("click", ()=>{
  buttons.forEach((btn)=>{
    btn.textContent = "";
    btn.disabled = false;
    Ctext.textContent = "";
    wLine.style.width = "0px";
    btn.classList.remove("orange")
    btn.classList.remove("blue")
  })

  pBtn.classList.remove("ctrl2Bounce")
  void pBtn.offsetWidth
  pBtn.classList.add("ctrl2Bounce")

  clickSound.currentTime = 0;
  clickSound.play();

  Win = false;
})
