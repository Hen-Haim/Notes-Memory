let thisNotes = [];
if(localStorage.getItem("clicks") === undefined || localStorage.getItem("clicks") === null){
    localStorage.setItem("clicks",-1);
}
let noteMe = () => {
    if (document.querySelector("#notes-placed").value != "" &&
        document.querySelector(".date-me").value != "") {
        let NotesPlaced = document.querySelector("#notes-placed").value;
        let TimeMe = document.querySelector(".time-me").value;
        let DateMe = document.querySelector(".date-me").value;

        let CountDownDiv = document.createElement("div");
        let myNotes = document.createElement("div");
        let XButton = document.createElement("button");
        let PNotesPlaced = document.createElement("p");
        let PTimePlaced = document.createElement("p");
        let Pdistance = document.createElement("p");

        myNotes.setAttribute("class", "my-notes");
        Pdistance.setAttribute("class", "distance");
        XButton.setAttribute("class", "button-appearing");
        PTimePlaced.setAttribute("class", "PTimePlaced");
        PNotesPlaced.setAttribute("class", "PNotesPlaced");

        let myMainAside = document.querySelector(".myMainAside");
        myMainAside.appendChild(myNotes);
        myNotes.append(PNotesPlaced, CountDownDiv, PTimePlaced, Pdistance, XButton);

        PNotesPlaced.innerHTML = NotesPlaced;
        XButton.classList.add("fas", "fa-times");
        myMainAside.insertBefore(myNotes, myMainAside.childNodes[0]);

        //if time is not set//
        let change;
        if (TimeMe == null || TimeMe == 0 || TimeMe == undefined) {
            TimeMe = "00:00";
            change = "<strong>" + DateMe + "</strong>";
        } else {
            change = "<strong>" + DateMe + "</strong>" + "<br>" + TimeMe;
        }

        //setting time and date//
        let TimePlaced = DateMe + "T" + TimeMe;
        PTimePlaced.innerHTML = change;

        //making the countdown//
        if (TimePlaced == null || TimePlaced == 0) {

        } else {
            let setDate = new Date(TimePlaced);
            TimePlaced = setDate.toISOString().slice(0, 16);
            let countDownDate = setDate.getTime();
            let x = setInterval(() => {
                let now = new Date().getTime();
                let distance = countDownDate - now;
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                CountDownDiv.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

                //declare each notes to the specific time//
                if (distance < 0) {
                    clearInterval(x);
                    CountDownDiv.innerHTML = "OVER DUE";
                    CountDownDiv.setAttribute("class", "count-down-div-03");
                } else if (days < 7 && days >= 1) {
                    CountDownDiv.setAttribute("class", "count-down-div-02");
                } else if (days < 1) {
                    CountDownDiv.setAttribute("class", "count-down-div-03");
                } else {
                    CountDownDiv.setAttribute("class", "count-down-div-01");
                };

            }, 1000);
        };
        forLocalStorage();

        //event onclick x button//
        XButton.onclick = event => myClear(event.target.name);

        //transforming and changing the x button//        
        let btnTransform = (XButton2) => XButton2.classList.toggle("x-button");
        
        //transforming and changing the x button back//
        let btnTransformBack = (XButton2) => XButton2.classList.toggle("x-button");
        
        //event onmouseenter myNotes//        
        myNotes.onmouseenter = event => btnTransform(event.target.childNodes[4]);
        
        //event onmouseleave myNotes//
        myNotes.onmouseleave = event => btnTransformBack(event.target.childNodes[4]);

        //clearing the notes by a button//
        let myClear = theNumber => {
            for (let i = 0; i < thisNotes.length; i++) {
                if (thisNotes[i].NoteNumber == +theNumber) {
                    localStorage.removeItem(thisNotes[i].NoteNumber);
                    thisNotes.splice(i, 1);
                };
            };
            let mainDiv = document.querySelector(".myMainAside");
            mainDiv.removeChild(myNotes);
        };

    } else {
        alert("The date and text fields are required");
    }
        //clearing the inputs//
        document.querySelector("#notes-placed").value = null;
        document.querySelector(".date-me").value = null;
        document.querySelector(".time-me").value = null; 
};

//making array for local storage//
let forLocalStorage = () => {
    var clicks = +localStorage.getItem("clicks");
    clicks++;
    localStorage.setItem("clicks",clicks);
    document.querySelector(".my-notes").id = +clicks;
    let TimeMe = document.querySelector(".time-me").value;
    if (TimeMe == null || TimeMe == 0 || TimeMe == undefined) {
        TimeMe = "00:00";
    }
    let thisNote = {
        Text: document.querySelector("#notes-placed").value,
        Date: document.querySelector(".date-me").value,
        Time: TimeMe,
        NoteNumber: +document.querySelector(".my-notes").id
    }

    let XButton = document.querySelector(".fa-times");
    XButton.name = +thisNote.NoteNumber;
    thisNotes.unshift(thisNote);
    let thisNoteInJSON = JSON.stringify(thisNote);
    localStorage.setItem(thisNote.NoteNumber, thisNoteInJSON);
    window.setTimeout(transformTime, 000);
}

//transforming and changing the notes background//
let transformTime = () => {
    let myNotes = document.querySelector("div.my-notes");
    var c = +document.querySelector(".my-notes").id + 1;
    if ((c) % 4 == 0) {
        myNotes.setAttribute("class", "note-class-01");
    } else if ((c) % 4 == 3) {
        myNotes.setAttribute("class", "note-class-02");
    } else if ((c) % 4 == 2) {
        myNotes.setAttribute("class", "note-class-03");
    } else {
        myNotes.setAttribute("class", "note-class-04");
    }
}

let notMyTime = () => document.querySelector(".time-me").value = null;

let notMyDate = () => {
    document.querySelector(".date-me").value = null;
}

let notMyText = () => {
    document.querySelector("#notes-placed").value = null;
}

let notMyNote = () => {
    document.querySelector("#notes-placed").value = null;
    document.querySelector(".date-me").value = null;
    document.querySelector(".time-me").value = null;
}

//show the buttons//
window.setInterval(() => {
    let myBtnTiming = document.querySelector(".NoteMeBtn");
    let myicon01 = document.querySelector(".date-icon-div");
    let myicon02 = document.querySelector(".time-icon-div");
    let myicon03 = document.querySelector(".text-icon-div");
    let myicon04 = document.querySelector(".trash-icon");

    setTimeout(() => myBtnTiming.classList.toggle("NoteMeBtn2"), 1500);
    setTimeout(() =>{
        myBtnTiming.classList.toggle("NoteMeBtn2");
        myicon01.classList.toggle("date-icon-div2");
    }, 3000);
    setTimeout(() =>{
        myicon01.classList.toggle("date-icon-div2");
        myicon02.classList.toggle("time-icon-div2");
    }, 4500);
    setTimeout(() =>{
        myicon02.classList.toggle("time-icon-div2");
        myicon03.classList.toggle("text-icon-div2");
    }, 6000);
    setTimeout(() =>{
        myicon03.classList.toggle("text-icon-div2");
        myicon04.classList.toggle("trash-icon2");
    }, 7500);
    setTimeout(() => myicon04.classList.toggle("trash-icon2"), 9000);
}, 9000);
