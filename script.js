const quizData = [
    {
      question: 'What is the average of first five multiples of 12?',
      options: ['36', '38', '40', '42'],
      answer: '36',
    },
    {
      question: 'What is the difference in the place value of 5 in the numeral 754853?',
      options: ['49500', '49950', '45000', '49940'],
      answer: '49950',
    },
    {
      question: 'What is the compound interest on Rs. 2500 for 2 years at rate of interest 4% per annum?',
      options: ['RS.180', 'RS.204', 'RS.210', 'RS.220'],
      answer: 'RS.204',
    },
    {
      question: 'A mother is twice as old as her son. If 20 years ago, the age of the mother was 10 times the age of the son, what is the present age of the mother?',
      options: ['38 years', '40 years', '43 years', '45 years'],
      answer: '45 years',
    },
    {
      question: 'If January 1, 1996, was Monday, what day of the week was January 1, 1997?',
      options: [
        'Thursday',
        'Wednesday',
        'Friday',
        'Sunday',
      ],
      answer: 'Wesnesday',
    },
    {
      question: 'How many times the hands of a clock coincide in a day?',
      options: ['24', '22', '23', '21'],
      answer: '22',
    },
    {
      question: ' 40 % of 280 =?',
      options: [
        '112',
        '116',
        '115',
        '120',
      ],
      answer: '112',
    },
    {
      question: 'In what time Rs. 6000 will give interest of Rs. 720 at the rate of 6% p.a. S.I.?',
      options: ['1.5 Years','2 Years','2.5 Years','3 Years' ],
      answer: '2 Years'
    },
    {
      question: ' In how many years the simple interest on Rs. 6000 at 10% rate of interest S.I will become Rs. 1800?',
      options: [
        '3 Months',
        '3.5 Months',
        '4 Months',
        '4.5 Months',
      ],
      answer: '3 Months',
    },
    {
      question: 'Sohan has borrowed Rs. 5000 at the rate of 6% S.I. what amount he needs to pay after 3 years to clear the debt?',
      options: ['Rs.5000', 'Rs.5900', 'Rs.6100', 'Rs.6300'],
      answer: 'Rs.5900',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();