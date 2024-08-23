# Installation

1. Clone the repo
2. run `npm install`
3. run `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the file.

# Project directory

1. main: `app/page.tsx`

- this is where the main page is and where all the components are

2. components: `app/components`

- this is where you put your react components, remember to add to `app/page.tsx` after you completed a major component.

3. api: `app/api`

- this is where all the apis are.

# Git guides

Your code hopefully falls of to either `feat` (a feature), `fixbug`(a bug fixing), `refactor`(code cleaning, doesnt change api call) or `chore`(some utils).

1. branches

- please name your branches to be `feat/xxx`, `fixbug/xxx`, `refactor/xxx`. Preferrably not using `personal/xxx`.

2. commit messages

- similar to the naming of branches. Your commits should be for example `feat(login): added POST handler`.
  The first part is the category of your commit, then the brackets refer to the scope, and then the message.
