const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const operators = ["+", "-", "*", "/", "%"];

buttons.forEach(btn => {
    btn.addEventListener("click", () => handleInput(btn));
});

document.addEventListener("keydown", e => {
    if ((e.key >= 0 && e.key <= 9) || operators.includes(e.key) || e.key === ".") {
        appendValue(e.key);
    } else if (e.key === "Enter") calculate();
    else if (e.key === "Backspace") deleteLast();
    else if (e.key === "Escape") clearDisplay();
});

function handleInput(btn) {
    if (btn.dataset.value) appendValue(btn.dataset.value);
    if (btn.dataset.action === "clear") clearDisplay();
    if (btn.dataset.action === "delete") deleteLast();
    if (btn.dataset.action === "equals") calculate();
}

function appendValue(value) {
    const last = display.value.slice(-1);
    if (operators.includes(last) && operators.includes(value)) return;
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const result = Function(`"use strict"; return (${display.value})`)();
        if (!isFinite(result)) throw Error();
        display.value = result;
    } catch {
        display.classList.add("error");
        setTimeout(() => display.classList.remove("error"), 300);
    }
}