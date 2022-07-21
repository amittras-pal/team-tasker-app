# Team Tasker

A full stack MERN application, which aims to provide a platform
where an individual can create a project, add users, assign and track progress of tasks for their subordinates.

## Application Documentation

The Application documentation [Product Requirements Document] can be found in the `docs` folder in the root directory, this will be updated on a regular basis as and when new requirements are added and the `PRD changelog.md` file will contain a brief of the sections that were changed.

All contributors are requested to update the primary readme as and when required with information regarding important parts of the application Technology.

## Setting up local development environment:

### System Setup

- `Node.js v16.0+`
- IDE of your choice; `Visual Studio Code` preferred.

If you're using VSCode, it's preferable to have the following extensions installed.

- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

### Running the development environment

- Clone the repository
- Navigate to the root directory in the project in your terminal and run command `npm install` to install dependencies for the backend application.
- Once completed, navigate to the _client_ folder, and again run the command `npm install` to install dependencies for the client application.
- Create a file `.env` in the root directory, and add the following environment variables in it. The values for the `DATABASE_URI` & `JWT_SECRET` variables will be provided by the repository owner.

```
DATABASE_URI=
JWT_SECRET=
NODE_ENV=development
PORT=5000
```

- Run command `npm run develop` in the root application to start the backend server on your local machine, the application should be active on http://localhost:5000

- Navigate to client directory and run command `npm start` to start up the React Application on the local machine, it should start at http://localhost:3000

## Repository Branching Strategy

All development will be done on feature branches checked out from `dev` branch, which in turn will be a child branch of the `master` branch. Every new Pull request will require a review from peer developers before being merged to dev branch. Once a module is completed, the dev branch will be merged into master.

## Useful Links

- `Mantine UI Docs` - Mantine UI is used as the component library for the application, [view the official documentation here](https://mantine.dev/)
- `Youtube Tutorial MERN Stack` - [MERN Stack Crash Course by Traversy Media](https://youtube.com/playlist?list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm)
