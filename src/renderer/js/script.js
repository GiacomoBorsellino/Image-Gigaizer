const form = document.querySelector("#img-form");
const img = document.querySelector("#img");
const outputPath = document.querySelector("#output-path");
const filename = document.querySelector("#filename");
const heightInput = document.querySelector("#height");
const widthInput = document.querySelector("#width");

// console.log(versions.node());
// console.log(os.homedir());

// Carica un immagine
function loadImage(e) {
  // Primo item di un Array

  const file = e.target.files[0];

  // Check if file is an image
  if (!isFileImage(file)) {
    console.log("Non è un immagine, cretino");
    alertError("Non è un immagine, ritenta");
    return;
  }

  // Ottieni dimensioni originali immagine
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function () {
    (widthInput.value = this.width), (heightInput.value = this.height);
  };

  //  Visualizza il form per inserire W e H
  form.style.display = "block";
  filename.innerText = file.name;

  // Mettere il path delloutput
  outputPath.innerText = path.join(os.homedir(), "imageresizer");
}

// Invio immagine in main process per il resize
function resizeImage(e) {
  e.preventDefault();
  const imgPath = img.files[0].path;
  const width = widthInput.value;
  const height = heightInput.value;

  if (!img.files[0]) {
    alertError("Per favore carica un immagine");
    return;
  }

  if (widthInput.value === "" || heightInput.value === "") {
    alertError("Per favore inserisci delle dimensioni");
    return;
  }

  ipcRenderer.send("image:resize", {
    imgPath,
    height,
    width,
  });
}

// Ascolto successo caricamento immagine
ipcRenderer.on("image:done", () => {
  alertSuccess("Immagine convertita correttamtne");
});

// Controlla se è un immagine
function isFileImage(file) {
  const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
  return file && acceptedImageTypes.includes(file["type"]);
}

// Alert per controllare se c'è un successo
function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "rgb(21 128 61)",
      color: "white",
      textAlign: "center",
    },
  });
}

// Alert per controllare se c'è un errore
function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "rgb(190 18 60)",
      color: "white",
      textAlign: "center",
    },
  });
}

// File selezione
img.addEventListener("change", loadImage);
// Form invio file
form.addEventListener("submit", resizeImage);
