'use strict'
var gNums
var gIsTimerOn
var msec
var sec
var min
var gNextNum
var intervalIDofTimer

function init(num) {
    gNums = createNums(num);
    reset()
    renderBoard(gNums)
    initTimer()
}

function reset() {
    gIsTimerOn = false;
    msec = 0
    sec = 0
    min = 0
    gNextNum = 1
}

function createNums(len) {
    var nums = [];
    for (let i = 0; i < len; i++) {
        nums.push(i + 1)
    }
    return nums
}

function renderBoard() {
    var strHTML = ''
    var len = Math.sqrt(gNums.length)
    var numsCopy = [...gNums]
    numsCopy = shuffle(numsCopy)

    for (let i = 0; i < len; i++) {
        strHTML += '<tr>';
        for (let j = 0; j < len; j++) {
            var cell = numsCopy.pop()
            // var className = 'btn'
            strHTML += `
            <td><button
            data-i="${i}" 
            data-j="${j}" 
            onmousedown="cellClicked(this , ${cell})" 
            class="btn">
            ${cell}
            </button>
            </td>
            `
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML

    var elTimer = document.querySelector('.timer')
    elTimer.innerText = `0:0:00`

    updateNextNum()
}
function cellClicked(elNum, currNum) {

    // console.log(elNum)
    if (gNextNum === currNum) {
        elNum.classList.add('clicked')
        gNextNum++
        // gNums.shift();
        updateNextNum()
        // console.log(gNums)
        if (!gIsTimerOn) startTimer()
        checkFinish()
    } else {
        var count = 0;
        var wrong = setInterval(function () {
            elNum.classList.toggle("wrong")
            count++
            if (count === 2) {
                clearInterval(wrong)
            }
        }, 200)
    }

}

function startTimer() {
    gIsTimerOn = true

    var elTimer = document.querySelector('.timer')
    intervalIDofTimer = setInterval(function () {
        msec++;
        if (msec === 100) {
            sec++
            msec = 0
        }
        if (sec === 60) {
            min++
            sec = 0
        }
        elTimer.innerText = `${min}:${sec}:${msec}`
        if (gNextNum - 1 === gNums.length) {
            clearInterval(intervalIDofTimer)
        }
    }, 10);
}


function updateNextNum() {
    var elNextNum = document.querySelector('.nextNum')
    if (gNextNum - 1 === gNums.length) {
        elNextNum.innerText = '--'
        clearInterval(intervalIDofTimer)
    } else {
        elNextNum.innerText = gNextNum
    }
}

