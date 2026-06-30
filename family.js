const openButton = document.getElementById("openAlbum");
const cover = document.getElementById("cover");

if (openButton && cover) {
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

    // сортировка годов

    years = Object.keys(data).sort((a, b) => a - b);

    console.log(years);

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

    img.addEventListener("click", () => {
      openViewer(photo);
    });

    grid.appendChild(img);
  });
}

// =======================
// ПЕРЕЛИСТЫВАНИЕ АЛЬБОМА
// =======================

const next = document.getElementById("nextYear");

const prev = document.getElementById("prevYear");

const page = document.querySelector(".album-content");

if (next) {
  next.onclick = () => {
    if (current < years.length - 1) {
      page.classList.add("turn-next");

      setTimeout(() => {
        current++;

        loadYear();

        page.classList.remove("turn-next");
      }, 400);
    }
  };
}

if (prev) {
  prev.onclick = () => {
    if (current > 0) {
      page.classList.add("turn-prev");

      setTimeout(() => {
        current--;

        loadYear();

        page.classList.remove("turn-prev");
      }, 400);
    }
  };
}

// =======================
// ПРОСМОТР ФОТО
// =======================

const viewer = document.getElementById("viewer");

const viewerImage = document.getElementById("viewerImage");

const closeViewer = document.getElementById("viewerClose");

let photos = [];

let viewerIndex = 0;

function openViewer(photo) {
  photos = album[years[current]].photos;

  viewerIndex = photos.indexOf(photo);

  viewerImage.src = photo;

  viewer.classList.add("active");
}

if (closeViewer) {
  closeViewer.onclick = () => {
    viewer.classList.remove("active");
  };
}

const nextPhoto = document.getElementById("nextPhoto");

const prevPhoto = document.getElementById("prevPhoto");

if (nextPhoto) {
  nextPhoto.onclick = () => {
    if (viewerIndex < photos.length - 1) {
      viewerIndex++;

      viewerImage.src = photos[viewerIndex];
    }
  };
}

if (prevPhoto) {
  prevPhoto.onclick = () => {
    if (viewerIndex > 0) {
      viewerIndex--;

      viewerImage.src = photos[viewerIndex];
    }
  };
}

// =======================
// ПОВОРОТ ФОТО
// =======================

let rotation = 0;

const rotateRight = document.getElementById("rotateRight");

const rotateLeft = document.getElementById("rotateLeft");

if (rotateRight) {
  rotateRight.onclick = () => {
    rotation += 90;

    viewerImage.style.transform = `rotate(${rotation}deg)`;
  };
}

if (rotateLeft) {
  rotateLeft.onclick = () => {
    rotation -= 90;

    viewerImage.style.transform = `rotate(${rotation}deg)`;
  };
}
