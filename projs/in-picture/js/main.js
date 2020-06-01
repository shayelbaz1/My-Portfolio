var gQuests
var gCurrQuestIdx
var gQuestsLength
/* 
//TODO
- Wrong Ans Red Color
-  Right Green Color
- Crowd playSound() When Well Done
- Dog
- Elephant
*/
function initGame() {
    gQuests = createQuests()
    gCurrQuestIdx = 0
    gQuestsLength = gQuests.length
    renderQuest()
}

function createQuests() {
    var quests = [
        {
            id: 0,
            quest: 'What is the animal?',
            opts: ['Puppy', 'Cat'],
            correctOptIndex: 0
        },
        {
            id: 1,
            quest: 'What is the cat color?',
            opts: ['Orange', 'White'],
            correctOptIndex: 1
        },
        {
            id: 2,
            quest: 'How many legs?',
            opts: ['4', '3'],
            correctOptIndex: 0
        },
    ]
    return quests
}

function renderQuest() {
    var strHTML = '';
    var currQuest = gQuests[gCurrQuestIdx]
    var elScaffold = document.querySelector('.scaffold')

    if (gCurrQuestIdx === gQuestsLength) {
        strHTML += `
        <img class="imgDiv crop" src="img/well-done1.png" alt="">
        <button class="btn btnNewGame btn-primary btn-lg btn-block" onclick="initGame()">New Game</button>
        `
    } else {
        strHTML += `
        <div class="imgDiv crop">
            <img src="img/${gCurrQuestIdx}.png" alt="">
        </div>
        <h2 class="row quest">
        ${currQuest.quest}
        </h2>
        <div class="row">
        <button class="btn btn1 btn-primary btn-lg btn-block" onclick="checkAnswer(0)">${ currQuest.opts[0]}</button>
    <button class="btn btn2 btn-primary btn-lg btn-block" onclick="checkAnswer(1)">${ currQuest.opts[1]}</button>
    </div>`
    }

    elScaffold.innerHTML = strHTML

}

function checkAnswer(optIdx) {
    var currQuest = gQuests[gCurrQuestIdx]
    if (optIdx === currQuest.correctOptIndex) {
        gCurrQuestIdx++;
        renderQuest()
    }
}