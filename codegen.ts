import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.PUBLIC_API_URL,
  documents: ['**/*.{graphql,gql}'],
  generates: {
    'src/lib/graphql/schema-types.ts': {
      config: {
        useTypeImports: true
      },
      plugins: ['typescript']
    },
    'src/lib/graphql/operations/': {
      config: {
        useTypeImports: true
      },
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '~$lib/graphql/schema-types',
        extension: '.ts'
      },
      plugins: ['typescript-operations', 'typed-document-node']
    }
  }
};

export default config;
