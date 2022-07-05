const{app, BrowserWindow} = require('electron');

app.on('ready' ,() => {//! controla la aplicacion y la inicializa (contenedor)
    let win = new BrowserWindow({width: 800, height: 600,
    webPreferences:{
    nodeIntegration:true,
    contextIsolation: false
}

    });//!BroswerWindow objeto que va para la ventana tam
    
    win.loadFile("../../HTML/entrada.html");//* con loadfile() -> se carga y manda a llamar el index 
    win.on('closed',() => {
        win = null;
        app.quit();
    });
})
