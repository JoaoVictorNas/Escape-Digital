let currentQuestion = 0;
let score = 0;
const userAnswers = [];
const questions = [
    {
        text: "Crie uma senha forte",
        validate: answer => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(answer),
        correctAnswer: "uma senha forte é aquela que conta com diferentes caracteres e mais de 8 digitos.",
        hint: "Uma boa senha combina diferentes tipos de caracteres e mais de 8 digitos",
        type: "text"
    },
    {
        text: "Qual das seguintes opções é o site mais seguro para realizar uma compra online?",
        choices: ["http://compras.com", "https://compras.com", "ftp://compras.com"],
        correctAnswer: "https://compras.com",
        hint: "Procure sempre sites que utilizem HTTPS.",
        type: "multiple-choice"
    },
    {
        text: "Qual o termo que define a prática de falsificar um e-mail para roubar dados?",
        validate: answer => answer.toLowerCase() === "phishing",
        correctAnswer: "phishing",
        hint: "Começa com 'P' e é um termo para roubo de informações.",
        type: "text"
    },
    {
        text: "Quais das opções abaixo ajudam a proteger a sua conexão em redes públicas?",
        choices: ["Usar uma VPN", "Conectar sem VPN", "Desativar o firewall"],
        correctAnswer: "Usar uma VPN",
        hint: "Uma VPN cria uma camada extra de segurança.",
        type: "multiple-choice"
    },
    {
        text: "Complete a frase: Para proteger suas contas, utilize ________ para cada serviço.",
        validate: answer => answer.toLowerCase() === "senhas diferentes",
        correctAnswer: "senhas diferentes",
        hint: "Cada senha deve ser única.",
        type: "text"
    }
];

function startGame() {
    document.querySelector(".start-screen").classList.remove("active");
    document.querySelector(".game-container").classList.add("active");
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    document.querySelector(".tooltip-text").textContent = question.hint;
    document.querySelector(".question-text").textContent = `${currentQuestion + 1}. ${question.text}`;

    const answerInput = document.getElementById("answerInput");
    const choicesContainer = document.getElementById("choicesContainer");
    const submitBtn = document.getElementById("submitBtn");

    if (question.type === "text") {
        answerInput.style.display = "block";
        choicesContainer.style.display = "none";
        submitBtn.style.display = "block";
        answerInput.value = "";
    } else {
        answerInput.style.display = "none";
        choicesContainer.style.display = "block";
        submitBtn.style.display = "none";
        choicesContainer.innerHTML = "";
        question.choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.onclick = () => submitChoice(choice);
            choicesContainer.appendChild(button);
        });
    }
}

function submitChoice(choice) {
    const question = questions[currentQuestion];
    const isCorrect = choice === question.correctAnswer;
    userAnswers.push({ question: question.text, userAnswer: choice, correctAnswer: question.correctAnswer, isCorrect });
    if (isCorrect) score++;
    nextQuestion();
}

function submitAnswer() {
    const question = questions[currentQuestion];
    const userAnswer = document.getElementById("answerInput").value.trim();
    const isCorrect = question.validate(userAnswer);
    userAnswers.push({ question: question.text, userAnswer, correctAnswer: "Resposta correta", isCorrect });
    if (isCorrect) score++;
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.querySelector(".game-container").classList.remove("active");
    document.querySelector(".result-screen").classList.add("active");

    const resultDetails = document.getElementById("resultDetails");
    resultDetails.innerHTML = `<p>Você acertou ${score} de ${questions.length} perguntas!</p>`;
    
    userAnswers.forEach(answer => {
        const result = document.createElement("p");
        result.className = answer.isCorrect ? "correct" : "incorrect";
        result.innerHTML = `<strong>Pergunta:</strong> ${answer.question}<br>
                            <strong>Sua Resposta:</strong> ${answer.userAnswer}<br>
                            <strong>Resposta Correta:</strong> ${answer.correctAnswer}<br>`;
        resultDetails.appendChild(result);
    });
}

function resetGame() {
    score = 0;
    currentQuestion = 0;
    userAnswers.length = 0;
    document.querySelector(".result-screen").classList.remove("active");
    document.querySelector(".start-screen").classList.add("active");
}

function showTooltip() {
    document.querySelector(".tooltip-text").style.display = "block";
}

function hideTooltip() {
    document.querySelector(".tooltip-text").style.display = "none";
}