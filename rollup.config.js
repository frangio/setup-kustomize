import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'builtin-modules';

export default {
  input: 'index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [commonjs(), resolve({ preferBuiltins: true })],
  external: builtins,
};
