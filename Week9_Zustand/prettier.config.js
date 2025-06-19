// prettier.config.js (ESM 방식)
import pluginSortImports from 'prettier-plugin-sort-imports';

export default {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$',
    '<THIRD_PARTY_MODULES>',
    '^@utils(/.*)?$',
    '^@apis(/.*)?$',
    '^@constants(/.*)?$',
    '^@types(/.*)?$',
    '^@schemas(/.*)?$',
    '^@context(/.*)?$',
    '^@layout(/.*)?$',
    '^@components(/.*)?$',
    '^@pages(/.*)?$',
    '^@(/.*)?$', // 루트 fallback
    '^[./]', // 상대 경로
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
