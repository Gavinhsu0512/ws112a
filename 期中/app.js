const HOURHAND = document.querySelector("#Hour");
const MINUTEHAND = document.querySelector("#mlnute");
const SECONDHAND = document.querySelector("#second");
const GETREALTIME = document.querySelector("#dateAndTime");
const DATEDOTAY = document.getElementById("date");
var HOURHAND2 = document.querySelector("#Hours");
var MINUTEHAND2 = document.querySelector("#Minutes");
var SECONDHAND2 = document.querySelector("#Seconds");
var date = new Date();
console.log(date);
let hr = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
console.log("Hour:" + hr + "Minute:" + min + "Second:" + sec);

let hrPosltion = (hr*360/12)+(min*(360*60)/12);
let minPosltion = (min*360/60)+(sec*(360*60)/60);
let secPosltion = sec*360/60;

function runTheclock(){
    var date = new Date();
    console.log(date);
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let currentHour = function(){
        let realHour = 0;
        let realHourInPM = 0;
        if(hr >= 13){
            realHour = hr - 12;
            realHourInPM = $(realHour);
        }
        else{
            realHour = hr;
            realHourInPM = $(realHour);
        }

        return realHourInPM;
    }
    hrPosltion = hrPosltion+(3/360);
    minPosltion = minPosltion+(6/360);
    secPosltion = secPosltion+6;

    HOURHAND.style.transform = "rotate("+ hrPosltion +"deg)"
    MINUTEHAND.style.transform = "rotate("+ minPosltion +"deg)"
    SECONDHAND.style.transform = "rotate("+ secPosltion +"deg)"
    HOURHAND2.innerHTML = currentHour();
    MINUTEHAND2.innerHTML = min;
    SECONDHAND2.innerHTML = sec;
}

var interval = setInterval(runTheclock, 1000);