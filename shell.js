const path = require('path')
const http = require('http')
const fs = require('fs')
const net = require('net')
const electron = require('electron')
const log = require('electron-log')
const { autoUpdater } = require('electron-updater')

// Config log

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting...')

// Find port

const findPort = (port) =>
  new Promise((resolve) => {
    if (port > 11000) process.exit(1)
    const testServer = net.createServer().listen(port)
    testServer.on('listening', () => {
      testServer.close((err) => {
        if (err) findPort(port + 1).then(resolve)
        else resolve(port)
      })
    })
    testServer.on('error', () => {
      testServer.close(() => {
        findPort(port + 1).then(resolve)
      })
      findPort(port + 1).then(resolve)
    })
  })

findPort(10000).then((port) => {
  let win = null
  const server = http.createServer(function(req, res) {
    let requestPath = req.url
    if (requestPath === '/') requestPath += 'index.html'
    const filePath = path.join(__dirname, 'dist', requestPath.replace('/', ''))
    fs.stat(filePath, (e) => {
      if (e) {
        res.statusCode = 404
        res.end('Error')
      } else {
        const file = fs.createReadStream(filePath)
        res.statusCode = 200
        file.pipe(res)
      }
    })
  })
  server.listen(port, '127.0.0.1')
  const app = electron.app

  // Create the window

  const newWin = () => {
    win = new electron.BrowserWindow({
      icon: path.join(__dirname, 'build/icon.png'),
      webPreferences: {
        nodeIntegration: true
      }
    })
    win.maximize()
    win.on('closed', () => (win = null))
    return win.loadURL(`http://127.0.0.1:${port}`)
  }

  autoUpdater.on('update-downloaded', (ev, info) => {
    autoUpdater.quitAndInstall()
  })

  app.on('ready', () => {
    // Create the Menu

    if (process.platform === 'darwin') {
      electron.Menu.setApplicationMenu(
        electron.Menu.buildFromTemplate([
          {
            label: 'AV/BV 互转小工具',
            submenu: [
              {
                label: '退出',
                accelerator: 'Command+Q',
                click() {
                  app.quit()
                }
              }
            ]
          }
        ])
      )
    } else {
      electron.Menu.setApplicationMenu(null)
    }

    newWin()

    autoUpdater.checkForUpdates()
  })

  app.on('web-contents-created', (e, webContents) => {
    webContents.on('new-window', (event, url) => {
      event.preventDefault()
      electron.shell.openExternal(url)
    })
  })

  app.on('window-all-closed', () => app.quit())
  app.on('activate', () => win === null && newWin())
})
