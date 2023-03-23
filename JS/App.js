let monsters = [
    'monster1',
    'monster2',
    'monster3',
    'monster4',
    'monster5',
    'monster6',
    'monster7',
    'monster8',
    'monster9',
    'monster10',
    'monster11',
    'sock'
];
let monsterCount= 0; //for mantaining how many monsters are found.
let gameFinished = false; //It will toggle to true if sock is found
let shuffled //shuffled monster and sock array list.
// shuffling monster array
function shuffleMethods(monsters){
    shuffled = monsters
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    console.log(shuffled);
}
// called shuffle methods
shuffleMethods(monsters);
// Dom elements accessed
let doors = document.querySelectorAll('.grid');
const resultPopup = document.querySelector('.result-popup');
    const overlay = document.querySelector('.overlay');
    const result = document.querySelector('.result');


doors.forEach((door,index) => {
    door.addEventListener('click',function(){
        if (gameFinished) {
            return;
        }
        this.querySelector('img').setAttribute('src',`./images/${shuffled[index]}.svg`);
        if(this.querySelector('img').getAttribute('src').search('/sock.svg') > 0){
            endGame("You found the sock! You lose!")
        }else{
            monsterCount++;
            console.log(monsterCount)
            if(monsterCount == 11){
                endGame("Congratulations !!! You found all the monsters! You win!")
            }
        }
    })
});
//End game method for opening popup and displaying the result message.
function endGame(message){
    gameFinished = true;
    resultPopup.classList.add('open');
    overlay.classList.add('open');
    result.textContent = message;
    result.style.display = 'block';
}
// restart game method and resetting game state.
document.querySelectorAll('.start').forEach((start)=>{
    start.addEventListener('click', function(){
        doors.forEach((door) => {
            door.querySelectorAll('img')[0].setAttribute('src','./images/door.svg');
        });
        gameFinished = false;
        monsterCount = 0;
        resultPopup.classList.remove('open');
        overlay.classList.remove('open');
        result.style.display = 'none';
        shuffleMethods(monsters);
        //location.reload();
    })
})