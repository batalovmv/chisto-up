import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   
  plugins: [react()],
    server: {
        port:3000,
        proxy: {
            
            '/api': {
                // Целевой хост, к которому будет проксироваться ваш запрос.
                target: 'https://hcateringback-dev.unitbeandev.com/',
                changeOrigin: true, // Необходимо для включения CORS
                // Перезаписывает базовый путь в проксируемых запросах.
                rewrite: (path) => path.replace(/^\/api/, 'api')
                
            }
        }
    }
})
