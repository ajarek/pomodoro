let progressBar = document.querySelector('.circular-progress');
let valueContainer = document.querySelector('.value-container');
const btnStart = document.querySelectorAll('nav button')
const btnSetting = document.querySelector('footer button')
const btnClose = document.querySelector('.bodySetting button')
const text = document.querySelector('.text')
const form = document.querySelector('form')
const btnColor = document.querySelectorAll('.color')
const btnFont = document.querySelectorAll('.font')
const pom = document.querySelector('#pom')
const short = document.querySelector('#short')
const long = document.querySelector('#long')
let howManyMinutes = []
let setMinutes = [25, 5, 10]
let progress
let progressValue = 0;
let speed = 1000
let color = '#ff6669'

btnStart.forEach(btn => {
    btn.addEventListener('click', change)
})

function change(e) {

    if (e.target.innerText === "pomodoro") {
        e.target.classList.add('active')
        short.classList.remove('active')
        long.classList.remove('active')
        clearInterval(progress);
        progressValue = 0;
        howManyMinutes.push(setMinutes[0]);
        pomodoro()
    }
    if (e.target.innerText === "short break") {
        e.target.classList.add('active')
        pom.classList.remove('active')
        long.classList.remove('active')
        clearInterval(progress);
        progressValue = 0;
        howManyMinutes.push(setMinutes[1]);
        pomodoro()
    }
    if (e.target.innerText === "long break") {
        e.target.classList.add('active')
        short.classList.remove('active')
        pom.classList.remove('active')
        clearInterval(progress);
        progressValue = 0;
        howManyMinutes.push(setMinutes[2]);
        pomodoro()
    }
}

function pomodoro() {
    progresEndValue = 60 * howManyMinutes[howManyMinutes.length - 1]
    progress = setInterval(() => {
        timer()
    }, speed)
}
btnColor.forEach(btn => {
    btn.addEventListener('click', changeColor)
})

function changeColor(e) {
    document.documentElement.style.setProperty('--progress', e.target.dataset.color)
    color = getComputedStyle(document.body).getPropertyValue('--progress')
    e.target.innerText = "✓"
}
btnFont.forEach(btn => {
    btn.addEventListener('click', changeFont)
})

function changeFont(e) {
    const size = document.querySelector('html')
    size.style.fontSize = e.target.dataset.font + 'px'
}

function timer() {
    progressValue++;
    progressBar.style.background = `conic-gradient(${color}
         ${progressValue*360/progresEndValue}deg, #0a1125 ${progressValue*360/progresEndValue}deg)`;
    let min = Math.floor(progressValue / 60)
    let sec = progressValue % 60
    if (sec < 10) {
        sec = '0' + sec
    }
    if (min < 10) {
        min = '0' + min
    }
    valueContainer.innerHTML = `${min}:${sec}`
    if (progressValue >= progresEndValue) {
        clearInterval(progress);
        progressValue = 0;
        howManyMinutes = []
    }
}

text.addEventListener('click', myStop)

function myStop() {
    if (text.innerHTML === "PAUSE") {
        clearInterval(progress);
        text.innerHTML = "START"
    } else
    if (text.innerHTML === "START") {
        pomodoro()
        text.innerHTML = "PAUSE"
    }
}
btnSetting.addEventListener('click', setting)

function setting() {
    let setting = document.querySelector('.setting')
    setting.classList.add('hide')
}

btnClose.addEventListener('click', close)

function close() {
    let setting = document.querySelector('.setting')
    setting.classList.remove('hide')
}


form.addEventListener('submit', settingForm)

function settingForm(e) {
    setMinutes = []
    e.preventDefault()
    setMinutes.push(e.target[0].value);
    setMinutes.push(e.target[1].value);
    setMinutes.push(e.target[2].value);
    close()
}