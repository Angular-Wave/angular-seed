import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import { rollupPluginHTML as html } from "@web/rollup-plugin-html";
import { copy } from "@web/rollup-plugin-copy";
import { bundle } from "lightningcss";

export default {
  input: "index.html",
  output: {
    dir: "dist",
    entryFileNames: "[name].[hash].js",
  },
  plugins: [
    html({
      minify: true,
      transformAsset: (_content, filePath) => {
        if (filePath.endsWith(".css")) {
          let { code } = bundle({
            filename: filePath,
            minify: true,
          });
          return new TextDecoder("utf-8").decode(code);
        }
      },
    }),
    copy({ patterns: "./*.{json,txt}", exclude: "node_modules" }),
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    terser(),
  ],
};
