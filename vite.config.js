import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Esta propiedad es fundamental: le indica a Vite que la app 
  // se servirá desde la subcarpeta de tu repositorio en GitHub.
  base: '/mejokoji/',
})