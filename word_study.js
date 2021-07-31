//== Initialize word lists

// prettier-ignore
const vowels = [ "A", "E", "I", "O", "U", "Y" ];

// prettier-ignore
const consonants = [ "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z" ];

// prettier-ignore
const valid_2 = [ "AA", "AB", "AD", "AE", "AG", "AH", "AI", "AL", "AM", "AN", "AR", "AS", "AT", "AW", "AX", "AY", "BA", "BE", "BI", "BO", "BY", "DA", "DE", "DO", "ED", "EF", "EH", "EL", "EM", "EN", "ER", "ES", "ET", "EW", "EX", "FA", "FE", "GI", "GO", "HA", "HE", "HI", "HM", "HO", "ID", "IF", "IN", "IS", "IT", "JO", "KA", "KI", "LA", "LI", "LO", "MA", "ME", "MI", "MM", "MO", "MU", "MY", "NA", "NE", "NO", "NU", "OD", "OE", "OF", "OH", "OI", "OK", "OM", "ON", "OP", "OR", "OS", "OW", "OX", "OY", "PA", "PE", "PI", "PO", "QI", "RE", "SH", "SI", "SO", "TA", "TE", "TI", "TO", "UH", "UM", "UN", "UP", "US", "UT", "WE", "WHO", "XI", "XI", "YA", "YE", "YO", "ZA" ];

let all_2 = [];
for (const v of vowels) {
  for (const w of vowels) {
    all_2.push(w + v);
    if (v != w) all_2.push(v + w);
  }
  for (const c of consonants) {
    all_2.push(c + v);
    all_2.push(v + c);
  }
}

const word_area = document.getElementById("word");
const result_area = document.getElementById("result");
const history_area = document.getElementById("history");
let current_word = "";

function check_current_word_is_valid() {
  return valid_2.includes(current_word);
}

function display_char(char) {
  const div = document.createElement("div");
  div.innerHTML = char;
  div.classList.add("letter_tile");
  word_area.appendChild(div);
}

function display(word) {
  word_area.innerHTML = "";
  for (const char of word) {
    display_char(char);
  }
}

function respond(message, correct) {
  clear_response();
  result_area.classList.add(correct ? "correct" : "incorrect");
  result_area.innerHTML = message;
}

function clear_response() {
  result_area.classList.remove("correct");
  result_area.classList.remove("incorrect");
  result_area.innerHTML = "";
}

function add_current_word_to_history(got_correct) {
  const history_entry = document.createElement("div");
  const is_valid = check_current_word_is_valid();

  const correctness_span = document.createElement("span");
  correctness_span.innerHTML = got_correct ? "✔" : "✗";
  correctness_span.classList.add("correctness");

  const word_span = document.createElement("span");
  word_span.innerHTML = current_word;
  word_span.classList.add("word");

  const validity_span = document.createElement("span");
  validity_span.innerHTML = "(" + (is_valid ? "" : "not ") + "valid)";
  validity_span.classList.add("validity");

  history_entry.appendChild(correctness_span);
  history_entry.appendChild(word_span);
  history_entry.appendChild(validity_span);

  history_entry.classList.add("history_entry");
  history_entry.classList.add(is_valid ? "h_valid" : "h_invalid");
  history_entry.classList.add(got_correct ? "h_correct" : "h_incorrect");

  if (history_area.childNodes[0]) {
    history_area.insertBefore(history_entry, history_area.childNodes[0]);
  } else {
    history_area.appendChild(history_entry);
  }
}

function grade_response(got_correct, correct_answer) {
  if (got_correct) {
    respond(
      "Yes! " +
        current_word +
        " is " +
        (!correct_answer ? "not " : "") +
        "a word",
      true
    );
  } else {
    respond(
      "No. " +
        current_word +
        " is " +
        (!correct_answer ? "not " : "") +
        "a word",
      false
    );
  }
}

function new_word() {
  current_word = all_2[Math.floor(Math.random() * all_2.length)];
  display(current_word);
}

function process_input(is_word) {
  const correct_answer = check_current_word_is_valid();
  const got_correct = is_word == correct_answer;
  grade_response(got_correct, correct_answer);
  add_current_word_to_history(got_correct);
  setTimeout(new_word, 50);
}

document.getElementById("Yes").onclick = () => {
  process_input(true);
};
document.getElementById("No").onclick = () => {
  process_input(false);
};

new_word();
