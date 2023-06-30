const form = document.querySelector("#img-form");
const img = document.querySelector("#img");
const outputPath = document.querySelector("#output-path");
const filename = document.querySelector("#filename");
const heightInput = document.querySelector("#height");
const widthInput = document.querySelector("#width");

// Carica un immagine
function loadImage(e) {
  // Primo item di un Array

  const file = e.target.files[0];

  // Check if file is an image
  if (!isFileImage(file)) {
    alertError("Non è un immagine, cretino");
    return;
  }
  console.log("ok");
}

// Controlla se è un immagine
function isFileImage(file) {
  const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
  return file && acceptedImageTypes.includes(file["type"]);
}

img.addEventListener("change", loadImage);

// 36:00
