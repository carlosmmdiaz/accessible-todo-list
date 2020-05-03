# Accessible Todo List

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

Based on [inclusive-components](https://inclusive-components.design/a-todo-list/) for accessibility demos.

## Accessible notes

- Every page needs a main tag
- Each section needs a title, and can have a aria-labelledby tag
- Use a form tag to submit on ENTER
- All inputs must have labels unless there is a button close by, then use aria-label to put a invisible label on the input
- Recommended that you style placeholders to have a higher contrast cross-browser
- Use aria-invalid="true" to say if an input is invalid
- Live regions are elements that tell screen readers to announce their contents whenever those contents change
- With a live region, we can make screen readers talk to their users without making those users perform any action (such as moving focus).
- Use role="status" and aria-live="polite" to tell the screen reader users that this is a live region
- Use visually-hidden class to visually hide elements but not for screen reader users.

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Karma
- `lint` runs the linter for your project

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
