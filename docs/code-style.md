# CodeStyle

> Please, don't ignore theese recommendations

## Commits
- Use [semantic commits](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
   > commits:
   > - \`feature(scope): details\`
   > - \`fix(scope): details\`
   > - \`refactor(scope): details\`
   > - and etc..
   
- Use [gitflow](https://datasift.github.io/gitflow/IntroducingGitFlow.html)
   > branches:
   > - \`feature/{name}\` => \`dev\`
   > - \`bugfix/{name}\` => \`dev\`
   > - and etc..

## Code
- Don't be blinded by \`DRY\` principle
   > TODO: add comments
- Add comments - only if it's required
- Describe props/types
\`\`\`ts
type TreeItem = {
    /** Unique identifier */
    id: TreeNodeId;
    /** Name */
    name: string;
    /** Amount of related items */
    count: number;
    /** Parent identifier */
    parentId?: TreeNodeId;
}
\`\`\`
- Use \`tsdoc\`-like style
\`\`\`ts
/**
 * Tooltip
 * @remark If you should not specify \`title\` props - tooltip'll be invisible
 */
const Tooltip = (props: Props) => {
\`\`\`

## Styles
- Use \`css\` vars
  - specially - with work with colors
  - not only on app level, also at component's level

\`\`\`css
.app {
    --clr-base: #4d97fd;
    --clr-base-hover: #4d97fd1f;
    ...
}
\`\`\`
