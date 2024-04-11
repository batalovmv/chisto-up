import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   
  plugins: [react()],
    server: {
        port:3000,//потратил несколько часов пытаясь решить проблему с cors, почему-то введя вручную порт 3000 она исчезла, в идеале конечно было бы настроить это на бэке
        proxy: {
            
            '/api': {
                // Целевой хост, к которому будет проксироваться ваш запрос.
                target: 'https://hcateringback-dev.unitbeandev.com/',
                changeOrigin: true, // Необходимо для включения CORS
                
            }
        }
    }
})
