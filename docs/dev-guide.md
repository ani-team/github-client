---
title: DevGuide
---

## Usage

### Launch dev-stand
\`\`\`sh
$ npm i                   # install dependencies
$ npm run start           # launch stand
\`\`\`

### Launch tests
\`\`\`sh
$ npm run test            # launch all tests
\`\`\`

\`\`\`sh
$ npm run react:test      # unit tests
$ npm run lint:test       # linters tests
$ npm run lint:fix        # linters tests + autofix
\`\`\`

### Work with dependencies
\`\`\`sh
$ npm run deps:clean      # removing redundant created files, node_modules
$ npm run deps:reinstall  # reinstall dependencies
\`\`\`

### API Codegen
\`\`\`sh
$ npm run api:gen         # generate types and hooks for work with API - once
$ npm run api:gen--watch  # generate types and hooks for work with API - watch-mode
\`\`\`

## VSCode

Plugins list for better <b title="Developer Experience">DX</b>
> There is a required base config for all of these

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Autocomplete for Tailwind classes in components
- [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) - IntelliSense with autocomplete (but with freezes, possible)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - Autofix on save, testing from linters
