import { contextBridge, ipcRenderer } from 'electron'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  exportData: (data: any, filename: string) => 
    ipcRenderer.invoke('export-data', data, filename),
  
  importData: () => 
    ipcRenderer.invoke('import-data'),
  
  showNotification: (title: string, body: string) => 
    ipcRenderer.invoke('show-notification', title, body),
  
  onNotification: (callback: (data: { title: string; body: string }) => void) => 
    ipcRenderer.on('show-notification', (event, data) => callback(data)),
  
  removeNotificationListener: () => 
    ipcRenderer.removeAllListeners('show-notification'),
})

// Type definitions for the exposed API
declare global {
  interface Window {
    electronAPI: {
      exportData: (data: any, filename: string) => Promise<{ success: boolean; filePath?: string; error?: string }>
      importData: () => Promise<{ success: boolean; data?: any; error?: string }>
      showNotification: (title: string, body: string) => Promise<void>
      onNotification: (callback: (data: { title: string; body: string }) => void) => void
      removeNotificationListener: () => void
    }
  }
}