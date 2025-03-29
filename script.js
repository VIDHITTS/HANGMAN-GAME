let wb=document.querySelector(".w")
let tr=document.querySelector(".tries span")
let btns=document.querySelector(".b")
let man=document.querySelectorAll(".m")
let pop=document.querySelector(".pop")
let again=document.querySelector(".again")
let h=document.querySelector(".hint span")
let words=[
    {word:"guitar",hint:"music strings"},
    {word:"oxygen",hint:"cant see but need it"},
    {word:"mountain",hint:"big hill"},
    {word:"computer",hint:"electronic brain"},
    {word:"butterfly",hint:"pretty insect"},
    {word:"elephant",hint:"Giant with a trunk"},
{word:"kangaroo",hint:"Hops with a pouch"},
{word:"dolphin",hint:"Smart ocean swimmer"},
{word:"chameleon",hint:"Changes colors"},
{word:"scorpion",hint:"Venomous tail"},
{word:"keyboard",hint:"Input device with keys"},
{word:"monitor",hint:"Displays your work"},
{word:"router",hint:"Connects to internet"},
{word:"smartphone",hint:"Pocket computer"},
{word:"headphones",hint:"Wearable sound"},
{word:"avocado",hint:"Green fatty fruit"},
{word:"spaghetti",hint:"Long thin pasta"},
{word:"chocolate",hint:"Sweet brown treat"},
{word:"pineapple",hint:"Spiky tropical fruit"},
{word:"sandwich",hint:"Bread with filling"},
{word:"waterfall",hint:"Falling river"},
{word:"volcano",hint:"Erupts lava"},
{word:"hurricane",hint:"Powerful storm"},
{word:"rainbow",hint:"Colorful sky arc"},
{word:"cactus",hint:"Prickly desert plant"}
]
let currword=""
let lettergurssed=[]
let wronggguesses=6
let hidword=[]
function startGame(){
    wronggguesses=6
    lettergurssed=[]
    hidword=[]
    man.forEach(part=>part.classList.add("hide"))
    tr.innerText=`0/6`
    pop.classList.remove("show")
    let rword=words[Math.floor(Math.random()*words.length)]
    currword=rword.word.toUpperCase()
    h.innerText=rword.hint
    hidword=Array(currword.length).fill("_")
    wb.innerHTML=hidword.map(()=>
        `<div class="c">_</div>`).join("")
    makeButtons()
}
function makeButtons(){
    btns.innerHTML=""
    for(let i=65;i<=90;i++){
        let letter=String.fromCharCode(i)
        let btn=document.createElement("button")
        btn.innerText=letter
        btn.classList.add("btn")
        btn.onclick=()=>guessLetter(btn,letter)
        btns.appendChild(btn)
    }
}
function guessLetter(btn,letter){
    btn.disabled=true
    if(lettergurssed.includes(letter)) return
    lettergurssed.push(letter)
    if(currword.includes(letter)){
        currword.split("").forEach((char,i)=>{
            if(char===letter){
                hidword[i]=letter
                wb.children[i].innerText=letter
            }
        })
        btn.classList.add("r")
        if(hidword.join("")===currword){
            gameOver(true)
            return
        }
    }else{
        wronggguesses--
        man[6-wronggguesses-1].classList.remove("hide")
        btn.classList.add("w")
        tr.innerText=`${6-wronggguesses}/6`
        if(wronggguesses===0){
            gameOver(false)
            return
        }
    }
}
function gameOver(won){
    const msg=document.querySelector(".stuff h2")
    const img=document.querySelector(".stuff img")
    const txt=document.querySelector(".stuff p")
    if(won){
        msg.innerText="You Won!"
        img.src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
        txt.innerHTML=`Found word: <span>${currword}</span>`
    }else{
        msg.innerText="Game Over!"
        img.src="https://cdn-icons-png.flaticon.com/512/6582/6582231.png"
        txt.innerHTML=`Word was: <span>${currword}</span>`
    }
    pop.classList.add("show")
    document.querySelectorAll('.btn').forEach(btn=>btn.disabled=true)
}
again.addEventListener("click",startGame)
window.addEventListener("load",startGame)