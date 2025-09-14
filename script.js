window.addEventListener("DOMContentLoaded", () => {
	const board = document.querySelector(".board");
	const question = document.querySelector(".question");
	const questionLabel = question.querySelector(
		".question-label"
	);
	const questionInput = question.querySelector(
		".question-input"
	);
	const checkAnswerBtn =
		document.querySelector(".js-btn-check");
	const card = document.querySelector(".flip-card");
	const solutionReveal =
		document.querySelector(".js-solution");
	const selectLevel = board.querySelector("[data-level]");

	const speed = 200;
	let solution = "";

	const savedLevel =
		localStorage.getItem("level") || selectLevel.value;
	selectLevel.value = savedLevel;

	const randomNum = (min, max) =>
		Math.floor(Math.random() * (max - min + 1) + min);

	function createQuestion() {
		const gameLevel = selectLevel.value;

		const operators =
			gameLevel === "easy" ? ["+", "-"] : ["+", "-", "*"];
		const MIN_NUM = 0;
		const MAX_NUM =
			gameLevel === "hard"
				? 100
				: gameLevel === "medium"
				? 20
				: 50;

		let [num1, num2] = [
			randomNum(MIN_NUM, MAX_NUM),
			randomNum(MIN_NUM, MAX_NUM),
		];

		const operator =
			operators[
				Math.floor(Math.random() * operators.length)
			];

		if (
			gameLevel === "easy" &&
			operator === "-" &&
			num1 < num2
		) {
			[num1, num2] = [num2, num1];
		}

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

	function switchQuestion() {
		setTimeout(() => {
			question.classList.add("slide-out");
			card.classList.remove("flipped");
		}, 700);

		setTimeout(() => {
			question.classList.add("slide-in");
			question.classList.remove("slide-out");

			generateQuestion();

			setTimeout(
				() => question.classList.remove("slide-in"),
				700
			);
		}, 1400);
	}

	function handleCheckAnswer() {
		const value = Number(questionInput.value);
		if (!value && isNaN(value)) return;

		if (value === solution) {
			questionInput.classList.add("correct");

			switchQuestion();
		} else {
			questionInput.classList.add("wrong");
			setTimeout(() => {
				questionInput.value = "";
				questionInput.classList.remove("wrong");
				questionInput.focus();
			}, 501);
		}
	}

	selectLevel.addEventListener("change", () => {
		localStorage.setItem("level", selectLevel.value);
		switchQuestion();
	});

	checkAnswerBtn.addEventListener(
		"click",
		handleCheckAnswer
	);

	questionInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") handleCheckAnswer();
	});

	card.addEventListener("click", () =>
		card.classList.toggle("flipped")
	);

	generateQuestion();
});
