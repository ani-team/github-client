# github-client
Github клиент в рамках курса *React Akvelon 2020*.

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
- **Tests**: `eslint + prettier`, `testing-library + jest`

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
npm run lint:test       (тесты линтера)
npm run lint:fix        (тесты линтера с исправлением)
```

### Работа с зависимостями
```bash
npm run deps:clean      (удаление лишних созданных файлов, node_modules)
npm run deps:reinstall  (переустановка зависимостей)
```

### Кодогенерация API
```bash
npm run api:gen         (сгенерировать типы и хуки для работы с API - одноразово)
npm run api:gen---watch (сгенерировать типы и хуки для работы с API - watch-mode)
```

## VSCode

Список плагинов для лучшего DX:
> Для всех - настроена базово необходимая конфигурация в проекте

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Автокомплит Tailwind классов в компонентах
- [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) - IntelliSense с автокомплитом (но возможны подтормаживания)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Форматирование по сохранению, pre-commit-hook, тестирование от линта
