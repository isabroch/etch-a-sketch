document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#reset").addEventListener("click", resetBoard);
  createBoard(16);
});

function colorPixel(el, style) {
  let color = "black";

  if (style === "random") {
    function randColor() {
      return Math.floor(Math.random() * 256);
    }
    color = `rgb(${randColor()}, ${randColor()}, ${randColor()})`;
  }

  if (style === "shading") {
    const colorVar = el.style.getPropertyValue("--color");
    if (colorVar) {
      const alpha = Number(colorVar.replace(/rgba\(.*,([\d\.]*)\)/, "$1")) || 0;
      color = `rgba(0,0,0,${Math.min(alpha + 0.1, 1)})`;
    } else {
      color = `rgba(0,0,0,0.1)`;
    }
  }

  el.style.setProperty("--color", color);
}

function createBoard(sides) {
  let style = document.querySelector('input[name="colorOption"]:checked').value;

  document.querySelector('#coloringStyle').addEventListener("change", (e) => {
    style = e.target.value;
  });

  const pixelContainer = document.querySelector(".pixelContainer");
  pixelContainer.style.setProperty("--sides", sides);

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < sides * sides; i++) {
    const pixel = document.createElement("div");
    pixel.className = "pixel";
    pixel.addEventListener("mouseenter", (e) =>
      colorPixel(e.target, style)
    );
    fragment.appendChild(pixel);
  }

  pixelContainer.replaceChildren(fragment);
}

function resetBoard() {
  const input = prompt("Enter new size under 64", 16);
  if (input === null) {
    return;
  }
  const sides = parseInt(input, 10);
  if (input == "" || sides < 1 || sides > 64) {
    alert("Must enter a number between 1-64");
    resetBoard();
    return;
  }

  createBoard(sides);
}
