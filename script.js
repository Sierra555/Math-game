window.addEventListener("DOMContentLoaded", () => {
	const operators = ["+", "-", "*"];
	const MIN_NUM = 0;
	const MAX_NUM = 100;
	const board = document.querySelector(".board");
	const questionLabel = board.querySelector(
		".question-label"
	);
	const questionInput = board.querySelector(
		".question-input"
	);
	const checkAnswerBtn =
		document.querySelector(".js-btn-check");
	const card = document.querySelector(".flip-card");
	const solutionReveal =
		document.querySelector(".js-solution");

	const speed = 200;
	let solution = "";

	const randomNum = (min, max) =>
		Math.floor(Math.random() * (max - min + 1) + min);

	function createQuestion() {
		const num1 = randomNum(MIN_NUM, MAX_NUM);
		const num2 = randomNum(MIN_NUM, MAX_NUM);
		const operator =
			operators[
				Math.floor(Math.random() * operators.length)
			];

		solution = eval(`${num1} ${operator} ${num2}`);
		solutionReveal.textContent = solution;

		return `${num1} ${operator} ${num2} =`;
	}

	function typeWriter(text) {
		let i = 0;
		questionLabel.textContent = "";

		function printChar() {
			if (i < text.length) {
				questionLabel.textContent += text.charAt(i);
				questionLabel.style.transform = `translate(${
					Math.random() * 2 - 1
				}px, ${Math.random() * 2 - 1}px)`;
				i++;
				setTimeout(printChar, speed);
			} else {
				questionLabel.style.transform = "translate(0,0)";
			}
		}

		printChar();
	}

	function generateQuestion() {
		questionInput.value = "";
		questionInput.classList.remove("correct", "wrong");
		typeWriter(createQuestion());
	}

	function handleCheckAnswer() {
		const value = Number(questionInput.value);
		if (!value && value !== 0) return;

		if (value === solution) {
			questionInput.classList.add("correct");
			setTimeout(() => {
				board.classList.add("slide-out");
				card.classList.remove("flipped");
			}, 700);

			setTimeout(() => {
				board.classList.add("slide-in");
				board.classList.remove("slide-out");
				generateQuestion();
				setTimeout(
					() => board.classList.remove("slide-in"),
					700
				);
			}, 1400);
		} else {
			questionInput.classList.add("wrong");
			setTimeout(() => {
				questionInput.value = "";
				questionInput.classList.remove("wrong");
				questionInput.focus();
			}, 501);
		}
	}

	checkAnswerBtn.addEventListener(
		"click",
		handleCheckAnswer
	);
	card.addEventListener("click", () =>
		card.classList.toggle("flipped")
	);
	window.addEventListener("load", generateQuestion);
});
