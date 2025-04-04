import { app, BrowserWindow, screen, ipcMain } from "electron";
import path from "node:path";
import respondEvent from "../utils/minMaxEvents.js";

app.setMaxListeners = 9e3;
process.env.ELECTRON_DISABLE_CRASH_REPORTS = "false";
process.on("uncaughtException", (error, origin) => {
  console.log(error);
  process.exit(1);
});
process.on("unhandledRejection", (error, origin) => {
  console.log(error);
  process.exit(1);
});
process.on("uncaughtExceptionMonitor", (error, origin) => {
  console.log(error);
  process.exit(1);
});

function MainWindow(_) {

  let DEFAULT_SCREEN_SIZE = screen.getPrimaryDisplay();
  let WINDOW_WIDTH = DEFAULT_SCREEN_SIZE.size.width;
  let WINDOW_HEIGHT = DEFAULT_SCREEN_SIZE.size.height;

  const appStart100w = 45;
  const appStart100h = 70;

  let width = Math.floor((appStart100w * WINDOW_WIDTH) / 100);
  let height = Math.floor((appStart100h * WINDOW_HEIGHT) / 100);

  const window = new BrowserWindow({
    acceptFirstMouse: true,
    autoHideMenuBar: true,
    alwaysOnTop: false,
    backgroundColor: "#00000000",
    height: height,
    minWidth: width - 50,
    minHeight: height - 50,
    width: width,
    webPreferences: {
      preload: path.resolve(import.meta.dirname, "../utils/talk.js"),
      nodeIntegration: true,
      devTools: false,
      contextIsolation: true,
      sandbox: true,
    },
    center: true,
    hasShadow: true,
    title: "Lenoplot",
    focusable: true,
    titleBarOverlay: "Lenoplot",
    transparent: true,
    icon: path.resolve(import.meta.dirname, "../assets/icon.png"),
    frame: false,
    darkTheme: false,
  });

  window.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [""],
        },
      });
    }
  );

  window.webContents.on("devtools-opened", () => {
    window.webContents.closeDevTools();
    window.webContents.devToolsWebContents?.close();
  });

  window.webContents.on("before-input-event", (event, input) => {
    event.preventDefault();
  });

  return window;
}

class AppControl {
  constructor() {
    this.app = app;
    this.mainScreen = null;
    this.appReady = false;
  }

  async startApp() {
    if (this.appReady) {
      return 200;
    }

    return await new Promise((resolve, _) => {
      this.app.whenReady().then(async (_) => {
        await this.runApp();
        resolve("Ok");
      });
    });
  }

  async runApp() {
    if (!this.app.isReady()) {
      throw "Run app can not bet called before start app";
    }
    this.appReady = true;
    this.mainScreen = MainWindow();
    await this.mainScreen.loadFile("../public/index.html");
    this.mainScreen.webContents.closeDevTools();
    this.mainScreen.on("resize", (_, __) => {
      this.mainScreen.webContents.send("message-to-frontend", {
        event: "update-rz",
        data: null,
      });
    });

    this.mainScreen.on("resized", (_, __) => {
      this.mainScreen.webContents.send("message-to-frontend", {
        event: "update-rz",
        data: null,
      });
    });

    ipcMain.on("unCaughtException", () => {});
    ipcMain.on("uncaughtexception", () => {});
    app.on("unCaughtException", () => {});
    app.on("uncaughtexception", () => {});
    ipcMain.on("message-to-backend", (_, data) => {
      respondEvent(data, this.mainScreen, this.app);
    });
    return "Ok";
  }

  sendDiagramData(data, layout) {
    if (!this.appReady) {
      return 404;
    }

    try {
      this.mainScreen.webContents.send("message-to-frontend", {
        event: "drw",
        data: {
          data: data,
          layout: layout,
        },
      });
    } catch (e) {}
  }

  closeApp() {
    if (process.platform !== "darwin") {
      this.app.quit();
    } else {
      this.app.exit();
    }
  }
}

export default new AppControl();
