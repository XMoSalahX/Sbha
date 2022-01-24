const lineTwo = document.getElementsByClassName("line1")[0]
const lineThree = document.getElementsByClassName("line2")[0]
const iconContainer = document.querySelector(".iconContainer")
const move = document.querySelector("ul")
const listCollection = document.getElementsByTagName("li")
const main = document = document.querySelector("main")
const btn = document.querySelector(".btn")
const digit = document.querySelector(".digit")
const UserCount = document.querySelector(".UserCount")
const reset = document.querySelector(".reset")

iconContainer.addEventListener("click", function() {
    lineTwo.classList.toggle("lineTwo")
    lineThree.classList.toggle("lineThree")
    move.classList.toggle("move")
    if (getComputedStyle(main).display == "grid") {
        main.style.display = "none"
    } else {
        main.style.display = "grid"
    }
})


listCollection[1].addEventListener("click", function() {
    window.location = "https://www.facebook.com/MohammedSalahEldinGTDMSM/"
})

var countOne = 0
var countTwo = 1

var count100 = 0
var data = {}

if (window.localStorage.getItem("Counters")) {
    countOne = JSON.parse(window.localStorage.getItem("Counters")).countOne
    countTwo = JSON.parse(window.localStorage.getItem("Counters")).countTwo
    count100 = JSON.parse(window.localStorage.getItem("Counters")).count100
    UserCount.innerHTML = `${count100}`
    if (countTwo === 1) {
        digit.style.fontSize = "20px"
        digit.innerHTML = "سبحان الله"
    } else if (countTwo === 2) {
        digit.innerHTML = "الحمد لله"
    } else if (countTwo === 3) {
        digit.innerHTML = "الله اكبر"
    } else {
        digit.style.fontSize = "14px"
        digit.innerHTML = "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ "
    }
}

btn.addEventListener("click", function() {
    navigator.vibrate(100)
    countOne++
    count100++
    UserCount.innerHTML = `${count100}`
    if (count100 >= 100) {
        count100 = 0
    }
    if (countOne > 33) {
        countTwo++
        if (countTwo > 3) {
            countOne = 0
        } else {
            countOne = 1
        }

    }
    if (countTwo === 1) {
        digit.style.fontSize = "20px"
        digit.innerHTML = "سبحان الله"
    } else if (countTwo === 2) {
        digit.innerHTML = "الحمد لله"
    } else if (countTwo === 3) {
        digit.innerHTML = "الله اكبر"
    } else {
        countTwo = 1
        digit.style.fontSize = "14px"
        digit.innerHTML = "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ "
    }
    data.countOne = countOne
    data.countTwo = countTwo
    data.count100 = count100
    window.localStorage.setItem("Counters", JSON.stringify(data))
})

reset.addEventListener("click", function() {
    navigator.vibrate([500, 100, 500, 100, 500, 100, 500])
    window.localStorage.removeItem("Counters")
    UserCount.innerHTML = "0"
    digit.innerHTML = "المسبحة الالكترونية"
    countOne = 0
    countTwo = 1
    count100 = 0
})


var networkDataReceived = false;








if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('../../Sbha/sw.js')
        .then(function() {
            console.log('Service Worker Registered');
        })
}