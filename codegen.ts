import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql', 
  documents: ['src/graphql/queries/**/*.ts', 'src/**/*.tsx'], 
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;

