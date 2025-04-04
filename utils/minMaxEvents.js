let max = false;
function respondEvent(data, main) {

    function Redraw() {
      main.webContents.send("message-to-frontend", {
        event: "update-rz",
        data: null,
      });
    }

  if (data.event === "close") {
    main.close();
  } else if (data.event === "max-min") {
    max ? main.unmaximize() : main.maximize();
    max = !max;
    Redraw();
  } else if (data.event === "minimize") {
    main.minimize();
    Redraw();
  } else if(data.event === 'drw-error') {
    const e = String(data.data);
    console.log(e)
    process.exit('SIGINT')
  }
}

export default respondEvent;