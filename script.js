const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const responseEl = document.getElementById("response");
const confettiEl = document.getElementById("confetti");
const heartsEl = document.getElementById("floating-hearts");
const reasonText = document.getElementById("reason-text");
const nextReasonBtn = document.getElementById("next-reason");
const vibeButtons = document.querySelectorAll(".vibe-chip");
const vibeResponse = document.getElementById("vibe-response");
const photoCards = document.querySelectorAll(".photo-card");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const letterModal = document.getElementById("letter-modal");
const openLetter = document.getElementById("open-letter");
const closeLetter = document.getElementById("close-letter");
const dateIdea = document.getElementById("date-idea");
const newIdeaBtn = document.getElementById("new-idea");
const bgAudio = document.getElementById("bg-audio");
const secondPage = document.getElementById("second-page");
const heroSection = document.querySelector(".hero");

const countdownDays = document.getElementById("countdown-days");
const countdownHours = document.getElementById("countdown-hours");
const countdownMins = document.getElementById("countdown-mins");
const countdownSecs = document.getElementById("countdown-secs");

const reasons = [
  "Your laugh is my favorite soundtrack.",
  "You make even rainy days feel golden.",
  "Your kindness changes the whole room.",
  "You are my favorite person to talk to.",
  "You make little moments feel cinematic.",
  "Your hugs reset my entire week.",
  "You inspire me to be better every day.",
];

const vibeMessages = {
  cozy: "Cozy night: blankets, candles, and a playlist just for us.",
  adventure: "Adventure date: sunset drive + surprise dessert stop.",
  glam: "Glam evening: dress up, city lights, and a sweet toast.",
  sweet: "Sweet & simple: takeout, a movie, and lots of cuddles.",
};

const dateIdeas = [
  "Stargazing with a thermos of hot chocolate.",
  "Build a pillow fort and watch our favorite movie.",
  "Cook a new recipe together and dance in the kitchen.",
  "Sunset picnic with handwritten notes.",
  "Night walk + playlist swap + ice cream.",
  "DIY photo booth with silly props.",
];

let reasonIndex = 0;
let noCount = 0;
let noIsFree = false;
let audioStarted = false;

function updateCountdown() {
  const now = new Date();
  const year = now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() > 14)
    ? now.getFullYear() + 1
    : now.getFullYear();
  const target = new Date(`${year}-02-14T00:00:00`);
  const diff = target - now;

  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const mins = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
  const secs = Math.max(0, Math.floor((diff / 1000) % 60));

  countdownDays.textContent = String(days).padStart(2, "0");
  countdownHours.textContent = String(hours).padStart(2, "0");
  countdownMins.textContent = String(mins).padStart(2, "0");
  countdownSecs.textContent = String(secs).padStart(2, "0");
}

function burstConfetti() {
  confettiEl.innerHTML = "";
  const colors = ["#ff6bad", "#ffd86f", "#8be9fd", "#caa6ff", "#ffb6c1"];
  for (let i = 0; i < 120; i += 1) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiEl.appendChild(piece);
  }
}

function floatHearts() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  const hearts = ["💗", "💖", "💘", "💝", "💕"];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${16 + Math.random() * 20}px`;
  heartsEl.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}

function moveNoButton() {
  if (!noIsFree) {
    const rect = noBtn.getBoundingClientRect();
    noBtn.classList.add("is-free");
    noBtn.style.left = `${rect.left}px`;
    noBtn.style.top = `${rect.top}px`;
    noBtn.style.transform = "translate(0, 0)";
    noIsFree = true;
  }

  const padding = 16;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding * 2;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding * 2;
  const x = padding + Math.random() * Math.max(0, maxX);
  const y = padding + Math.random() * Math.max(0, maxY);
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function setResponse(message) {
  responseEl.textContent = message;
}

function showSecondPage() {
  if (!secondPage) {
    return;
  }
  secondPage.classList.remove("is-hidden");
  secondPage.classList.add("is-revealed");
  document.body.classList.add("book-opening");
  if (heroSection) {
    heroSection.classList.add("is-closed");
  }
  setTimeout(() => {
    document.body.classList.add("book-opened");
    document.body.classList.remove("book-opening");
  }, 650);
}

function startBackgroundAudio() {
  if (!bgAudio || audioStarted) {
    return;
  }
  audioStarted = true;
  bgAudio.muted = false;
  bgAudio.volume = 0.35;
  bgAudio.play().then(
    () => {},
    () => {
      audioStarted = false;
    }
  );
}


yesBtn.addEventListener("click", () => {
  setResponse("Yay! I knew it. Our date is going to be magical.");
  burstConfetti();
  noBtn.classList.add("is-gone");
  showSecondPage();
  startBackgroundAudio();
});

noBtn.addEventListener("mouseenter", () => {
  noCount += 1;
  moveNoButton();
  const messages = [
    "Nice try, but you have to catch me first.",
    "Are you sure? I made confetti.",
    "My heart says please reconsider.",
    "Plot twist: the yes button is the real adventure.",
  ];
  setResponse(messages[noCount % messages.length]);
});

noBtn.addEventListener("mouseover", () => {
  moveNoButton();
});

noBtn.addEventListener("click", () => {
  setResponse("That button is shy. Try again.");
  moveNoButton();
});

nextReasonBtn.addEventListener("click", () => {
  reasonIndex = (reasonIndex + 1) % reasons.length;
  reasonText.textContent = reasons[reasonIndex];
});

vibeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const vibe = btn.dataset.vibe;
    vibeResponse.textContent = vibeMessages[vibe];
  });
});

photoCards.forEach((card) => {
  card.addEventListener("click", () => {
    const src = card.dataset.full;
    lightboxImg.src = src;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
});

openLetter.addEventListener("click", () => {
  letterModal.classList.add("active");
  letterModal.setAttribute("aria-hidden", "false");
});

closeLetter.addEventListener("click", () => {
  letterModal.classList.remove("active");
  letterModal.setAttribute("aria-hidden", "true");
});

newIdeaBtn.addEventListener("click", () => {
  const idea = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
  dateIdea.textContent = idea;
});


setInterval(updateCountdown, 1000);
setInterval(floatHearts, 450);
updateCountdown();

