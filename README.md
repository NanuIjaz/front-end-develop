# NextJS 14 Template
This is NextJS Template using version 14 that you can see the documentation [here](https://nextjs.org/docs)

## Package / Library Included
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/docs)
- [ESLint](https://eslint.org/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Commit Linter](https://commitlint.js.org/#/)

---

## Project Structure

Project structure for this Next starter
```javascript
.husky                         // Contain husky configuration
.next                          // Contain Next framework configuration
.vscode                        // Contain vscode configuration to force local
node_modules                   // Contain modules / third parties
public                         // Contain public assets & etc
app                            // Entry point for the app.
├── {feature-name-folder}      // Contain your feature files, the the structure same as app folder (but isolated functionality)
├── layout.tsx                 // File for rendering layout (app layout)
├── loading.tsx                // File for rendering loading (app loading)
└── page.tsx                   // File for rendering page (app (/) main page)
components                     // Contain all base components or reusable
├── ui                         // Contain all reusable components
└── {another-component=folder} // Your desired reusable component folder name
constants                      // Contain all constants
styles                         // Contain all global styles
└── global.scss                // Contain global styles and tailwind styles
lib                            // Contain library config
└── utils.ts                   // Tailwind and shadcn merge config
.eslint.json                   // File config for eslint
.prettierrc                    // File config for prettier
commitlint.config.js           // File config for commitlint
next-env.d.ts                  // File config for type definition
next.config.js                 // File config for next framework
package.json                   // File config for your project
pnpm-lock.yaml                 // File config for locking project packages (READONLY FILE!)
postcss.config.js              // File config for postcss
README.md                      // File for documentation (HEY YOU READING ME NOW!)
tailwind.config.js             // File config for tailwind
components.json                // File config for shadcn components
```

Ref: [Next Project Structure](https://nextjs.org/docs/getting-started/project-structure)

If you want to create folder outside declared above, you can create, but, don't forget to update this docs.

---

## Installation

1; Install dependencies using pnpm

```shell
pnpm install
```

---

## Available commands for start and build

Run next app with turbopack

```shell
pnpm run dev:turbo
```

Build next app

```shell
pnpm run build
```

---

## Available commands for linting

Run linter and will search for problems, but will not fix

```shell
pnpm lint
```

Run linter and will search and try to fix the problems.

```shell
pnpm lint:fix
```

Run linter and will call prettier to fix the code style.

```shell
pnpm lint:format
```

---

## Commit Style
Please use commitizen format to commit for example you can see [Here](https://www.npmjs.com/package/commitizen)
