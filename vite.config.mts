import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "vite-plugin-commonjs";
import swc from "vite-plugin-swc-transform";

export default defineConfig(() => {
  return {
    build: {
      outDir: "dist/clean",
      sourcemap: true,
    },
    plugins: [
      swc({
        swcOptions: {
          jsc: {
            target: "es2022",
            transform: {
              legacyDecorator: true,
              decoratorMetadata: true,
              useDefineForClassFields: true,
            },
          },
        },
      }),
      commonjs(),
      react(),
      tsconfigPaths(),
    ],
  };
});
