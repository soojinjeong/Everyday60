//Load external HTML content into the main page structure
fetch("components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
});

fetch("components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
});

// Load the overlay menu and highlight current active link
fetch("components/overlay.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("overlay-container").innerHTML = data;

    const currentPath = window.location.pathname.split("/").pop();
    const overlayLinks = document.querySelectorAll("#overlay-menu .menu2 a");

    overlayLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href === currentPath) {
        link.classList.add("active-link");
      }
  });
});

// Load seasonal menu into placeholder container
fetch('components/seasonal-menu.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('seasonal-menu-placeholder').innerHTML = data;
});

// Load chatbot UI
fetch("components/chatbot.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("chatbot-container").innerHTML = data;
});

// Overlay menu open animation
function openOverlay() {
  const overlay = document.getElementById("overlay-menu");
  const layout = overlay.querySelector(".page-layout");
  
  document.body.style.overflow = "hidden";
  
  overlay.style.display = "block";
  overlay.style.opacity = "0";
  layout.style.transform = "translateX(-10%)";
  
  requestAnimationFrame(() => {
    overlay.style.transition = "opacity 0.8s ease";
    overlay.style.opacity = "1";
  
    layout.style.transition = "transform 0.8s ease";
    layout.style.transform = "translateX(0)";
  });
}

// Overlay menu close animation
function closeOverlay() {
  const overlay = document.getElementById("overlay-menu");
  const layout = overlay.querySelector(".page-layout");
  
  overlay.style.opacity = "0";
  layout.style.transform = "translateX(-10%)";
  document.body.style.overflow = "";
  
  setTimeout(() => {
    overlay.style.display = "none";
  }, 800);
}

// Reveal animation when elements enter viewport
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    reveals.forEach(reveal => {
      observer.observe(reveal);
    });
});

// Cake slideshow for main image banner
document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("cakeImage");

  const cakeImages = [ //Array of images URLs
    "https://freight.cargo.site/t/original/i/C2104879694705208486813343955560/DB41140C-487B-4379-933D-21EA8753BB3D.jpg",
    "https://freight.cargo.site/t/original/i/Y2104879694742101974960763058792/IMG_9050.jpeg",
    "https://freight.cargo.site/t/original/i/Z2104879694428507325707700681320/IMG_0136.jpeg",
    "https://freight.cargo.site/t/original/i/M2104879128759100305404300376680/IMG_5467.JPG",
    "https://freight.cargo.site/t/original/i/D2104879128814440537625429031528/IMG_9040.jpeg",
    "https://freight.cargo.site/t/original/i/H2104879128777547049478009928296/537732E8-F8ED-41AA-82FC-D6A1CAE0B85B.jpg"
  ];

  let currentCake = 0;

  function showCake(index) {
    if (!img) return;
    img.style.opacity = 0;

    setTimeout(() => {
      img.src = cakeImages[index];
      img.style.opacity = 1;
    }, 500);
  }

  function nextCake() {
    currentCake = (currentCake + 1) % cakeImages.length;
    showCake(currentCake);
  }

  function prevCake() {
    currentCake = (currentCake - 1 + cakeImages.length) % cakeImages.length;
    showCake(currentCake);
  }

  showCake(currentCake);
  setInterval(nextCake, 5000);

  window.nextCake = nextCake;
  window.prevCake = prevCake;
});

// Add hover effect to product images (desktop only)
document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth <= 800; // Not working in mobile version
  if (isMobile) return;

  const hoverableImages = document.querySelectorAll(".hoverable-image img");

  hoverableImages.forEach(originalImg => {
    const hoverSrc = originalImg.getAttribute("data-hover");
    if (!hoverSrc) return;

    const hoverImg = document.createElement("img");
    hoverImg.src = hoverSrc;
    hoverImg.alt = originalImg.alt + " hover";
    //Styling
    hoverImg.style.position = "absolute";
    hoverImg.style.top = "0";
    hoverImg.style.left = "0";
    hoverImg.style.width = "100%";
    hoverImg.style.height = "989.88px";
    hoverImg.style.objectFit = "cover";
    hoverImg.style.borderRadius = originalImg.style.borderRadius || "0.8rem";
    hoverImg.style.opacity = "0";
    hoverImg.style.transition = "opacity 0.3s ease";
    hoverImg.style.zIndex = "2";
    hoverImg.style.pointerEvents = "none";

    const parent = originalImg.parentElement;
    parent.style.position = "relative";
    parent.appendChild(hoverImg);

    parent.addEventListener("mouseenter", () => {
      hoverImg.style.opacity = "1";
    });

    parent.addEventListener("mouseleave", () => {
      hoverImg.style.opacity = "0";
    });
  });
});

// Add hover effect to product images (desktop only)
document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth <= 800;
  if (isMobile) return;

  const hoverableImages = document.querySelectorAll(".hoverable-image-600 img");

  hoverableImages.forEach(originalImg => {
    const hoverSrc = originalImg.getAttribute("data-hover");
    if (!hoverSrc) return;

    const hoverImg = document.createElement("img");
    hoverImg.src = hoverSrc;
    hoverImg.alt = originalImg.alt + " hover";
    hoverImg.style.position = "absolute";
    hoverImg.style.top = "0";
    hoverImg.style.left = "0";
    hoverImg.style.width = "100%";
    hoverImg.style.maxHeight = "600px";
    hoverImg.style.objectFit = "cover";
    hoverImg.style.borderRadius = originalImg.style.borderRadius || "0.8rem";
    hoverImg.style.opacity = "0";
    hoverImg.style.transition = "opacity 0.3s ease";
    hoverImg.style.zIndex = "2";
    hoverImg.style.pointerEvents = "none";

    const parent = originalImg.parentElement;
    parent.style.position = "relative";
    parent.appendChild(hoverImg);

    parent.addEventListener("mouseenter", () => {
      hoverImg.style.opacity = "1";
    });

    parent.addEventListener("mouseleave", () => {
      hoverImg.style.opacity = "0";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const img2 = document.getElementById("cakeImage2");

  const cakeImages2 = [
    "https://freight.cargo.site/t/original/i/E2104949206187395640988482157160/10.png",
    "https://freight.cargo.site/t/original/i/N2104949206205842385062191708776/11.png",
    "https://freight.cargo.site/t/original/i/E2104949206224289129135901260392/12.png"
  ];

  let currentCake2 = 0;

  function showCake2(index) {
    if (!img2) return;
    img2.style.opacity = 0;

    setTimeout(() => {
      img2.src = cakeImages2[index];
      img2.style.opacity = 1;
    }, 300);
  }

  function nextCake2() {
    currentCake2 = (currentCake2 + 1) % cakeImages2.length;
    showCake2(currentCake2);
  }

  function prevCake2() {
    currentCake2 = (currentCake2 - 1 + cakeImages2.length) % cakeImages2.length;
    showCake2(currentCake2);
  }

  showCake2(currentCake2);
  setInterval(nextCake2, 5000);

  window.nextCake2 = nextCake2;
  window.prevCake2 = prevCake2;
});

// Reservation time options generator
document.addEventListener("DOMContentLoaded", () => {
  const timeSelect = document.getElementById("time");
  const start = 7 * 60; // 07:00
  const end = 20 * 60 + 30; // 20:30

  for (let m = start; m <= end; m += 15) {
    const h = String(Math.floor(m / 60)).padStart(2, '0');
    const min = String(m % 60).padStart(2, '0');
    const t = `${h}:${min}`;
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    timeSelect.appendChild(opt);
  }
});

// Ser color of dropdown if nothing is selected
document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("seating");

  if (select.value === "") {
    select.style.color = "#888888";
  }

  select.addEventListener("change", function () {
    if (this.value === "") {
      this.style.color = "#888888";
    } else {
      this.style.color = "#000";
    }
  });
});

// Chat system toggle
function toggleChat() {
  const chatPopup = document.getElementById("chatPopup");
  chatPopup.style.display = chatPopup.style.display === "flex" ? "none" : "flex";
}

// Append user message to chatbot window
function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (message === "") return;

  const chatBody = document.getElementById("chatBody");
  const messageDiv = document.createElement("div");

  messageDiv.textContent = message;
  //Message bubble styling
  messageDiv.style.display = "inline-block";         
  messageDiv.style.backgroundColor = "#fff";
  messageDiv.style.borderRadius = "1rem";
  messageDiv.style.padding = "0.5rem 0.75rem";
  messageDiv.style.margin = "0.2rem";          
  messageDiv.style.float = "right";            
  messageDiv.style.clear = "both";        
  messageDiv.style.color = "#333";
  chatBody.appendChild(messageDiv);

  input.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;
}

//Enable sending message via Enter key
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("chatInput");
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();  
      sendMessage();      
    }
  });
});

//Reservation form submission with custom rules
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".reservation-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
    
      const dateValue = document.querySelector("#date").value;
      const timeValue = document.querySelector("#time").value;
      const selectedDate = new Date(dateValue);
      const dayOfWeek = selectedDate.getDay();
      const today = new Date();

      // Prevent past dates
      if (selectedDate < today.setHours(0, 0, 0, 0)) {
        alert("You cannot reserve a date in the past.");
        return;
      }      
    
      // Reservation impossible on Mon
      if (dayOfWeek === 1) {
        alert("We are closed on Mondays. Please choose another date.");
        return;
      }
    
      // Limit time on Sun (09:00 ~ 17:00)
      if (dayOfWeek === 0) {
        const [hour, minute] = timeValue.split(":").map(Number);
        const totalMinutes = hour * 60 + minute;
    
        const opening = 9 * 60;    // 09:00
        const closing = 17 * 60;   // 17:00 
    
        if (totalMinutes < opening || totalMinutes > closing) {
          alert("On Sundays, reservations are available only from 09:00 to 17:00.");
          return;
        }
      }

      //Prevent past times on the same day
      const isToday =
        selectedDate.getFullYear() === today.getFullYear() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getDate() === today.getDate();
    
      if (isToday) {
        const [selectedHour, selectedMinute] = timeValue.split(":").map(Number);
        const selectedMinutes = selectedHour * 60 + selectedMinute;
    
        const nowMinutes = today.getHours() * 60 + today.getMinutes();
    
        if (selectedMinutes <= nowMinutes) {
          alert("You cannot reserve a time in the past.");
          return;
        }
      }    
    
      // Prepare reservation data
      const data = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        phone: document.querySelector("#phone").value,
        guests: document.querySelector("#guests").value,
        date: dateValue,
        time: timeValue,
        seating: document.querySelector("#seating").value,
        notes: document.querySelector("#notes").value
      };
    
      // Send data to server
      try {
        const response = await fetch("http://localhost:3000/reserve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
    
        if (response.ok) {
          alert("Your reservation is ready to confirm!");
        } else {
          alert("Your reservation is failed.");
        }
      } catch (error) {
        alert("Server error.");
        console.error(error);
      }
    });
  }
});