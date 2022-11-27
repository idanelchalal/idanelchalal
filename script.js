// START OF SCRIPT

const options = document.querySelectorAll(".option");
let markPositionX = false;
let annonymusFuncSaver;
let indexCount = 0;
let foundWinner = false;

const markedPlaces = 
                    [
                        -1, -1, -1,
                        -1, -1, -1,
                        -1, -1, -1
                    ];

options.forEach(option => {
        const attrCreation = document.createAttribute("title");
        attrCreation.value = indexCount;
        option.setAttributeNode(attrCreation);
        option.addEventListener("click", 
        (
            annonymusFuncSaver = () => {
            markPosition(option)
        }), {once:true}
    );
    indexCount++;
});

function changeStatus()
{
    markPositionX = !markPositionX;
}

function createX(object)
{
    const div = document.createElement("div");
    div.innerHTML = '<img src="/images/x.png" width="40" height="40" />'
    object.appendChild(div);
}

function createO(object)
{
    const div = document.createElement("div");
    div.innerHTML = '<img src="/images/o.png" width="40" height="40" />'
    object.appendChild(div);
}

function markPosition(object)
{
    const index = object.getAttribute("title");
    if (markPositionX)
    {
        markedPlaces[index] = 1;
        createX(object);
        changeStatus();
        defineGameStatus();
        return;
    }
    markedPlaces[index] = 0;
    createO(object);
    changeStatus();
    defineGameStatus();
}

function defineGameStatus()
{
    checkRows();
    checkColumns();
    checkMainDiagonal();
    checkSubDiagonal();
    const allChanged = markedPlaces.every(cell => cell != -1)
    if (!foundWinner && allChanged)
    {
        const footer = document.querySelector("#footer");
        footer.textContent = "IT'S A TIE!";
    }
}

function checkRows()
{
    let winCheck = [];
    for (let i = 0; i < markedPlaces.length; i++)
    {
        // Reset or Win
        if (i % 3 === 0 || i === 8)
        {
            if (i === 8) winCheck.push(markedPlaces[i]);
            const isWin = winCheck.every(cell => winCheck[0] === cell);
            if (isWin && winCheck[0] != -1 && winCheck.length === 3)
            {
                const footer = document.querySelector("#footer");
                footer.textContent = "WINNER IS " + getWinner(winCheck[0]);
                break;
            }
            winCheck = [];
        }
        winCheck.push(markedPlaces[i]);
    }
}

function checkColumns()
{
    let winCheck = [];
    for (let i = 0; i < 3; i++)
    {
        winCheck.push(markedPlaces[i]);
        winCheck.push(markedPlaces[i+3]);
        winCheck.push(markedPlaces[i+6]);
        const isWin = winCheck.every(cell => winCheck[0] === cell);
        if (isWin && winCheck[0] != -1 && winCheck.length === 3)
        {
            const footer = document.querySelector("#footer");
            footer.textContent = "WINNER IS " + getWinner(winCheck[0]);     
            break;
        }
        winCheck = [];
    }
}

function checkMainDiagonal()
{
    let winCheck = [];
    winCheck.push(markedPlaces[0], markedPlaces[4], markedPlaces[8]);
    const isWin = winCheck.every(e => e === winCheck[0]);
    if (isWin && winCheck[0] != -1 && winCheck.length === 3){
            const footer = document.querySelector("#footer");
            footer.textContent = "WINNER IS " + getWinner(winCheck[0]);
    }
}

function checkSubDiagonal()
{
    let winCheck = [];
    winCheck.push(markedPlaces[2], markedPlaces[4], markedPlaces[6]);
    const isWin = winCheck.every(e => e === winCheck[0]);
    if (isWin && winCheck[0] != -1 && winCheck.length === 3){
            const footer = document.querySelector("#footer");
            footer.textContent = "WINNER IS " + getWinner(winCheck[0]);
    }
}

function getWinner(winner)
{
    foundWinner = true;
    return winner === 0 ? "O" : "X";
}