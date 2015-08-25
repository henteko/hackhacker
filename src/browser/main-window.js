import BrowserWindow from 'browser-window'

export default class MainWindow {
  constructor() {
    this.window = new BrowserWindow({ width: 600, height: 400 });
    this.window.loadUrl(`file://${__dirname}/../renderer/index.html`);
    this.window.on('closed', () => {
      this.window = null;
    });
  }
}
