const numOfNodes = 25;
const nodeHolder = document.getElementById('node-holder');
let expireMs = localStorage.getItem('expMs');
let board = JSON.parse(localStorage.getItem("boardOrder"));

const sayings = [
    "Gio says 'Right'",
    "Gio mentions killing himself",
    "Gio says 'what would you do'",
    "Gio sucks dick",
    "Gio says 'Period'",
    "Gio wears a sweater",
    "Gio complains about his discrete professor",
    "Gio tells you to burn in hell",
    "Gio starts singing",
    "Gio references a musical (drama shit)",

    "Jaysen acts gay",
    "Jaysen says 'I swear!'",
    "Jaysen asks if it is allowed",
    "Jaysen says he loves something",
    "Jaysen recognizes the most obscure reference",
    "Jaysen spits the most random fact ever",
    "Jaysen shows up late to pickleball",
    "Jaysen says a random sports fact",

    "Jack mentions a programming term",
    "Jack finishes a meal (impossible)",
    "Jack codes for 24 hours straight and doesn't consume a thing",
    "Jack starts his day off with a lobster bisque from Nathan's",
    "Jack gets pestered for coding help",
    
    "DJ sends the most vile shit known to man",
    
    "Amy laughs like a lawn mower",
    "Amy pulls up in her moped",
    "Amy dyes her hair a new color",
    "Amy sticks her tongue out (scaring Jack and Owen)",
    "Amy sleeps through Chem",
    "Amy reads porn (in public)",
    "Amy turns into a human cannon and attacks owen with applesauce",

    "Max goes to commons for dinner",
    "Max goes AWOL for a whole day",
    "Max play Mario Kart for > 5 hours",
    
    "Owen eats shit on skateboard",
    "Owen purchases the most useless tech product known to man",
    "Owen wears goldfish hat",

    "Mary Ann farts all over the place",
    "Mary Ann complains about her fart classes",
    "Mary Ann overdresses for the occasion",
    "Mary's phone is at 1%",
    "Mary Ann takes obscene amount of photos",
    "Mary is cold",
    "Mary Ann admits to a felony",

    "Clark studies in Owen's room",
    "Clark's phone gets shattered",
    
    "Sam disappears for weeks at a time",
    "Sam asks us to meet on the Greek lawn at 5am",
    
    "Yoav says 'WHAAAAT'",
    "Yoav claps his hands like a seal",
    "Yoav buys another flash drive",
    "Yoav plays AMQ",
    "Yoav throws up",
    
    "Dante eats something vegan",
    "Dante stiffly nods",
    "Dante complains about Sol",
    
    "Kiera plays that rhythm game",
    "Kiera wears green",
    "Kiera sarcastically laughs loudly in public",
    "Kiera does the 'um actually!' voice",
    "Kiera gets Starbucks",
    "Kiera says 'excuse me'",

    "Mikey gets high as a whistle",
    "Mikey doesn't remember the weekend",

    "Evan corrects your correct statement",
    "Parker spawns",
    "Parker rips your throat out",

    "ShitBot reacts to your innocent message",
    "HeySam corrects your grammar",
]


function createBoard() {
    for (let i = 0; i < numOfNodes; i++) {
        const node = document.createElement('div');
        const nodeTxt = document.createElement('p');

        node.classList.add('node');
        nodeTxt.classList.add('txt');
        node.id = 'node-' + i;
        nodeTxt.id = 'node-' + i + '-txt';
        node.addEventListener('click', () => {
            if (node.classList.contains('checked')) {
                node.classList.add('unchecked');
                node.classList.remove('checked');
                nodeTxt.classList.add('txtUnchecked');
                nodeTxt.classList.remove('txtChecked');
                board[i]['checked'] = 'unchecked';
                board[i]['txtChecked'] = 'txtUnchecked';
            }
            else if (node.classList.contains('unchecked')) {
                node.classList.add('checked');
                node.classList.remove('unchecked');
                nodeTxt.classList.add('txtChecked');
                nodeTxt.classList.remove('txtUnchecked');
                board[i]['checked'] = 'checked';
                board[i]['txtChecked'] = 'txtChecked';
            }
            localStorage.setItem('boardOrder', JSON.stringify(board));
        });

        node.appendChild(nodeTxt);
        nodeHolder.appendChild(node);
    }
    generateNodes();
}

function checkDate() {
    let d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);

    // guard clause :)
    if (expireMs == null) {
        expireMs = d.getTime();
        localStorage.setItem('expMs', expireMs);
        return true;
    }

    const expirationTime = parseInt(expireMs);
    if (expirationTime <= Date.now()) {
        expireMs = d.getTime();
        localStorage.setItem('expMs', expireMs);
        return true;
    }

    return false;
}

function generateNodes() {
    if (checkDate()) {
        randomizeNodes();
    }
    else {
        getNodesFromLocal();
    }
}

function getNodesFromLocal() {
    for (let i = 0; i < board.length; i++) {
        const node = document.getElementById('node-' + i);
        const nodeTxt = document.getElementById('node-' + i + '-txt');
        nodeTxt.innerText = sayings[board[i]['index']];
        node.classList.add(board[i]['checked']);
        nodeTxt.classList.add(board[i]['txtChecked']);
    }
}

function randomizeNodes() {
    let currentSayings = [];
    let nodes = [];
    for (let i = 0; i < numOfNodes; i++) {
        const node = document.getElementById('node-' + i);
        node.classList.remove('checked');
        node.classList.add('unchecked');
        
        const nodeTxt = document.getElementById('node-' + i + '-txt');
        nodeTxt.classList.remove('txtChecked');
        nodeTxt.classList.add('txtUnchecked');

        let random = Math.floor(Math.random() * sayings.length);
        while (currentSayings.includes(random)) {
            random = Math.floor(Math.random() * sayings.length);
        }
        
        nodeTxt.innerText = sayings[random];
        currentSayings.push(random);

        nodes.push({
            index: random,
            checked: 'unchecked',
            txtChecked: 'txtUnchecked'
        });    
    }

    board = nodes;
    localStorage.setItem('boardOrder', JSON.stringify(nodes));
}

const runTimer = () => {
    const current = new Date();

    const hours = (23 - current.getHours()).toString().padStart(2, '0');
    const minutes = (59 - current.getMinutes()).toString().padStart(2, '0');
    const seconds = (59 - current.getSeconds()).toString().padStart(2, '0');

    const timeDiv = document.getElementById('time');
    timeDiv.innerText = `${hours}:${minutes}:${seconds}`;

    if (expireMs <= Date.now()) {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
}

createBoard();
setInterval(runTimer, 1000);