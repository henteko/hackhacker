import app from 'app'
import crashReporter from 'crash-reporter'
import MainWindow from './main-window'

export default class Application {
  constructor() {
    this.mainWindow = null;
  }

  onReady() {
    this.openMainWindow();
  }

  onWindowAllClosed() {
    if (process.platform != 'darwin') {
      app.quit();
    }
  }

  openMainWindow() {
    this.mainWindow = new MainWindow();
  }

  run() {
    this.startCrashReporter();
    app.on('window-all-closed', this.onWindowAllClosed.bind(this));
    app.on('ready', this.onReady.bind(this));
  }

  startCrashReporter() {
    crashReporter.start();
  }
}
