# github-client

<img alt="favicon" src="https://avatars2.githubusercontent.com/oa/1406180?s=140&u=b44629cbec5079f99a61e6f1b6297bc4797f796b&v=4" height=120 align="right" />

GitHub client within the *React Akvelon 2020* course.

[wiki]: https://github.com/martis-git/github-client/wiki
[requirements]: https://github.com/niyazm524/github-client/wiki/%5BRU%5D-Requirements
[codestyle]: https://github.com/niyazm524/github-client/wiki/CodeStyle
[structure]: https://github.com/niyazm524/github-client/wiki/Project-Structure
[dev-guide]: https://github.com/niyazm524/github-client/wiki/Dev-Guide

- [Project WIKI][wiki]
   - [Requirements (RU)][requirements]
   - [Design](https://www.figma.com/file/HxOqIdmTNtLcFLcQZzAYJC/github-client "Super design from @AdeliyaG")
   - [Dev Guide][dev-guide]
   - [Structure][structure]
   - [CodeStyle][codestyle]
- [Contributing guide](CONTRIBUTING.md)

## Overview
- See repo/collabs list and details of [any user](https://github-client.gq/gaearon)
- See base info of [any repository](https://github-client.gq/facebook/react)
- Use search by [repo](https://github-client.gq/search?o=desc&q=react&s=stars)/[users](https://github-client.gq/search?o=desc&q=google&s=repositories&type=users)
- View corresponding page on <b title="Our routing is identical with github">github through origin button!</b>
- [**Try github-client right now =)**](https://github-client.gq)

<img alt="screen" src="docs/search.png" />

## Technology stack
- **UI**: `react`, `antd`, `classnames`, `tailwindcss`
- **Lang**: `typescript (3.7+)`
- **Fetching**: `graphql`, `apollo-client (3+)`
   - **API Codegen**: `graphql-codegen`
- **Routing**: `react-router`
- **Tests**: `eslint`, `prettier`, `graphql-eslint`, `stylelint`
- **Auth**: `GitHub OAuth`, `firebase`
- <b title="Super CI/CD from @niyazm524">CI/CD</b>: `github-actions`, `firebase`

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
<img title="github-actions" alt="github-actions" height=48 src="https://avatars0.githubusercontent.com/u/44036562?s=200&v=4" />
<img title="firebase" alt="firebase" height=48 src="https://www.gstatic.com/devrel-devsite/prod/v73fbca10ce7899da426d451b3f74ee09bc6846fcf427552c7e8e85261505ef2c/firebase/images/touchicon-180.png" />
</div>
