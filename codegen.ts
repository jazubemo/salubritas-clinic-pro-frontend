import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
  documents: ['src/graphql/queries/**/*.ts', 'src/**/*.tsx'], 
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [
        'typescript' 
      ],
      config: {
        useTypeImports: true 
      },
    },
  },
};

export default config;


