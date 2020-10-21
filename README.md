# github-client
Github клиент в рамках курса *React Akvelon 2020*.


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

## Кодогенерация API
```bash
npm run api:gen         (сгенерировать типы и хуки для работы с API - одноразово)
npm run api:gen---watch (сгенерировать типы и хуки для работы с API - watch-mode)
```

## Структура проекта

- [STRUCTURE.md](STRUCTURE.md)

## Рекомендации к разработке

- [RECOMMENDATIONS.md](RECOMMENDATIONS.md)
