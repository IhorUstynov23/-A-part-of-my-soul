document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.getElementById("viewer");
  const viewerImage = document.getElementById("viewerImage");
  const closeViewer = document.getElementById("viewerClose");

  if (!viewer) {
    console.log("viewer не найден");
    return;
  }

  let photos = [];

  let current = 0;

  let rotation = 0;

  // ловим клик по любому фото на странице

  document.addEventListener("click", (e) => {
    const img = e.target.closest("img");

    if (!img) return;

    // чтобы не открывалось само большое фото

    if (img.id === "viewerImage") return;

    console.log("открываем:", img.src);

    photos = Array.from(document.querySelectorAll("img"))
      .filter((i) => i.id !== "viewerImage")
      .map((i) => i.src);

    current = photos.indexOf(img.src);

    rotation = 0;

    viewerImage.src = img.src;

    viewerImage.style.transform = "rotate(0deg)";

    viewer.classList.add("active");
  });

  closeViewer.onclick = () => {
    viewer.classList.remove("active");
  };

  document.getElementById("nextPhoto").onclick = () => {
    if (current < photos.length - 1) {
      current++;

      viewerImage.src = photos[current];
    }
  };

  document.getElementById("prevPhoto").onclick = () => {
    if (current > 0) {
      current--;

      viewerImage.src = photos[current];
    }
  };

  document.getElementById("rotateRight").onclick = () => {
    rotation += 90;

    viewerImage.style.transform = `rotate(${rotation}deg)`;
  };

  document.getElementById("rotateLeft").onclick = () => {
    rotation -= 90;

    viewerImage.style.transform = `rotate(${rotation}deg)`;
  };
});
viewer.addEventListener("click", (e) => {
  if (e.target === viewer) {
    viewer.classList.remove("active");
  }
});
document.addEventListener("keydown", (e) => {
  if (!viewer.classList.contains("active")) return;

  if (e.key === "Escape") {
    viewer.classList.remove("active");
  }

  if (e.key === "ArrowRight") {
    document.getElementById("nextPhoto").click();
  }

  if (e.key === "ArrowLeft") {
    document.getElementById("prevPhoto").click();
  }
});