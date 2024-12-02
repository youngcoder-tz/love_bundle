document.addEventListener("DOMContentLoaded", async () => {
    const MONGODB_URI = "mongodb+srv://jomjoam0:jomjoam0@cluster0.frv6a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    // Function to log data to MongoDB
    async function logToMongoDB(action) {
      try {
        const response = await fetch("https://love-bundle.onrender.com/log-click", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action, timestamp: new Date().toISOString() }),
        });

        if (!response.ok) {
          console.error("Failed to log action to MongoDB:", await response.text());
        }
      } catch (error) {
        console.error("Error logging action to MongoDB:", error);
      }
    }

    // Elements
    const startGameButton = document.getElementById("start-game-button");
    const proceedButton = document.getElementById("proceed-button");
    const firefliesNextButton = document.getElementById("fireflies-next-button");
    const aboutUsNextButton = document.getElementById("about-us-next-button");
    const cluesNextButton = document.getElementById("clues-next-button");
    const nextSceneButton = document.getElementById("mini-game-next-button");
    const proposalYesButton = document.getElementById("proposal-yes");
    const proposalThinkButton = document.getElementById("proposal-think");
    const openGiftButton = document.getElementById("open-gift");

    const choiceResult = document.getElementById("choice-result");
    const selectedSymbol = document.getElementById("selected-symbol");

    // Music and Sound Effects
    const backgroundMusic = new Audio("background-music.mp3");
    const celebrationMusic = new Audio("celebration-music.mp3");
    const clueSound = new Audio("clue-sound.mp3");
    const giftSound = new Audio("gift-open.mp3");

    // Global Utility Functions
    function playMusic(music) {
      music.play();
      music.loop = true;
    }

    function stopMusic(music) {
      music.pause();
      music.currentTime = 0;
    }

    function showScene(hideId, showId) {
      document.getElementById(hideId).style.display = "none";
      document.getElementById(showId).style.display = "block";
    }

    // Start Game
    startGameButton.addEventListener("click", () => {
      logToMongoDB("Started Game");
      playMusic(backgroundMusic);
      showScene("welcome-screen", "guide-screen");
    });

    // Proceed to Firefly Scene
    proceedButton.addEventListener("click", () => {
      logToMongoDB("Proceeded to Firefly Scene");
      showScene("guide-screen", "scene-fireflies");

      // Fireflies animation duration
      setTimeout(() => {
        showScene("scene-fireflies", "about-us");
      }, 9000);
    });

    // Navigate to Hidden Clues from "About Us"
    aboutUsNextButton.addEventListener("click", () => {
      logToMongoDB("Navigated to Hidden Clues");
      showScene("about-us", "hidden-clues");
    });

    document.querySelectorAll(".clue-item").forEach((item) => {
      item.addEventListener("click", () => {
        const message = item.dataset.message;
        clueSound.play();

        document.getElementById("popup-message").textContent = message;
        document.getElementById("popup").style.display = "flex";

        item.classList.remove("glowing");
        item.style.opacity = "0.5";

        logToMongoDB(`Clue Selected: ${message}`);
      });
    });

    document.getElementById("close-popup").addEventListener("click", () => {
      document.getElementById("popup").style.display = "none";
    });

    cluesNextButton.addEventListener("click", () => {
      logToMongoDB("Proceeded from Clues");
      showScene("hidden-clues", "mini-game");
    });

    // Love Symbol Choices
    document.getElementById("flower-choice").addEventListener("click", () => handleChoice("🌹 lovely 🥰💕", "Flower"));
    document.getElementById("chocolate-choice").addEventListener("click", () => handleChoice("🔥cool 😎✨", "Chocolate"));
    document.getElementById("ring-choice").addEventListener("click", () => handleChoice("🤩😱 wwwooow! 😍🥰", "Ring"));
    document.getElementById("food-choice").addEventListener("click", () => handleChoice("damn! I knew this would happen 🤧🤧🤧", "Food"));

    function handleChoice(symbol, choiceName) {
      selectedSymbol.textContent = symbol;
      choiceResult.style.display = "block";
      logToMongoDB(`Symbol Chosen: ${choiceName}`);
    }

    nextSceneButton.addEventListener("click", () => {
      logToMongoDB("Proceeded to Proposal Scene");
      showScene("mini-game", "proposal-scene");
    });

    // Proposal Response
    proposalYesButton.addEventListener("click", () => {
      logToMongoDB("Proposal Accepted");
      stopMusic(backgroundMusic);
      playMusic(celebrationMusic);
      showScene("proposal-scene", "celebration-scene");
    });

    proposalThinkButton.addEventListener("click", () => {
      logToMongoDB("Proposal - Needs Time to Think");
      document.getElementById("proposal-think-message").textContent = "😩Awwwwwwww! not again!😢, Rabya. I'll always be here for you. ❤️";
      document.getElementById("proposal-think-popup").style.display = "flex";
    });

    document.getElementById("close-proposal-think-popup").addEventListener("click", () => {
      document.getElementById("proposal-think-popup").style.display = "none";
    });

    openGiftButton.addEventListener("click", () => {
      logToMongoDB("Opened Gift");
      giftSound.play();
      alert("Surprise! This is my love for you, wrapped in this special moment. 🎁");
    });

    // Easter Egg: Fireflies Clicking Interaction
    document.getElementById("fireflies").addEventListener("click", () => {
      logToMongoDB("Clicked on Fireflies");
      document.getElementById("fireflies-popup-message").textContent = "Did you know? These fireflies symbolize the little sparks of joy you bring into my life!";
      document.getElementById("fireflies-popup").style.display = "flex";
    });

    document.getElementById("close-fireflies-popup").addEventListener("click", () => {
      document.getElementById("fireflies-popup").style.display = "none";
    });

    document.getElementById("celebration-scene").addEventListener("click", () => {
      logToMongoDB("Clicked Celebration Scene");
      alert("This journey is only the beginning of a lifetime together. ❤️");
    });
  });





  document.addEventListener("DOMContentLoaded", () => {
    const numStars = 100; // Number of stars
    const body = document.body;

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      // Randomize star size and initial position
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;

      // Randomize animation duration and delay
      const duration = Math.random() * 5 + 3; // Between 3s to 8s
      const delay = Math.random() * 5; // Up to 5s delay
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;

      body.appendChild(star);

      // Remove star after animation to keep the DOM clean
      star.addEventListener("animationend", () => {
        body.removeChild(star);
      });
    }

    // Continuously add stars for infinite effect
    setInterval(() => {
      const star = document.createElement("div");
      star.classList.add("star");

      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `-5vh`; // Start above the viewport
      star.style.left = `${Math.random() * 100}vw`;

      const duration = Math.random() * 5 + 3;
      const delay = Math.random() * 5;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;

      body.appendChild(star);

      star.addEventListener("animationend", () => {
        body.removeChild(star);
      });
    }, 300); // Add a new star every 300ms
  });
