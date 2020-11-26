# github-client

<img alt="favicon" src="https://avatars2.githubusercontent.com/oa/1406180?s=140&u=b44629cbec5079f99a61e6f1b6297bc4797f796b&v=4" height=120 align="right" />

Github клиент в рамках курса *React Akvelon 2020*.

- [Структура проекта](STRUCTURE.md)
- [Рекомендации по разработке](RECOMMENDATIONS.md)
- [Project WIKI](https://github.com/martis-git/github-client/wiki)
- [Требования](https://github.com/niyazm524/github-client/wiki/%D0%A1%D0%B4%D0%B0%D1%87%D0%B0-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0)
- [Дизайн](https://www.figma.com/file/HxOqIdmTNtLcFLcQZzAYJC/github-client "Супер дизайн от @AdeliyaG")


## Технический стек
- **UI**: `react`, `antd`, `classnames`, `tailwindcss`
- **Lang**: `typescript (3.7+)`
- **Fetching**: `graphql`, `apollo-client (3+)`
   - **API Codegen**: `graphql-codegen`
- **Routing**: `react-router`
- **Tests**: `eslint`, `prettier`, `graphql-eslint`, `stylelint`
- **Auth**: `GitHub OAuth`, `firebase`
- **CI/CD**: `github-actions`, `firebase`

<div align="center">
<img title="react" alt="react" height=48 src="https://cdn.auth0.com/blog/react-js/react.png"/>
<img title="typescript" alt="typescript" height=48 src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png"/>
<img title="antdesign" alt="antdesign" height=48 src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
<img title="graphql" alt="graphql" height=48 src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png"/>
<img title="apollo" alt="apollo" height=48 src="https://miro.medium.com/max/300/0*xdVGlEH7f9cRVaR-"/>
<img title="eslint" alt="eslint" height=48 src="https://d33wubrfki0l68.cloudfront.net/204482ca413433c80cd14fe369e2181dd97a2a40/092e2/assets/img/logo.svg"/>
<img title="prettier" alt="prettier" height=48 src="https://prettier.io/icon.png"/>
<img title="stylelint" alt="stylelint" height=48 src="https://camo.githubusercontent.com/aa04feafbd080140cd834905cf171ccf7b06fc5f1f1ae07ce9879218165312d1/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f7374796c656c696e742e737667"/>
<img title="github" alt="github" height=48 src="https://image.flaticon.com/icons/png/512/25/25231.png" />
<img title="Супер CI/CD от @niyazm524" alt="github-actions" height=48 src="https://avatars0.githubusercontent.com/u/44036562?s=200&v=4" />
<img title="firebase" alt="firebase" height=48 src="https://www.gstatic.com/devrel-devsite/prod/v73fbca10ce7899da426d451b3f74ee09bc6846fcf427552c7e8e85261505ef2c/firebase/images/touchicon-180.png" />
</div>

## Использование

### Запуск локального dev-стенда
```sh
$ npm i                   # установка зависимостей
$ npm run start           # запуск стенда
```

### Запуск тестов
```sh
$ npm run test            # запуск всех тестов
```

```sh
$ npm run react:test      # unit тесты
$ npm run lint:test       # тесты линтеров
$ npm run lint:fix        # тесты линтеров с исправлением
```

### Работа с зависимостями
```sh
$ npm run deps:clean      # удаление лишних созданных файлов, node_modules
$ npm run deps:reinstall  # переустановка зависимостей
```

### Кодогенерация API
```sh
$ npm run api:gen         # сгенерировать типы и хуки для работы с API - одноразово
$ npm run api:gen--watch  # сгенерировать типы и хуки для работы с API - watch-mode
```

## VSCode

Список плагинов для лучшего DX:
> Для всех - настроена базово необходимая конфигурация в проекте

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Автокомплит Tailwind классов в компонентах
- [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) - IntelliSense с автокомплитом (но возможны подтормаживания)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - Форматирование по сохранению, тестирование от линта
