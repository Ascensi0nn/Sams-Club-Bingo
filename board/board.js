const numOfNodes = 25;
const nodeHolder = document.getElementById('node-holder');

const sayings = [
    "Gio says 'Right'",
    "Gio mentions killing himself",
    "Gio says 'what would you do'",
    "Gio sucks dick",
    "Gio says 'Period'",
    "Gio wears a sweater",
    "Gio complains about his discrete professor",
    "Gio tells you to burn in hell",

    "Jaysen acts gay",
    "Jaysen says 'I swear!'",
    "Jaysen asks if it is allowed",
    "Jaysen says he loves something",
    "Jaysen recognizes the most obscure reference",
    "Jaysen spits the most random fact ever",
    "Jaysen shows up late to pickleball",

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

    "Clark studies in Owen's room",
    
    "Sam disappears for weeks at a time",
    "Sam asks us to meet on the Greek lawn at 5am",
    
    "Yoav says 'WHAAAAT'",
    "Yoav claps his hands like a seal",
    "Yoav buys another flash drive",
    "Yoav plays AMQ",
    "Yoav throws up",
    
    "Dante eats something vegan",
    "Dante stiffly nods",
    
    "Kiera plays that rhythm game",
    "Kiera wears green",
    "Kiera sarcastically laughs loudly in public",
    "Kiera does the 'um actually!' voice",
    "Kiera gets Starbucks",

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
        node.classList.add('unchecked');
        nodeTxt.classList.add('txt');
        nodeTxt.classList.add('txtUnchecked');
        node.id = 'node-' + i;
        nodeTxt.id = 'node-' + i + '-txt';
        node.addEventListener('click', () => {
            if (node.classList.contains('checked')) {
                node.classList.add('unchecked');
                node.classList.remove('checked');
                nodeTxt.classList.add('txtUnchecked');
                nodeTxt.classList.remove('txtChecked');
            }
            else if (node.classList.contains('unchecked')) {
                node.classList.add('checked');
                node.classList.remove('unchecked');
                nodeTxt.classList.add('txtChecked');
                nodeTxt.classList.remove('txtUnchecked');
            }
        });

        node.appendChild(nodeTxt);
        nodeHolder.appendChild(node);
    }
    randomizeNodes();
}

function randomizeNodes() {
    let currentSayings = [];
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
    }
}

document.getElementById('randomizer').addEventListener('click', () => {
    randomizeNodes();
});


let timeout = null;
const shuffle = document.getElementById('randomizer');
shuffle.addEventListener('mouseover', function(e) {
    if(timeout !== null) return;
    e.target.classList.add('box-rotate');
    timeout = setTimeout(function() {
        e.target.classList.remove('box-rotate');
        timeout = null;
    }, 1000);
});


createBoard();