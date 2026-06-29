const openButton = document.getElementById("openAlbum");
const cover = document.getElementById("cover");

if (openButton) {
  openButton.addEventListener("click", () => {
    cover.classList.add("open");
  });
}

let album = {};

let years = [];

let current = 0;

const grid = document.getElementById("photoGrid");

const yearTitle = document.getElementById("yearTitle");

const storyText = document.getElementById("storyText");

fetch("family.json")
  .then((response) => response.json())

  .then((data) => {
    album = data;

    years = Object.keys(data);

    loadYear();
  });

function loadYear() {
  let year = years[current];

  let data = album[year];

  yearTitle.textContent = data.title;

  storyText.textContent = data.text;

  grid.innerHTML = "";

  data.photos.forEach((photo) => {
    let img = document.createElement("img");

    img.src = photo;

    grid.appendChild(img);
  });
}

const next = document.getElementById("nextYear");

const prev = document.getElementById("prevYear");

if (next) {
  next.addEventListener("click", () => {
    if (current < years.length - 1) {
      current++;

      loadYear();
    }
  });
}

if (prev) {
  prev.addEventListener("click", () => {
    if (current > 0) {
      current--;

      loadYear();
    }
  });
}
