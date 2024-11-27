// vite.config.ts
import Vue from "file:///D:/weilai.team/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import autoprefixer from "file:///D:/weilai.team/node_modules/autoprefixer/lib/autoprefixer.js";
import { resolve } from "node:path";
import tailwind from "file:///D:/weilai.team/node_modules/tailwindcss/lib/index.js";
import VueRouter from "file:///D:/weilai.team/node_modules/unplugin-vue-router/dist/vite.js";
import { defineConfig } from "file:///D:/weilai.team/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "D:\\weilai.team";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter({
      routesFolder: [
        "src/pages",
        {
          src: "src/features/admin/pages",
          path: "admin/"
        },
        {
          src: "src/features/community/pages",
          path: "community/"
        },
        {
          src: "src/features/personalCenter/pages",
          path: "personalCenter/"
        },
        {
          src: "src/features/login/pages",
          path: "login/"
        },
        {
          src: "src/features/application/pages",
          path: "application/"
        },
        {
          src: "src/features/message/pages",
          path: "message/"
        }
      ]
    }),
    Vue()
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    },
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src"),
      "@admin": resolve(__vite_injected_original_dirname, "./src/features/admin"),
      "@community": resolve(__vite_injected_original_dirname, "./src/features/community"),
      "@personalCenter": resolve(__vite_injected_original_dirname, "./src/features/personalCenter"),
      "@login": resolve(__vite_injected_original_dirname, "./src/features/login")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3ZWlsYWkudGVhbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd2VpbGFpLnRlYW1cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dlaWxhaS50ZWFtL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IFZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gXCJhdXRvcHJlZml4ZXJcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdGFpbHdpbmQgZnJvbSBcInRhaWx3aW5kY3NzXCI7XG5pbXBvcnQgVnVlUm91dGVyIGZyb20gXCJ1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGVcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBWdWVSb3V0ZXIoe1xuICAgICAgcm91dGVzRm9sZGVyOiBbXG4gICAgICAgIFwic3JjL3BhZ2VzXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwic3JjL2ZlYXR1cmVzL2FkbWluL3BhZ2VzXCIsXG4gICAgICAgICAgcGF0aDogXCJhZG1pbi9cIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCJzcmMvZmVhdHVyZXMvY29tbXVuaXR5L3BhZ2VzXCIsXG4gICAgICAgICAgcGF0aDogXCJjb21tdW5pdHkvXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwic3JjL2ZlYXR1cmVzL3BlcnNvbmFsQ2VudGVyL3BhZ2VzXCIsXG4gICAgICAgICAgcGF0aDogXCJwZXJzb25hbENlbnRlci9cIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCJzcmMvZmVhdHVyZXMvbG9naW4vcGFnZXNcIixcbiAgICAgICAgICBwYXRoOiBcImxvZ2luL1wiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcInNyYy9mZWF0dXJlcy9hcHBsaWNhdGlvbi9wYWdlc1wiLFxuICAgICAgICAgIHBhdGg6IFwiYXBwbGljYXRpb24vXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwic3JjL2ZlYXR1cmVzL21lc3NhZ2UvcGFnZXNcIixcbiAgICAgICAgICBwYXRoOiBcIm1lc3NhZ2UvXCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICAgIFZ1ZSgpLFxuICBdLFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbdGFpbHdpbmQoKSwgYXV0b3ByZWZpeGVyKCldLFxuICAgIH0sXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhcGk6IFwibW9kZXJuLWNvbXBpbGVyXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgXCJAYWRtaW5cIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvZmVhdHVyZXMvYWRtaW5cIiksXG4gICAgICBcIkBjb21tdW5pdHlcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvZmVhdHVyZXMvY29tbXVuaXR5XCIpLFxuICAgICAgXCJAcGVyc29uYWxDZW50ZXJcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvZmVhdHVyZXMvcGVyc29uYWxDZW50ZXJcIiksXG4gICAgICBcIkBsb2dpblwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9mZWF0dXJlcy9sb2dpblwiKSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdPLE9BQU8sU0FBUztBQUNoUCxPQUFPLGtCQUFrQjtBQUN6QixTQUFTLGVBQWU7QUFDeEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sZUFBZTtBQUN0QixTQUFTLG9CQUFvQjtBQUw3QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUEsTUFDUixjQUFjO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ3RDO0FBQUEsSUFDQSxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixLQUFLO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQy9CLFVBQVUsUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxNQUNuRCxjQUFjLFFBQVEsa0NBQVcsMEJBQTBCO0FBQUEsTUFDM0QsbUJBQW1CLFFBQVEsa0NBQVcsK0JBQStCO0FBQUEsTUFDckUsVUFBVSxRQUFRLGtDQUFXLHNCQUFzQjtBQUFBLElBQ3JEO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
