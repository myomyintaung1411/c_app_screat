import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
console.log(process.env.NODE_ENV, "lll")
export default defineConfig({
  productionSourceMap: false,
  // drop_console: true,
  // drop_debugger: true,
  plugins: [vue(),],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  server: {
    open: false,
    https: false,
    hot: true,
    port: 1111,
    proxy: {
      '/api': {
         target: 'http://45.116.165.93:6195/', //http://182.255.62.173:7878/api
        //ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/aa': {
         target: 'http://192.168.1.10:3198/', //http://182.255.62.173:7878/api
        //ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aa/, '')
      }
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // drop_console: true,
        // drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1600,
  },
})




