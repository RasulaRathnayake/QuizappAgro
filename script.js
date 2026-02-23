const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");
const startBtn = document.querySelector(".start");
const numQuestions = document.querySelector("#num-questions");
const levelSelect = document.querySelector("#level");
const timePerQuestion = document.querySelector("#time");

const quiz = document.querySelector(".quiz");
const startScreen = document.querySelector(".start-screen");
const submitBtn = document.querySelector(".submit");
const nextBtn = document.querySelector(".next");
const endScreen = document.querySelector(".end-screen");
const finalScore = document.querySelector(".final-score");
const totalScore = document.querySelector(".total-score");

let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let time = 30;

/* ===========================
   QUESTION BANK (All 64)
=========================== */

const questionBank = {
  upcountry: [
    { question: "Which vegetable grows best in cool climates?", options: ["Tomato","Carrot","Eggplant","Okra"], answer:"Carrot" },
    { question: "Ideal spacing for cabbage seedlings?", options:["10 × 10 cm","30 × 30 cm","50 × 50 cm","5 × 5 cm"], answer:"30 × 30 cm" },
    { question: "Which fertilizer is rich in nitrogen?", options:["Urea","Rock Phosphate","Potash","Lime"], answer:"Urea" },
    { question: "Main pest of lettuce in upcountry?", options:["Aphids","Weevil","Termites","Mealybug"], answer:"Aphids" },
    { question: "Tomato requires how many hours of sunlight?", options:["2–3 hours","4–6 hours","6–8 hours","10–12 hours"], answer:"6–8 hours" },
    { question: "Best soil pH for carrot?", options:["5.5–6.5","3.0–4.0","7.5–8.5","4.0–5.0"], answer:"5.5–6.5" },
    { question: "Common disease in upcountry cabbage?", options:["Black rot","Rust","Powdery mildew","Anthracnose"], answer:"Black rot" },
    { question: "Potato is a:", options:["Leaf crop","Root crop","Fruit crop","Flower crop"], answer:"Root crop" },
    { question: "Leafy vegetables irrigation frequency?", options:["Every 1–2 days","Once a week","Every 10 days","Twice a month"], answer:"Every 1–2 days" },
    { question: "Best month to plant carrot in upcountry?", options:["June–July","Dec–Jan","Mar–Apr","Sep–Oct"], answer:"June–July" },
  ],
  lowcountry: [
    { question:"Best vegetable for lowcountry dry season?", options:["Okra","Broccoli","Lettuce","Spinach"], answer:"Okra" },
    { question:"Ideal spacing for pumpkin?", options:["50 × 50 cm","2 × 2 m","30 × 30 cm","10 × 10 cm"], answer:"2 × 2 m" },
    { question:"Which pest attacks eggplant?", options:["Fruit borer","Aphid","Nematode","Leaf miner"], answer:"Fruit borer" },
    { question:"Fertilizer high in potassium is for?", options:["Leaf growth","Fruit development","Root growth","Seed formation"], answer:"Fruit development" },
    { question:"Best irrigation method for lowcountry tomato?", options:["Flooding","Drip irrigation","Sprinkler","Manual watering"], answer:"Drip irrigation" },
    { question:"Which vegetable is drought-tolerant?", options:["Okra","Cabbage","Lettuce","Spinach"], answer:"Okra" },
    { question:"Disease common in chili plants?", options:["Anthracnose","Powdery mildew","Black rot","Late blight"], answer:"Anthracnose" },
    { question:"Cucumber maturation period?", options:["20–30 days","50–70 days","90–100 days","120–150 days"], answer:"50–70 days" },
    { question:"Best season to plant lowcountry beans?", options:["Dry season","Rainy season","Winter","Summer"], answer:"Dry season" },
    { question:"Lowcountry okra harvest period?", options:["3–5 days","40–50 days","60–70 days","80–90 days"], answer:"40–50 days" },
  ],
  fruit: [
    { question:"Best soil for banana cultivation?", options:["Sandy loam","Clay","Rocky","Saline"], answer:"Sandy loam" },
    { question:"Pineapple is propagated by?", options:["Seed","Sucker","Cutting","Grafting"], answer:"Sucker" },
    { question:"Ideal spacing for mango trees?", options:["5 × 5 m","8 × 8 m","10 × 10 m","2 × 2 m"], answer:"10 × 10 m" },
    { question:"Main fertilizer for citrus?", options:["NPK 15:15:15","Urea","Potash","Lime"], answer:"NPK 15:15:15" },
    { question:"Papaya pest susceptibility?", options:["Papaya mealybug","Aphid","Termite","Whitefly"], answer:"Papaya mealybug" },
    { question:"Fruit tree tolerant to waterlogging?", options:["Mango","Jackfruit","Banana","Papaya"], answer:"Jackfruit" },
    { question:"Guava pruning purpose?", options:["Flowering","Pest control","Leaf growth","Root development"], answer:"Flowering" },
    { question:"Best irrigation for orchard fruits?", options:["Drip","Flooding","Sprinkler","None"], answer:"Drip" },
    { question:"Fruit ripening enhancer?", options:["Ethylene gas","Watering","Fertilizer","Pesticides"], answer:"Ethylene gas" },
    { question:"Which fruit is climacteric?", options:["Banana","Pineapple","Orange","Lemon"], answer:"Banana" },
  ],
  fertilizer: [
    { question:"NPK stands for?", options:["Nitrogen, Phosphorus, Kalium","Nitrogen, Potassium, Calcium","Nickel, Phosphorus, Kalium","Nitrogen, Potassium, Carbon"], answer:"Nitrogen, Phosphorus, Kalium" },
    { question:"Nutrient promoting fruiting?", options:["Nitrogen","Phosphorus","Potassium","Calcium"], answer:"Potassium" },
    { question:"Drip irrigation is best for?", options:["Rice","Orchards","Flooded fields","Forests"], answer:"Orchards" },
    { question:"Sprinkler irrigation suitable for?", options:["Vegetables","Fruit trees","Orchards","Tea"], answer:"Vegetables" },
    { question:"Foliar feeding is via?", options:["Soil","Water","Leaf spraying","Fertilizer pellet"], answer:"Leaf spraying" },
    { question:"Compost improves?", options:["Soil fertility","Pest resistance","Irrigation","Flower color"], answer:"Soil fertility" },
    { question:"Acidic fertilizer?", options:["Urea","Ammonium sulfate","Rock phosphate","Lime"], answer:"Ammonium sulfate" },
    { question:"Over-irrigation causes?", options:["Better growth","Waterlogging","Pest resistance","Flowering"], answer:"Waterlogging" },
    { question:"Best irrigation for sloping land?", options:["Drip","Flood","Furrow","Sprinkler"], answer:"Drip" },
    { question:"Organic farming avoids?", options:["Synthetic fertilizer","Compost","Mulch","Irrigation"], answer:"Synthetic fertilizer" },
  ],
  technology: [
    { question:"IPM stands for?", options:["Integrated Pest Management","International Plant Method","Insect Pest Monitoring","Intensive Planting Method"], answer:"Integrated Pest Management" },
    { question:"Biological pest control uses?", options:["Chemicals","Natural predators","Fertilizers","Fungicides"], answer:"Natural predators" },
    { question:"Greenhouse farming suitable for?", options:["Lowcountry crops","High-value vegetables","Rainfed crops","Fruit orchards"], answer:"High-value vegetables" },
    { question:"Pest attacking rice?", options:["Rice stem borer","Fruit borer","Aphid","Mealybug"], answer:"Rice stem borer" },
    { question:"Fungicide prevents?", options:["Bacterial diseases","Fungal diseases","Viral diseases","Nematodes"], answer:"Fungal diseases" },
    { question:"Modern irrigation tech?", options:["Flood","Drip & sprinkler","Manual watering","Rainfed"], answer:"Drip & sprinkler" },
    { question:"Crop rotation prevents?", options:["Soil erosion","Pest & disease buildup","Fertilizer use","Waterlogging"], answer:"Pest & disease buildup" },
    { question:"Precision agriculture uses?", options:["Satellites & sensors","Only tractors","Manual labor","Pesticides"], answer:"Satellites & sensors" },
    { question:"Viral crop disease?", options:["Banana bunchy top","Late blight","Powdery mildew","Black rot"], answer:"Banana bunchy top" },
    { question:"Drones in agriculture are used for?", options:["Spraying","Plowing","Manual harvesting","Seed germination"], answer:"Spraying" },
  ],
  bee: [
    { question:"Optimal hive spacing for honey bees?", options:["1–2 m","5 m","10 m","50 cm"], answer:"1–2 m" },
    { question:"Which crop benefits most from pollination?", options:["Rice","Mango","Potato","Cabbage"], answer:"Mango" },
    { question:"Bee-keeping increases fruit yield by?", options:["5–10%","20–30%","50–60%","No effect"], answer:"20–30%" },
    { question:"Ideal plant spacing for maize?", options:["25 × 25 cm","50 × 50 cm","10 × 10 cm","100 × 100 cm"], answer:"50 × 50 cm" },
    { question:"Green manure improves?", options:["Pest resistance","Soil fertility","Irrigation","Flower color"], answer:"Soil fertility" },
    { question:"Companion planting helps in?", options:["Pest control","Fertilizer application","Irrigation","Harvesting speed"], answer:"Pest control" },
    { question:"Common bee species in Sri Lanka?", options:["Apis cerana","Apis dorsata","Apis mellifera","Bombus terrestris"], answer:"Apis cerana" },
    { question:"Pollination by bees is?", options:["Abiotic","Biotic","Artificial","Mechanical"], answer:"Biotic" },
    { question:"Honey stored by bees contains?", options:["Water & sugar","Protein","Fat","Starch"], answer:"Water & sugar" },
    { question:"Bee diseases controlled by?", options:["Pesticides","Hygiene & management","Irrigation","Fertilizers"], answer:"Hygiene & management" },
  ]
};

/* ===========================
   START QUIZ
=========================== */
startBtn.addEventListener("click", () => {
  const selectedLevel = levelSelect.value;
  const num = parseInt(numQuestions.value);

  // Combine all if "All 64" selected
  if (num === 64) {
    questions = Object.values(questionBank).flat();
  } else {
    questions = shuffleArray(questionBank[selectedLevel]).slice(0, num);
  }

  if (questions.length === 0) { alert("No questions available!"); return; }

  startScreen.classList.add("hide");
  quiz.classList.remove("hide");

  currentQuestion = 0;
  score = 0;
  showQuestion();
});

/* ===========================
   SHOW QUESTION
=========================== */
function showQuestion() {
  const questionText = document.querySelector(".question");
  const answersWrapper = document.querySelector(".answer-wrapper");
  const questionNumber = document.querySelector(".number");

  let q = questions[currentQuestion];
  questionText.textContent = q.question;
  answersWrapper.innerHTML = "";

  shuffleArray(q.options).forEach(opt => {
    const div = document.createElement("div");
    div.className = "answer";
    div.innerHTML = `<span class="text">${opt}</span><span class="checkbox"><i class="fas fa-check"></i></span>`;
    answersWrapper.appendChild(div);

    div.addEventListener("click", () => {
      document.querySelectorAll(".answer").forEach(a => a.classList.remove("selected"));
      div.classList.add("selected");
      submitBtn.disabled = false;
    });
  });

  questionNumber.innerHTML = `Question <span class="current">${currentQuestion+1}</span>/<span class="total">${questions.length}</span>`;

  time = parseInt(timePerQuestion.value);
  startTimer();

  submitBtn.disabled = true;
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
}

/* ===========================
   TIMER
=========================== */
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (time >= 0) {
      progressBar.style.width = (time / timePerQuestion.value) * 100 + "%";
      progressText.textContent = time;
      time--;
    } else { checkAnswer(); }
  }, 1000);
}

/* ===========================
   CHECK ANSWER
=========================== */
submitBtn.addEventListener("click", checkAnswer);

function checkAnswer() {
  clearInterval(timer);

  const selected = document.querySelector(".answer.selected");
  if (!selected) return;

  const userAnswer = selected.querySelector(".text").textContent;
  const correctAnswer = questions[currentQuestion].answer;

  document.querySelectorAll(".answer").forEach(answer => {
    const text = answer.querySelector(".text").textContent;
    if (text === correctAnswer) answer.classList.add("correct");
    if (answer.classList.contains("selected") && text !== correctAnswer) answer.classList.add("wrong");
    answer.classList.add("checked");
  });

  if (userAnswer === correctAnswer) score++;
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
}

/* ===========================
   NEXT QUESTION
=========================== */
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) showQuestion();
  else showScore();
});

/* ===========================
   SHOW SCORE
=========================== */
function showScore() {
  quiz.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.textContent = score;
  totalScore.textContent = questions.length;
}

/* ===========================
   SHUFFLE UTILITY
=========================== */
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

/* ===========================
   RESTART
=========================== */
document.querySelector(".restart").addEventListener("click", () => {
  window.location.reload();
});
