import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // theme: {
  //   extend: {
  //     colors: {
  //       "primary": "#f2592b",
  //       "secondary": "#feefec",
  //       "hover" : "#ce5733"
  //     }
  //   },
  // }
  assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.WEBP', '**/*.PNG'],
  plugins: [react(), tailwindcss(),],
})
