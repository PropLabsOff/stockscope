import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import { join } from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'

let mainWindow: BrowserWindow | null = null

const isDev = process.argv.includes('--dev')

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'default',
    show: false,
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IPC handlers for file operations
ipcMain.handle('export-data', async (event, data: any, filename: string) => {
  try {
    const result = await dialog.showSaveDialog(mainWindow!, {
      defaultPath: filename,
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'CSV Files', extensions: ['csv'] },
        { name: 'Excel Files', extensions: ['xlsx'] },
      ],
    })

    if (!result.canceled && result.filePath) {
      const filePath = result.filePath
      const fileExtension = filePath.split('.').pop()?.toLowerCase()

      let content: string
      if (fileExtension === 'csv') {
        content = convertToCSV(data)
      } else if (fileExtension === 'xlsx') {
        // For Excel, we'll save as JSON and let the frontend handle Excel conversion
        content = JSON.stringify(data, null, 2)
      } else {
        content = JSON.stringify(data, null, 2)
      }

      writeFileSync(filePath, content, 'utf8')
      return { success: true, filePath }
    }
    return { success: false, error: 'Export cancelled' }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
})

ipcMain.handle('import-data', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow!, {
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'CSV Files', extensions: ['csv'] },
        { name: 'Excel Files', extensions: ['xlsx'] },
      ],
    })

    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0]
      const content = readFileSync(filePath, 'utf8')
      const fileExtension = filePath.split('.').pop()?.toLowerCase()

      let data: any
      if (fileExtension === 'csv') {
        data = parseCSV(content)
      } else {
        data = JSON.parse(content)
      }

      return { success: true, data }
    }
    return { success: false, error: 'Import cancelled' }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
})

ipcMain.handle('show-notification', async (event, title: string, body: string) => {
  if (mainWindow) {
    mainWindow.webContents.send('show-notification', { title, body })
  }
})

// Utility functions
function convertToCSV(data: any): string {
  if (Array.isArray(data)) {
    if (data.length === 0) return ''
    
    const headers = Object.keys(data[0])
    const csvHeaders = headers.join(',')
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header]
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value
      }).join(',')
    )
    
    return [csvHeaders, ...csvRows].join('\n')
  }
  
  return JSON.stringify(data, null, 2)
}

function parseCSV(csvContent: string): any[] {
  const lines = csvContent.split('\n')
  const headers = lines[0].split(',').map(h => h.trim())
  
  return lines.slice(1).map(line => {
    const values = line.split(',')
    const obj: any = {}
    headers.forEach((header, index) => {
      obj[header] = values[index]?.trim() || ''
    })
    return obj
  })
}