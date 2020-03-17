# Coding Guidelines

## Names

### General
- Use whole words in names when possible

### JavaScript
- Use PascalCase for `class` names
- Use camelCase for `function` and `method` names
- Use camelCase for `property` names and `local variables`
- Use UPPERCASE and under_score for `constant` names, except for `styled-components`

### CSS
- Avoid using `classes` or `IDs` when possible; use `styled-components` instead
- Use camelCase for `class` names and `IDs`
- Prefix `class` names with `fds-`
- Use hyphens to indicate element nestings

## Indentation
- Use spaces, not tabs
- Use 4 spaces per indentation

## Comments
- Use JSDoc style comments for `functions`, `interfaces`, `enums`, and `classes`

## Style
- Use arrow functions `=>` over anonymous function expressions.
- Only surround function parameters when necessary. For example, `(x) => x + x` is wrong but the following are correct:
  - `x => x + x`
  - `(x, y) => x + y`
- Always surround loop and conditional bodies with curly braces
- Open curly braces always go on the same line as whatever necessitates them
- Parenthesized constructs shoould have no surrounding whitespace. A single space follows commas, colons, and semicolons in those constructs. For example:
  - `for (let i = 0, n = str.length; i < 10; 1++) { }`
  - `if (x < 10) { }`
- `else` goes on the same line as the closing curly brace
- Use a single declaration per variable statement. For example, use `var x = 1; var y = 2` over `var x = 1, y = 2`
- Use 'single quotes' for strings