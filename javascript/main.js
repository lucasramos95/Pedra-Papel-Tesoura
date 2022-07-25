let hasPicked = false;
let score = 0;
const picks = ["rock", "paper", "scissors"];
const cpPicks = ["cp-rock", "cp-paper", "cp-scissors"];
const beats = ["scissors", "rock", "paper"];

const selectBadge = (id) => {
  if (hasPicked) return;
  hasPicked = true;
  let selectedBadge = document.getElementById(id);
  let pickBackground = document.getElementById("pick-bg");
  let pickPlayerTitle = document.getElementsByClassName("pick-title--player")[0];

  pickBackground.classList.add("hidden");
  let badges = document.getElementsByClassName("badge");
  [].forEach.call(badges, (badge) => {
    badge.classList.remove("selected");
    badge.classList.add("hidden");
  });
  selectedBadge.classList.remove("hidden");
  selectedBadge.classList.add("selected");
  pickPlayerTitle.classList.add("picked");

  setTimeout(() => {
    const playerIdx = picks.indexOf(id);
    const cpIdx = getRandomInt(3);
    setupResult(playerIdx, cpIdx);
  }, 600);
};

const playAgain = () => {
  hasPicked = false;
  let pickBackground = document.getElementById("pick-bg");
  let pickPlayerTitle = document.getElementsByClassName("pick-title--player")[0];
  let pickComputerTitle = document.getElementsByClassName("pick-title--cp")[0];
  let resultTitle = document.getElementsByClassName("result-zone")[0];
  let winnerAura = document.getElementById("winner-aura");

  resultTitle.classList.remove("visible");
  pickPlayerTitle.classList.remove("picked");
  pickComputerTitle.classList.remove("picked");
  pickBackground.classList.remove("hidden");
  winnerAura.classList.remove("visible", "computer", "player");
  let badges = document.getElementsByClassName("badge");
  [].forEach.call(badges, (badge) => {
    badge.classList.remove("selected");
    badge.classList.remove("hidden");
    badge.classList.remove("picked");
  });
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const setupResult = (playerIdx, cpIdx) => {
  let resTitle = document.querySelector(".result-zone > .title");
  let scoreTitle = document.querySelector(".score-board > span");
  let winnerAura = document.getElementById("winner-aura");
  let pickComputerTitle = document.getElementsByClassName("pick-title--cp")[0];

  if (playerIdx === cpIdx) {
    resTitle.innerHTML = "tie !";
  } else if (beats[cpIdx] === picks[playerIdx]) {
    score--;
    resTitle.innerHTML = "you lose";
    scoreTitle.innerHTML = `${score < 100 && score > -100 ? score : "O_O"}`;
    winnerAura.classList.add("visible", "computer");
  } else {
    score++;
    resTitle.innerHTML = "you win";
    scoreTitle.innerHTML = `${score < 100 && score > -100 ? score : "O_O"}`;
    winnerAura.classList.add("visible", "player");
  }

  let cpBadge = document.getElementById(cpPicks[cpIdx]);
  cpBadge.classList.add("selected");
  pickComputerTitle.classList.add("picked");
  let resultTitle = document.getElementsByClassName("result-zone")[0];
  resultTitle.classList.add("visible");
};
