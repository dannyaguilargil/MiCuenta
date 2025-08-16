import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/front',
  plugins: [react()], 

  server:{
    watch: {
      usePolling: true,
    },
    port: 8002,
    host:'0.0.0.0',
   allowedHosts: [
      "sara.imsalud.gov.co",
      "localhost",
      "192.168.2.185",
      "saradev.imsalud.gov.co"
    ],
  }
})
