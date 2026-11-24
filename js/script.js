(() => {
  const page = document.body.dataset.page;

  // 第一幕：打字完成後自動前往第二幕。
  if (page === "loading") {
    const target = document.getElementById("loadingText");
    const hint = document.getElementById("loadingHint");
    const message = "Loading...";
    let index = 0;
    const speed = 115;

    // 若載入頁必要元素不存在，直接進入第二頁，避免停在黑畫面。
    if (!target || !hint) {
      window.location.replace(new URL("./start.html", document.baseURI).href);
    } else {
      function typeNext() {
        target.innerHTML = `${message.slice(0, index)}<span class="cursor">|</span>`;
        if (index < message.length) {
          index += 1;
          window.setTimeout(typeNext, speed);
        } else {
          hint.textContent = "WELCOME";
          window.setTimeout(() => {
            // replace 避免按瀏覽器上一頁時重新回到 Loading。
            window.location.replace(
              new URL("./start.html", document.baseURI).href,
            );
          }, 650);
        }
      }

      window.setTimeout(typeNext, 280);
    }
  }

  // 第三幕：Carousel，可用箭頭、圓點、鍵盤及手機滑動操作。
  if (page === "choose") {
    const track = document.getElementById("carouselTrack");
    const slides = Array.from(document.querySelectorAll(".nose-slide"));
    const dotsContainer = document.getElementById("carouselDots");
    const previous = document.querySelector(".carousel-arrow.previous");
    const next = document.querySelector(".carousel-arrow.next");
    const count = document.getElementById("slideCount");
    const selectedName = document.getElementById("selectedName");
    const selectButton = document.getElementById("selectButton");
    const message = document.getElementById("selectionMessage");
    const windowEl = document.querySelector(".carousel-window");
    let current = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `切換到第 ${index + 1} 個選項`);
      dot.addEventListener("click", () => showSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll(".carousel-dot"));

    function showSlide(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      slides.forEach((slide, i) => {
        slide.setAttribute("aria-hidden", i === current ? "false" : "true");
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
        dot.setAttribute("aria-current", i === current ? "true" : "false");
      });
      const number = String(current + 1).padStart(2, "0");
      count.textContent = `${number} / ${String(slides.length).padStart(2, "0")}`;
      selectedName.textContent = slides[current].dataset.name;
      message.textContent = "";
    }

    previous.addEventListener("click", () => showSlide(current - 1));
    next.addEventListener("click", () => showSlide(current + 1));
    selectButton.addEventListener("click", () => {
      message.textContent = `已選擇「${slides[current].dataset.name}」！`;
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") showSlide(current - 1);
      if (event.key === "ArrowRight") showSlide(current + 1);
    });

    windowEl.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true },
    );
    windowEl.addEventListener(
      "touchend",
      (event) => {
        touchEndX = event.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 45)
          showSlide(current + (difference > 0 ? 1 : -1));
      },
      { passive: true },
    );

    showSlide(0);
  }
})();
