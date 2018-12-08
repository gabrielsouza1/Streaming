const { app, BrowserWindow } = require('electron');
let win;
const appUrl = `file://${__dirname}/index.html`;

function createElectronShell(){
	win = new BrowserWindow({
		width: 800,
		height: 600
	});
	win.loadURL(appUrl);
	win.webContents.openDevTools();
	win.on('closed', () => {
		win = null;
	})
}

app.on('ready', createElectronShell);

app.on('window-all-closed', () => {
	if(process.platform !== 'darwin'){
		app.quit();
	}
});

app.on('active', () => {
	if(app === null){
		createElectronShell();
	}
});