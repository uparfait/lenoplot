import path from 'path'
import { spawn } from 'child_process';

export default async function StartApp(PORT) {

  const AppRunner = path.resolve(import.meta.dirname, "../dist/electron.exe");
  const child = await spawn(
    AppRunner,
    [path.resolve(import.meta.dirname, "../utils/entrySocket.js"), PORT],
    { stdio: "inherit", windowsHide: false }
  );
  child.on("close", function (code, signal) {
    if(signal === 'SIGINT') {
      process.exit(0);
    }
    process.exit(0);
  });

  const handleTerminationSignal = function (signal) {
    process.on(signal, function signalHandler() {
      if (!child.killed) {
        child.kill(signal);
      }
    });
  };

  handleTerminationSignal("SIGINT");
  handleTerminationSignal("SIGTERM");

  return AppRunner;
}
