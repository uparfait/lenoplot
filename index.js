/**
 * This module defines the LENOPLOTBASE class, which facilitates the communication
 * with a WebSocket server to plot data on an  application. This connection
 * must be established before allowing the user to call the plot method.
 * 
 * The system relies on WebSocket communication to allow #connection apps to display graphs.
 * Make sure the app is allowed to connect to your network.
 */

// Import the WebSocketServer from the ws library to handle WebSocket connections
import {WebSocketServer} from "ws"  // Import WebSocketServer to handle WebSocket connections
import StartApp from "lenoplot/utils/runApp.js";  // Import the app starting utility function
import net from 'net'; // Import net to check port availability
let ws = null;

// Function to check availability of a port;
async function isPortAvailable() {
  let isPortAvailable = false;
  let PORT = Math.ceil(Math.random() * 8000) + 1000; // Random Port
  while(!isPortAvailable) {
       isPortAvailable = await new Promise(async (resolve, reject) => {
        const Tempserver = await net.createServer();
        Tempserver.on('error', (e)=> {
          const rand = Math.random();
          let L_PORT = PORT;
          let N_PORT = null;
          if(rand > 0.7) {
            PORT = Math.ceil(Math.random() * 8000) + 1000;
            N_PORT = PORT;
          } else {
            PORT++;
            N_PORT = PORT;
          }
          console.log(`> PORT :::${L_PORT} Already in use <---> let try :::${N_PORT}`);
          resolve(false);
        });
        Tempserver.listen(PORT, ()=> {
          Tempserver.close();
          resolve(true);
        });
      });
  }

  return PORT;

}

/**
 * LENOPLOTBASE class manages WebSocket connections and provides the `plot` method
 * to send graphing data to an  application.
 */

// The LENOPLOTBASE class is responsible for managing WebSocket connections and plotting data.
class LENOPLOTBASE {
  #events = {'error': null};
  #connection = null;
  constructor() {
    this.#startSocket(StartApp);
  }

  /**
   * Binds a handler function to the 'error' event. This handler will be called
   * whenever an error occurs in the system.
   * 
   * @param {String} event The event name (only 'error' is supported).
   * @param {Function} executer The callback function to handle the error event.
   * 
   * @throws {SyntaxError} If the event is not 'error' or the executer is not a function.
   */
  on(event, executer) {
    if (!event || !executer) {
      this.#throwError(
        "SyntaxError",
        "Event [error] and executer [function] must be provided!"
      );
    }
    if (String(event).toLocaleLowerCase() !== "error") {
      this.#throwError(
        "SyntaxError",
        `Only event allowed is 'error', not ${event}`
      );
    }
    if (String(typeof executer).toLocaleLowerCase() !== "function") {
      this.#throwError(
        "SyntaxError",
        `Executer must be type function but got ${[executer, typeof executer]}`
      );
    }

    this.#events["error"] = executer;  // Set the error handler
  }

  /**
   * Internal method to emit error events and terminate the application if needed.
   * 
   * @param {String} type Type of the error (e.g., 'SyntaxError', 'UncaughtException').
   * @param {String} message Error message to display.
   * @param {boolean} terminate If true, the application will exit with status 1 after emitting the error.
   */
  #emit(type, message, terminate) {
    this.#events["error"]({ type: type, message: message });  // Call the error handler
    if (terminate) process.exit(1);  // Exit the application with status code 1 if terminate is true
  }

  /**
   * Internal method to start the WebSocket server.
   * The WebSocket server listens on port 7 and allows an  application to connect.
   * 
   * @param {Function} startWindowApp Function to start the window application once the socket is ready.
   */
  async #startSocket(startWindowApp) {
    try {
      const availablePort = await isPortAvailable();
      ws = new WebSocketServer({ port: availablePort });  // Create WebSocket server on port 7
      ws.on("connection", (connection) => {  // Event listener when a connection is made
        this.#connection = connection;  // Store the connection
        this.#connection.on("close", () => {  // Handle socket closure
          this.#connection = null;  // Reset connection to null when it closes
        });
      });
      startWindowApp(availablePort);  // Start the window application
    } catch (e) {
      console.log(this);  // Log the current object for debugging
      this.#throwError("UncaughtException", e, true);  // Throw an error if something goes wrong
    }
  }

  /**
   * The plot method sends data and layout to the  application via WebSocket.
   * It waits for the WebSocket connection to be established before proceeding.
   * 
   * @param {Object} data Data to be plotted.
   * @param {Object} layout Layout settings for the plot.
   * 
   * @throws {SyntaxError} If data or layout is not provided.
   * @throws {UncaughtException} If WebSocket connection is not established within 10 attempts.
   */
  async plot(data, layout) {
    let counter = 1;  // Initialize retry counter
    // Wait until ws (WebSocket) is connected, retry for 10 times
    while (!this.#connection) {
      counter++;
      if (counter > 10) {
        this.#throwError(
          "UncaughtException",
          `> Maximum retry reached ${counter}. No connection found. Please allow network access to this app and try again.\n\n`,
          true
        );
      }

      await new Promise((r, _)=> {
        setTimeout(()=> {r()},1199);
      });
    }

    // Ensure both data and layout are provided
    if (!data || !layout) {
      this.#throwError("SyntaxError", "Both data and layout are required.", true);
    }

    // Send data to WebSocket if the connection is established
    if (this.#connection) {
      this.#connection.send(this.#JSON("plot", data, layout));  // Send plot data as JSON
    }
  }

  /**
   * Internal method to throw errors and either log them or terminate the app.
   * 
   * @param {String} type Type of error (e.g., 'SyntaxError', 'UncaughtException').
   * @param {*} message The error message.
   * @param {boolean} terminate Whether to terminate the application (default is false).
   * 
   * @throws Error if no error handler is set and termination is required.
   */
  #throwError(type, message, terminate = false) {
    if (!this.#events["error"]) {
      if (type === "UncaughtException") {
       console.log(message);
       process.exit(1);
      } else if (type === "SyntaxError") {
        console.log(message);
        process.exit(1);
      }
      if (terminate) process.exit(1);  // Exit the application if termination is requested
    } else {
      this.#emit(type, message, terminate);  // Emit the error event if handler is set
    }
  }

  /**
   * Internal method to convert data and layout into a JSON string format to be sent via WebSocket.
   * 
   * @param {string} event The event name (e.g., 'plot').
   * @param {*} data The data to plot.
   * @param {*} layout The layout for the plot.
   * 
   * @returns {string} The JSON string representation of the event, data, and layout.
   */
  #JSON(event, data, layout) {
    return JSON.stringify({
      event: event,
      data: data,
      layout: layout,
    });
  }
}

/**
 * Export the LENOPLOTBASE class as an instance, so it can be used for plotting in  applications.
 */
export const Lenoplot = new LENOPLOTBASE();  // Create an instance of LENOPLOTBASE