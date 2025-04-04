const electron = require("electron");

// Exposing functionality from the Electron main process to the renderer process
// This is done through the contextBridge to provide a secure way to communicate between processes
electron.contextBridge.exposeInMainWorld("electron", {
  
  // The 'messages' function listens for the 'message-to-frontend' event from the main process
  // When the event is received, it invokes the provided callback function with the data from the main process
  messages: (callback) => {
    // Listening for the 'message-to-frontend' event
    electron.ipcRenderer.on("message-to-frontend", (_, data) => {
      // When the event is received, call the callback with the received data
      callback(data);
    });
  },

  // The 'platform' property exposes the current platform (e.g., 'darwin', 'win32', 'linux')
  // This is a standard Node.js property used to get the operating system's platform
  platform: process.platform,

  // The 'sendToBackend' function sends data to the main process by emitting the 'message-to-backend' event
  // This allows the renderer process to send data to the main process for further processing
  sendToBackend: (data) => {
    // Sending a message to the main process using the 'message-to-backend' event
    electron.ipcRenderer.send('message-to-backend', data);
  },
});
