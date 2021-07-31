//== Initialize word lists

const vowels = [
    "A","E","I","O","U","Y"
]

const consonants = [
    "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"
]

const valid_2 = [
    "AA", "AB", "AD", "AE", "AG", "AH", "AI", "AL", "AM", "AN", "AR", "AS", "AT", "AW", "AX", "AY", "BA", "BE", "BI", "BO", "BY", "DA", "DE", "DO", "ED", "EF", "EH", "EL", "EM", "EN", "ER", "ES", "ET", "EW", "EX", "FA", "FE", "GI", "GO", "HA", "HE", "HI", "HM", "HO", "ID", "IF", "IN", "IS", "IT", "JO", "KA", "KI", "LA", "LI", "LO", "MA", "ME", "MI", "MM", "MO", "MU", "MY", "NA", "NE", "NO", "NU", "OD", "OE", "OF", "OH", "OI", "OK", "OM", "ON", "OP", "OR", "OS", "OW", "OX", "OY", "PA", "PE", "PI", "PO", "QI", "RE", "SH", "SI", "SO", "TA", "TE", "TI", "TO", "UH", "UM", "UN", "UP", "US", "UT", "WE", "WHO", "XI", "XI", "YA", "YE", "YO", "AZ"
]

let all_2 = []
for (const v of vowels) {
    for (const w of vowels) {
        all_2.push(w+v)
        if (v != w) all_2.push(v+w)
    }
    for (const c of consonants) {
        all_2.push(c+v)
        all_2.push(v+c)
    }
}

const word_area = document.getElementById("word")
const result_area = document.getElementById("result")
let current_word = "";

function display_char(char) {
    const div = document.createElement("div")
    div.innerHTML = char
    div.classList.add("letter_tile")
    word_area.appendChild(div)
}

function display(word) {
    word_area.innerHTML = ""
    for (const char of word) {
        display_char(char)
    }
}

function respond(message, correct) {
    result_area.classList.add(correct?"correct":"incorrect");
    result_area.innerHTML = message;
}

function clear_response() {
    result_area.classList.remove("correct");
    result_area.classList.remove("incorrect");
    result_area.innerHTML = "";
}

function grade_response(is_word) {
    const correct_response = valid_2.includes(current_word);
    if (is_word === correct_response) {
        respond("Yes! " + current_word + " is " + (!is_word?"not ":"") + "a word", true)
    } else {
        respond("No. " + current_word + " is " + (is_word?"not ":"") + "a word", false)
    }
}

function new_word() {
    clear_response();
    current_word = all_2[Math.floor(Math.random()*all_2.length)];
    display(current_word);
}

document.getElementById("Yes").onclick = ()=>{
    grade_response(true);
}
document.getElementById("No").onclick = ()=>{
    grade_response(false);
}
document.getElementById("New").onclick = ()=>{
    new_word();
}

new_word();
