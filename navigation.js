const memoryMenu = document.querySelector(".memory-menu");
const memoryButton = document.querySelector(".memory-toggle");

if (memoryMenu && memoryButton) {
  memoryButton.addEventListener("click", () => {
    memoryMenu.classList.toggle("open");
  });
}
