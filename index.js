const {
    app,
    BrowserWindow
} = require('electron');

app.on('ready', () => { //! controla la aplicacion y la inicializa (contenedor)
    let win = new BrowserWindow({
        width: 1400,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }

    }); //!BroswerWindow objeto que va para la ventana tam

    win.loadFile("./entrada.html"); //* con loadfile() -> se carga y manda a llamar el index 
    win.on('closed', () => {
        app.quit();
    });
})