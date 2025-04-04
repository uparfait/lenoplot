window.addEventListener("DOMContentLoaded", (_) => {
  const topHeaderBar = document.querySelector(".top-header");
  const platform = electron.platform;
  let numCounts = 0;
  let shaked = false;

  if (platform === "win32") {
    topHeaderBar.id = "win32";
  } else {
    topHeaderBar.id = "darwin";
  }
  const dataState = {
    data: null,
    layout: null,
  };

  function ShakeMainApp(app) {
    if (!(app.id === "flip")) {
      app.id = "filp";
      setTimeout((_) => (app.id = "_"), 500);
    }
  }

  const mainApp = document.querySelector(".main-app");
  const topLogo = document.querySelector("#face-top");
  const closeAppButton = document.querySelector("#closeApp");
  const maximizeBtn = document.querySelector("#maxApp");
  const minimizeAppBtn = document.querySelector("#minApp");
  const tuggleMinMaxIcon = maximizeBtn.querySelector("#m");

  const maximizeBtndar = document.querySelector("#maxAppdar");
  const minimizeAppBtndar = document.querySelector("#minAppdar");
  const closeAppButtondar = document.querySelector("#closeAppdar");

  let maxMized = false;

  if(!shaked) {
    ShakeMainApp(mainApp);
    shaked = !shaked;
  }

  mainApp.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    ShakeMainApp(mainApp);
  });

  mainApp.addEventListener("mousewheel", (event) => {
    event.preventDefault();
    ShakeMainApp(mainApp);
  });

  topLogo.addEventListener("click", (event) => {
    event.preventDefault();
    ShakeMainApp(mainApp);
  });

  closeAppButton.addEventListener("click", (_) => {
    ShakeMainApp(mainApp);
    electron.sendToBackend({ event: "close", data: null });
  });

  closeAppButtondar.addEventListener("click", (_) => {
    ShakeMainApp(mainApp);
    electron.sendToBackend({ event: "close", data: null });
  });

  maximizeBtn.addEventListener("click", (_) => {
    electron.sendToBackend({ event: "max-min", data: null });
    maxMized = !maxMized;
    tuggleMinMaxIcon.className = maxMized ? "bx bx-windows" : "bx bx-window";
  });

  maximizeBtndar.addEventListener("click", (_) => {
    electron.sendToBackend({ event: "max-min", data: null });
    maxMized = !maxMized;
    
    tuggleMinMaxIcon.className = maxMized ? "bx bx-windows" : "bx bx-window";
  });

  minimizeAppBtn.addEventListener("click", (_) => {
    electron.sendToBackend({ event: "minimize", data: null });
  });

  minimizeAppBtndar.addEventListener("click", (_) => {
    electron.sendToBackend({ event: "minimize", data: null });
  });

  window.electron?.messages((message) => {
    if (message.event === "drw") {
      dataState.data = message.data.data;
      dataState.layout = message.data.layout;
      numCounts++;
      document.querySelector('.num-counts').textContent = numCounts;
      Lenoplot(message.data.data, message.data.layout);
    } else if (message.event === "update-rz") {
      Lenoplot(dataState.data, dataState.layout);
    } else if (message.event === "update-dt") {
      dataState.data = message.data.data;
      dataState.layout = message.data.layout;
      Lenoplot(message.data.data, message.data.layout);
    }
  });

  function Lenoplot(data, layout) {
    try{
      Plotly.newPlot("bordered-space", data, layout);
      const unWantedPart = document.querySelector(".plotlyjsicon");
      if (unWantedPart) {
        unWantedPart.remove();
      }
    } catch(e) {
      electron.sendToBackend({ event: "drw-error", data: e });
      setTimeout(() => electron.sendToBackend({ event: "close", data: null }), 200);
    }
  }
});
