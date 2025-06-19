// prettier.config.js (ESM 방식)

export default {
  //기존 prettier 설정
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  //plugin 명시. @trivago 붙여줘야 합니다...
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  //import 순서 설정
  //어딘가에서 추천한 설정순서였는데 어디였는지 까먹었습니다...ㅜ
  importOrder: [
    '^react$', //react (useState, useEffect등) 최상단
    '<THIRD_PARTY_MODULES>', //외부 라이브러리
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
