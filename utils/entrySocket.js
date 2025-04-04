import Controll from "lenoplot/main/mainApp.js";
import {WebSocket}  from "ws";
let ws = null;
const PORT = process.argv[2];
const url = `ws://localhost:${PORT}`;
async function connectWithRetry () {
  try {
    let MAX_TRY = 0;
    ws = new WebSocket(url);
    ws.on('error', solveError);
    const opened = () => {console.log(`> :::${PORT}\n`)}
    ws.on('open', (e)=> opened());
    const errorSolver = solveError;
    async function solveError() {
      console.log(`> Connection refused retrying...`);
     if(MAX_TRY < 9) {
      await new Promise((r, _)=> {
        setTimeout(()=> {r()},500);
      });
        ws = new WebSocket(url);
        ws.on('error', errorSolver);
        ws.on('open', (e)=> opened());
      }
      MAX_TRY++;
    }

  } catch (e) {
    console.log(e)
  }
}
connectWithRetry();

class LENOAPP {
  constructor() {
    this.mainApp =  Controll;
    this.ready = false;
    this.pending = false;
  }

  startConnectionStream() {
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.event === "plot") {
        LenoApp.plot(message.data, message.layout);
      } else if (message.event === "update") {
        LenoApp.update(message.data, message.layout);
      }
    };
  }

 async plot(data = null, layout = null) {
    if (!data || !layout) {
      throw new SyntaxError("All params are required.");
    }

    while(this.pending) {
      await new Promise((r,_)=>{
        setTimeout(() => {r()}, 100);
      });
    }
    this.pending = true;
    this.mainApp.startApp().then((_) => {
      this.mainApp.sendDiagramData(data, layout);
      this.pending = false;
    });
  }

  close() {
    if (!this.ready) {
      return console.warn(`Warning: There is no any insitance
               which is running run app.plot instead!`);
    }

    this.mainApp.closeApp();
    this.ready = false;
  }
}

const LenoApp = new LENOAPP();
LenoApp.startConnectionStream();