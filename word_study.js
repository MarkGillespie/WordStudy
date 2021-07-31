//== Initialize word lists

// prettier-ignore
const vowels = [ "A", "E", "I", "O", "U", "Y" ];

// prettier-ignore
const consonants = [ "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z" ];

// prettier-ignore
const valid_2 = Object.keys(twos_data);

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

// I think we just have to add SH, MM, HM
for (const valid_word of valid_2) {
  if (!all_2.includes(valid_word)) all_2.push(valid_word);
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

  const definition_div = document.createElement("div");
  definition_div.innerHTML = is_valid ? twos_data[current_word].def : "";
  definition_div.classList.add("definition");

  history_entry.appendChild(correctness_span);
  history_entry.appendChild(word_span);
  history_entry.appendChild(definition_div);

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

document.addEventListener("keydown", (event) => {
  const letter = event.key.toUpperCase();
  if (letter == "Y" || letter == "J") {
    process_input(true);
  } else if (letter == "N" || letter == "K") {
    process_input(false);
  }
});

new_word();
