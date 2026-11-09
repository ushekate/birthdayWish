// ============================================================
// CONFIGURATION — EDIT THESE VALUES FIRST
// ============================================================
const birthdayConfig = {
  boyfriendName: "AVINASH (Aho)",
  yourName: "UNNATI",
  birthdayDate: "2026-11-10T00:00:00",
  songTitle: "Our Song",
  musicFile: "music/birthday-song1.mpeg"
};

const memories = [
  { image: "images/Image2.jpeg", title: "Our First Memory", caption: "A moment I'll always remember.", date: "A beautiful beginning" },
  { image: "images/Image3.jpeg", title: "That Beautiful Day", caption: "One of my favorite memories.", date: "One for the heart" },
  { image: "images/Image8.jpeg", title: "That Smile I Love", caption: "Your smile can change my whole day.", date: "My favorite view" },
  { image: "images/Image9.jpeg", title: "Our Little Adventure", caption: "Every adventure is better with you.", date: "A day to remember" },
  { image: "images/Image10.jpeg", title: "Us ❤️", caption: "My favorite place is wherever we are.", date: "Always us" }
];

const reasons = [
  { icon: "😊", title: "Your Smile", text: "Because somehow your smile makes even ordinary moments feel special." },
  { icon: "❤️", title: "Your Kind Heart", text: "The way you care, listen and show up says more than words ever could." },
  { icon: "✨", title: "Your Beautiful Soul", text: "There is something about the person you are that I genuinely admire." },
  { icon: "😂", title: "The Way You Make Me Laugh", text: "Thank you for all the silly moments and laughs I never want to forget." },
  { icon: "🤍", title: "The Comfort You Give Me", text: "With you, even quiet moments can feel warm, safe and meaningful." },
  { icon: "🌎", title: "The Memories We Create", text: "Every little memory with you becomes another page in my favorite story." },
  { icon: "🌟", title: "Your Dreams", text: "I love seeing you dream, grow and become more of the person you want to be." },
  { icon: "🫶", title: "Simply You", text: "At the end of every reason, there is one simple answer: I love you for you." }
];

const heartSymbols = ["❤️", "💕", "💖", "💗", "💓", "✨"];
const typewriterText =
  "I don't know if words can ever completely explain how special you are to me, but today I want to try. " +
  "Thank you for all the smiles, conversations, silly moments, quiet moments and memories that somehow became some of my favorite parts of life. " +
  "I hope this birthday reminds you how deeply appreciated you are and how many beautiful things are still waiting for you. " +
  "Keep dreaming, keep smiling, and keep being the wonderful person you are. Happy Birthday, my love. ❤️";

// ============================================================
// DOM ELEMENTS
// ============================================================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const pageLoader = $("#pageLoader");
const nav = $("#nav");
const navLinks = $("#navLinks");
const menuToggle = $("#menuToggle");
const openSurprise = $("#openSurprise");
const wishBtn = $("#wishBtn");
const wishMessage = $("#wishMessage");
const particleLayer = $("#particleLayer");
const confettiLayer = $("#confettiLayer");
const memoryGrid = $("#memoryGrid");
const reasonsGrid = $("#reasonsGrid");
const typewriter = $("#typewriter");
const typingCursor = $("#typingCursor");
const birthdayAudio = $("#birthdayAudio");
const musicToggle = $("#musicToggle");
const volumeControl = $("#volumeControl");
const songTitle = $("#songTitle");
const imageModal = $("#imageModal");
const modalImage = $("#modalImage");
const modalCaption = $("#modalCaption");
const modalClose = $("#modalClose");
const secretBtn = $("#secretBtn");
const secretOverlay = $("#secretOverlay");
const secretClose = $("#secretClose");
const toast = $("#toast");

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  applyPersonalization();
  renderMemories();
  renderReasons();
  setupNavigation();
  setupScrollReveal();
  setupCounters();
  setupCountdown();
  setupGallery();
  setupSecretReveal();
  setupMusic();
  setupWishButton();
  setupCursorHearts();
  startAmbientHearts();

  setTimeout(() => pageLoader.classList.add("hidden"), 700);
});

// ============================================================
// PERSONALIZATION
// ============================================================
function applyPersonalization() {
  $$("[data-name]").forEach(el => el.textContent = birthdayConfig.boyfriendName);
  $$("[data-your-name]").forEach(el => el.textContent = birthdayConfig.yourName);
  songTitle.textContent = birthdayConfig.songTitle;
  document.title = `Happy Birthday, ${birthdayConfig.boyfriendName} ❤️`;

  birthdayAudio.src = birthdayConfig.musicFile;
  birthdayAudio.volume = Number(volumeControl.value);
}

// ============================================================
// NAVIGATION
// ============================================================
function setupNavigation() {
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  $$(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  openSurprise.addEventListener("click", () => {
    document.body.classList.remove("no-scroll");
    startMusic();
    burstHearts(25);
    createConfetti(100);
    $("#birthday").scrollIntoView({ behavior: "smooth" });
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function setupScrollReveal() {
  const items = $$(".reveal-on-scroll");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.13 });

  items.forEach(item => observer.observe(item));

  const typeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !typewriter.dataset.started) {
        typewriter.dataset.started = "true";
        typeText(typewriterText, typewriter, typingCursor);
      }
    });
  }, { threshold: 0.25 });

  typeObserver.observe(typewriter);
}

// ============================================================
// TYPEWRITER
// ============================================================
function typeText(text, element, cursor, speed = 22) {
  let index = 0;
  element.textContent = "";

  const write = () => {
    if (index < text.length) {
      element.textContent += text[index++];
      setTimeout(write, text[index - 1] === "." ? speed * 2 : speed);
    } else {
      cursor.style.display = "none";
    }
  };
  write();
}

// ============================================================
// MEMORIES / GALLERY
// ============================================================
function renderMemories() {
  memoryGrid.innerHTML = memories.map((memory, index) => `
    <article class="memory-card reveal-on-scroll" tabindex="0"
      data-image="${escapeAttribute(memory.image)}"
      data-caption="${escapeAttribute(memory.caption)}"
      data-title="${escapeAttribute(memory.title)}"
      aria-label="Open ${escapeAttribute(memory.title)}">
      <img src="${escapeAttribute(memory.image)}" alt="${escapeAttribute(memory.title)}" loading="lazy"
        onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22%3E%3Crect width=%22800%22 height=%22600%22 fill=%22%23251325%22/%3E%3Ctext x=%2250%25%22 y=%2248%25%22 text-anchor=%22middle%22 fill=%22%23ffb2c9%22 font-size=%2230%22 font-family=%22Arial%22%3EAdd photo${index + 1}.jpg%3C/text%3E%3Ctext x=%2250%25%22 y=%2256%25%22 text-anchor=%22middle%22 fill=%22%23cdb8c7%22 font-size=%2218%22 font-family=%22Arial%22%3Eto images folder%3C/text%3E%3C/svg%3E';">
      <div class="memory-info">
        <small>${escapeHTML(memory.date)}</small>
        <h3>${escapeHTML(memory.title)}</h3>
        <p>${escapeHTML(memory.caption)}</p>
      </div>
    </article>
  `).join("");

  setupScrollReveal();
}

function setupGallery() {
  memoryGrid.addEventListener("click", event => {
    const card = event.target.closest(".memory-card");
    if (!card) return;
    openImageModal(card.dataset.image, card.dataset.title, card.dataset.caption);
  });

  memoryGrid.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".memory-card");
    if (!card) return;
    event.preventDefault();
    openImageModal(card.dataset.image, card.dataset.title, card.dataset.caption);
  });

  modalClose.addEventListener("click", closeImageModal);
  imageModal.addEventListener("click", event => {
    if (event.target === imageModal) closeImageModal();
  });
}

function openImageModal(src, title, caption) {
  modalImage.src = src;
  modalImage.alt = title;
  modalCaption.textContent = `${title} — ${caption}`;
  imageModal.classList.add("open");
  imageModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeImageModal() {
  imageModal.classList.remove("open");
  imageModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

// ============================================================
// REASONS
// ============================================================
function renderReasons() {
  reasonsGrid.innerHTML = reasons.map(reason => `
    <article class="reason-card reveal-on-scroll">
      <span class="reason-icon">${reason.icon}</span>
      <h3>${escapeHTML(reason.title)}</h3>
      <p>${escapeHTML(reason.text)}</p>
    </article>
  `).join("");
}

// ============================================================
// COUNTERS
// ============================================================
function setupCounters() {
  const counters = $$(".counter-number");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = "true";
      animateCounter(entry.target, Number(entry.target.dataset.count));
    });
  }, { threshold: .6 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
  const duration = 1300;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ============================================================
// COUNTDOWN
// ============================================================
function setupCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function getNextBirthday() {
  const configured = new Date(birthdayConfig.birthdayDate);
  if (Number.isNaN(configured.getTime())) return null;

  const now = new Date();
  if (configured > now) return configured;

  // If the configured date has passed, use the same month/day next year.
  const next = new Date(now.getFullYear(), configured.getMonth(), configured.getDate(),
    configured.getHours(), configured.getMinutes(), configured.getSeconds());

  if (next <= now) next.setFullYear(next.getFullYear() + 1);
  return next;
}

function updateCountdown() {
  const target = getNextBirthday();
  if (!target) {
    setCountdownValues(0, 0, 0, 0);
    return;
  }

  const diff = target - new Date();
  if (diff <= 0) {
    setCountdownValues(0, 0, 0, 0);
    showBirthdayLive();
    createConfetti(120);
    burstHearts(40);
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  setCountdownValues(days, hours, minutes, seconds);
}

function setCountdownValues(days, hours, minutes, seconds) {
  $("#days").textContent = String(days).padStart(2, "0");
  $("#hours").textContent = String(hours).padStart(2, "0");
  $("#minutes").textContent = String(minutes).padStart(2, "0");
  $("#seconds").textContent = String(seconds).padStart(2, "0");
}

function showBirthdayLive() {
  $("#birthdayLive").classList.add("show");
}

// ============================================================
// CANDLE / WISH
// ============================================================
function setupWishButton() {
  wishBtn.addEventListener("click", () => {
    $$(".candle").forEach((candle, index) => {
      setTimeout(() => candle.classList.add("off"), index * 180);
    });

    createConfetti(130);
    burstHearts(45);
    wishMessage.classList.add("show");

    setTimeout(() => wishMessage.classList.remove("show"), 5000);
  });
}

// ============================================================
// SECRET SURPRISE
// ============================================================
function setupSecretReveal() {
  secretBtn.addEventListener("click", () => {
    secretOverlay.classList.add("open");
    secretOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    burstHearts(30);
  });

  secretClose.addEventListener("click", closeSecret);
  secretOverlay.addEventListener("click", event => {
    if (event.target === secretOverlay) closeSecret();
  });
}

function closeSecret() {
  secretOverlay.classList.remove("open");
  secretOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

// ============================================================
// MUSIC
// ============================================================
function setupMusic() {
  musicToggle.addEventListener("click", () => {
    if (birthdayAudio.paused) startMusic();
    else pauseMusic();
  });

  volumeControl.addEventListener("input", () => {
    birthdayAudio.volume = Number(volumeControl.value);
  });

  birthdayAudio.addEventListener("play", () => {
    musicToggle.textContent = "❚❚";
    musicToggle.setAttribute("aria-label", "Pause music");
  });

  birthdayAudio.addEventListener("pause", () => {
    musicToggle.textContent = "▶";
    musicToggle.setAttribute("aria-label", "Play music");
  });

  birthdayAudio.addEventListener("error", () => {
    showToast("Add your MP3 to music/birthday-song.mp3");
  });
}

function startMusic() {
  birthdayAudio.play().catch(() => {
    showToast("Tap the music button to start your song.");
  });
}

function pauseMusic() {
  birthdayAudio.pause();
}

// ============================================================
// HEART PARTICLES
// ============================================================
function startAmbientHearts() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  setInterval(() => {
    if (document.hidden) return;
    createHeart();
  }, 1100);
}

function createHeart(x = Math.random() * 100, bottom = -40) {
  const heart = document.createElement("span");
  heart.className = "heart-particle";
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = `${x}%`;
  heart.style.bottom = `${bottom}px`;
  heart.style.setProperty("--size", `${10 + Math.random() * 18}px`);
  heart.style.setProperty("--opacity", `${.25 + Math.random() * .55}`);
  heart.style.setProperty("--duration", `${5 + Math.random() * 5}s`);
  heart.style.setProperty("--sway", `${-80 + Math.random() * 160}px`);
  particleLayer.appendChild(heart);
  setTimeout(() => heart.remove(), 11000);
}

function burstHearts(amount = 20) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => createHeart(Math.random() * 100, Math.random() * 120), i * 20);
  }
}

// ============================================================
// CONFETTI
// ============================================================
function createConfetti(amount = 100) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--hue", `${Math.floor(Math.random() * 50) + 320}`);
    piece.style.setProperty("--duration", `${2 + Math.random() * 3}s`);
    piece.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);
    piece.style.setProperty("--rotation", `${Math.random() * 360}deg`);
    fragment.appendChild(piece);
  }

  confettiLayer.appendChild(fragment);
  setTimeout(() => {
    confettiLayer.innerHTML = "";
  }, 6000);
}

// ============================================================
// DESKTOP CURSOR EFFECT
// ============================================================
function setupCursorHearts() {
  const mobile = window.matchMedia("(pointer: coarse)").matches;
  if (mobile || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let last = 0;
  window.addEventListener("pointermove", event => {
    const now = performance.now();
    if (now - last < 90) return;
    last = now;

    const heart = document.createElement("span");
    heart.textContent = Math.random() > .4 ? "✦" : "♥";
    heart.style.position = "fixed";
    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "700";
    heart.style.color = Math.random() > .5 ? "#ff8fab" : "#ffd6e7";
    heart.style.fontSize = `${8 + Math.random() * 9}px`;
    heart.style.transition = "transform .7s ease, opacity .7s ease";
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = `translate(${(-15 + Math.random() * 30)}px, -35px) scale(.3)`;
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 750);
  }, { passive: true });
}

// ============================================================
// KEYBOARD ACCESSIBILITY
// ============================================================
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (imageModal.classList.contains("open")) closeImageModal();
    if (secretOverlay.classList.contains("open")) closeSecret();
  }
});

// ============================================================
// HELPERS
// ============================================================
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[char]));
}

function escapeAttribute(value) {
  return escapeHTML(value);
}
