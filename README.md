# github-client
Github клиент в рамках курса *React Akvelon 2020*.

<div style="display: flex;">
<img title="github" alt="github" width="64" src="https://image.flaticon.com/icons/png/512/25/25231.png"/>
<img title="react" alt="react" width="64" src="https://cdn.auth0.com/blog/react-js/react.png"/>
<img title="antdesign" alt="antdesign" width="64" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
<img title="graphql" alt="graphql" width="64" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png"/>
<img title="apollo" alt="apollo" width="64" src="https://miro.medium.com/max/300/0*xdVGlEH7f9cRVaR-"/>
</div>

## Ресурсы

- [Структура проекта](STRUCTURE.md)
- [Рекомендации по разработке](RECOMMENDATIONS.md)
- [Project WIKI](https://github.com/martis-git/github-client/wiki)

## Технический стек
- **UI**: `react`, `antd`, `classnames`, `tailwindcss`
- **Lang**: `typescript (3.7+)`
- **Fetching**: `graphql`, `apollo-client (3+)`
   - **API Codegen**: `graphql-codegen`
- **Routing**: `react-router`
- **Tests**: `eslint`, `prettier`, `graphql-eslint`, `stylelint`

## Использование

### Запуск локального dev-стенда
```bash
npm i                   (установка зависимостей)
npm run start           (запуск стенда)
```

### Запуск тестов
```bash
npm run test            (запуск всех тестов)
```

```bash
npm run react:test      (unit тесты)
npm run lint:test       (тесты линтеров)
npm run lint:fix        (тесты линтеров с исправлением)
```

### Работа с зависимостями
```bash
npm run deps:clean      (удаление лишних созданных файлов, node_modules)
npm run deps:reinstall  (переустановка зависимостей)
```

### Кодогенерация API
```bash
npm run api:gen         (сгенерировать типы и хуки для работы с API - одноразово)
npm run api:gen--watch  (сгенерировать типы и хуки для работы с API - watch-mode)
```

## VSCode

Список плагинов для лучшего DX:
> Для всех - настроена базово необходимая конфигурация в проекте

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Автокомплит Tailwind классов в компонентах
- [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) - IntelliSense с автокомплитом (но возможны подтормаживания)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - Форматирование по сохранению, тестирование от линта
