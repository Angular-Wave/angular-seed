import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const plugins = [
  resolve(), // tells Rollup how to find date-fns in node_modules
  commonjs(), // converts date-fns to ES modules
  terser(),
];

const defaultDir = "src/main/webapp";

export default [
  {
    input: "./index.js",
    output: {
      dir: defaultDir,
      format: "umd",
    },
    plugins: plugins,
  },
];
