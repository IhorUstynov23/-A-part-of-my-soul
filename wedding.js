const photos = document.querySelectorAll(".photo-wrapper");
const container = document.querySelector(".heart-container");
const text = document.querySelector(".love-text");

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// Функция координат сердца
function heartPosition(t) {
  const scale = 18;

  const x = scale * 16 * Math.pow(Math.sin(t), 3);

  const y =
    -scale *
    (13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t));

  return {
    x,
    y,
  };
}

// стартовая позиция
photos.forEach((photo, index) => {
  photo.style.position = "absolute";

  // случайный разброс
  const randomX = Math.random() * window.innerWidth - window.innerWidth / 2;
  const randomY = Math.random() * window.innerHeight - window.innerHeight / 2;

  const rotate = Math.random() * 60 - 30;

  photo.style.transform = `
    translate(${randomX}px,${randomY}px)
    rotate(${rotate}deg)
    `;

  photo.style.transition = `
    transform 2s cubic-bezier(.68,-0.55,.27,1.55)
    `;
});

// через 2 секунды собираем сердце

setTimeout(() => {
  photos.forEach((photo, index) => {
    const t = Math.PI * 2 * (index / photos.length);

    const scale = 15;

    const x = scale * 16 * Math.pow(Math.sin(t), 3);

    const y =
      -scale *
      (13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t));

    photo.style.left = "50%";
    photo.style.top = "50%";

    photo.style.transform = `
        translate(
        calc(-50% + ${x}px),
        calc(-50% + ${y}px)
        )
        rotate(${Math.random() * 20 - 10}deg)
        `;
  });

  setTimeout(() => {
    text.classList.add("show");
    container.classList.add("pulse");
  }, 2800);
}, 2000);
const openLetter = document.getElementById("openLetter");

const letter = document.getElementById("letter");

const closeLetter = document.getElementById("closeLetter");

openLetter.onclick = () => {
  letter.classList.add("active");
};

closeLetter.onclick = () => {
  letter.classList.remove("active");
};