const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

const isMac = process.platform === "darwin";
const isWin = process.platform === "win32";

const isDevMod = process.env.NODE_ENV !== "development";

// Crea finestra principale
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Resizer",
    width: isDevMod ? 800 : 500,
    height: 600,
  });

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));

  // Apre i devtools se siamo in modalità development e non i nproduzione
  if (isDevMod) {
    mainWindow.webContents.openDevTools();
  }
}

// Quando l'app è pronta ad avviarsi
app
  .whenReady()
  .then(() => {
    createMainWindow();

    // Implementa il menu custom
    const mainMenu = Menu.buildFromTemplate(menu);

    Menu.setApplicationMenu(mainMenu);
    // Controllo se non ci sono finestre, la window principale verrà renderizzata
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows.length === 0) {
        createMainWindow();
      }
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

// Menu template
const menu = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
        Accelerator: "CmdOrCtrl+W",
      },
    ],
  },
];
// Controllo per Mac, se tutte le finestre sono chiuse l'applicazione verrà spenta solo se non si è su Mac (win o linux)
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
