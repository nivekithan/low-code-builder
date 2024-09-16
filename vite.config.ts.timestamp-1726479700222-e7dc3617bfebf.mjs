// vite.config.ts
import { defineConfig } from "file:///C:/Users/nivek/code/low-code-builder/node_modules/.pnpm/vite@5.3.5_@types+node@22.0.2/node_modules/vite/dist/node/index.js";
import path from "node:path";
import electron from "file:///C:/Users/nivek/code/low-code-builder/node_modules/.pnpm/vite-plugin-electron@0.28.7_vite-plugin-electron-renderer@0.14.5/node_modules/vite-plugin-electron/dist/simple.mjs";
import react from "file:///C:/Users/nivek/code/low-code-builder/node_modules/.pnpm/@vitejs+plugin-react@4.3.1_vite@5.3.5_@types+node@22.0.2_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///C:/Users/nivek/code/low-code-builder/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.5.4_vite@5.3.5_@types+node@22.0.2_/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { TanStackRouterVite } from "file:///C:/Users/nivek/code/low-code-builder/node_modules/.pnpm/@tanstack+router-plugin@1.47.0_vite@5.3.5_@types+node@22.0.2_/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
var __vite_injected_original_dirname = "C:\\Users\\nivek\\code\\low-code-builder";
var vite_config_default = defineConfig({
  plugins: [
    tsconfigPaths(),
    TanStackRouterVite(),
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: "electron/main.ts",
        vite: {
          plugins: [tsconfigPaths()],
          build: {
            rollupOptions: {
              external: ["better-sqlite3", "typescript"]
            }
          }
        }
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__vite_injected_original_dirname, "electron/preload.ts")
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === "test" ? (
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        void 0
      ) : {}
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxuaXZla1xcXFxjb2RlXFxcXGxvdy1jb2RlLWJ1aWxkZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG5pdmVrXFxcXGNvZGVcXFxcbG93LWNvZGUtYnVpbGRlclxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbml2ZWsvY29kZS9sb3ctY29kZS1idWlsZGVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xyXG5pbXBvcnQgZWxlY3Ryb24gZnJvbSBcInZpdGUtcGx1Z2luLWVsZWN0cm9uL3NpbXBsZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XHJcbmltcG9ydCB7IFRhblN0YWNrUm91dGVyVml0ZSB9IGZyb20gXCJAdGFuc3RhY2svcm91dGVyLXBsdWdpbi92aXRlXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHRzY29uZmlnUGF0aHMoKSxcclxuICAgIFRhblN0YWNrUm91dGVyVml0ZSgpLFxyXG4gICAgcmVhY3QoKSxcclxuICAgIGVsZWN0cm9uKHtcclxuICAgICAgbWFpbjoge1xyXG4gICAgICAgIC8vIFNob3J0Y3V0IG9mIGBidWlsZC5saWIuZW50cnlgLlxyXG4gICAgICAgIGVudHJ5OiBcImVsZWN0cm9uL21haW4udHNcIixcclxuICAgICAgICB2aXRlOiB7XHJcbiAgICAgICAgICBwbHVnaW5zOiBbdHNjb25maWdQYXRocygpXSxcclxuICAgICAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICBleHRlcm5hbDogW1wiYmV0dGVyLXNxbGl0ZTNcIiwgXCJ0eXBlc2NyaXB0XCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBwcmVsb2FkOiB7XHJcbiAgICAgICAgLy8gU2hvcnRjdXQgb2YgYGJ1aWxkLnJvbGx1cE9wdGlvbnMuaW5wdXRgLlxyXG4gICAgICAgIC8vIFByZWxvYWQgc2NyaXB0cyBtYXkgY29udGFpbiBXZWIgYXNzZXRzLCBzbyB1c2UgdGhlIGBidWlsZC5yb2xsdXBPcHRpb25zLmlucHV0YCBpbnN0ZWFkIGBidWlsZC5saWIuZW50cnlgLlxyXG4gICAgICAgIGlucHV0OiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcImVsZWN0cm9uL3ByZWxvYWQudHNcIiksXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyBQbG95ZmlsbCB0aGUgRWxlY3Ryb24gYW5kIE5vZGUuanMgQVBJIGZvciBSZW5kZXJlciBwcm9jZXNzLlxyXG4gICAgICAvLyBJZiB5b3Ugd2FudCB1c2UgTm9kZS5qcyBpbiBSZW5kZXJlciBwcm9jZXNzLCB0aGUgYG5vZGVJbnRlZ3JhdGlvbmAgbmVlZHMgdG8gYmUgZW5hYmxlZCBpbiB0aGUgTWFpbiBwcm9jZXNzLlxyXG4gICAgICAvLyBTZWUgXHVEODNEXHVEQzQ5IGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJvbi12aXRlL3ZpdGUtcGx1Z2luLWVsZWN0cm9uLXJlbmRlcmVyXHJcbiAgICAgIHJlbmRlcmVyOlxyXG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInRlc3RcIlxyXG4gICAgICAgICAgPyAvLyBodHRwczovL2dpdGh1Yi5jb20vZWxlY3Ryb24tdml0ZS92aXRlLXBsdWdpbi1lbGVjdHJvbi1yZW5kZXJlci9pc3N1ZXMvNzgjaXNzdWVjb21tZW50LTIwNTM2MDA4MDhcclxuICAgICAgICAgICAgdW5kZWZpbmVkXHJcbiAgICAgICAgICA6IHt9LFxyXG4gICAgfSksXHJcbiAgXSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1MsU0FBUyxvQkFBb0I7QUFDclUsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sY0FBYztBQUNyQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUywwQkFBMEI7QUFMbkMsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsY0FBYztBQUFBLElBQ2QsbUJBQW1CO0FBQUEsSUFDbkIsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBO0FBQUEsUUFFSixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsVUFDSixTQUFTLENBQUMsY0FBYyxDQUFDO0FBQUEsVUFDekIsT0FBTztBQUFBLFlBQ0wsZUFBZTtBQUFBLGNBQ2IsVUFBVSxDQUFDLGtCQUFrQixZQUFZO0FBQUEsWUFDM0M7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVM7QUFBQTtBQUFBO0FBQUEsUUFHUCxPQUFPLEtBQUssS0FBSyxrQ0FBVyxxQkFBcUI7QUFBQSxNQUNuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS0EsVUFDRSxRQUFRLElBQUksYUFBYTtBQUFBO0FBQUEsUUFFckI7QUFBQSxVQUNBLENBQUM7QUFBQSxJQUNULENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
