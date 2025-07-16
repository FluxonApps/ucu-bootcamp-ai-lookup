# /Name of the project/ `💫🪐☄️`

/Description of the project/

Technologies used:

- [React](https://react.dev/) - UI framework/library
- [TypeScript](https://www.typescriptlang.org/) - strict types for JavaScript
- [Firebase](https://firebase.google.com/docs) - authentication functionality (Firebase Auth), database (Firestore), web app hosting (Firebase Hosting). Basically, it serves as the backend for our app
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - bundler, a tool that takes all the source code files and compiles them together to build the app 🛠️

### Local development setup

Now, let's set up your machine for real development 👇

1. Clone this Git repository:

```shell
# 1. Copy Git repository URL: on the GitHub page of this repository, click the green `<> Code` button > `📋` button to the right of the repository url.


# 2. Find a place where you want this project to live at.
cd ~; mkdir -p Projects; cd Projects # If you don't have a better place to put this repo

# 3. Clone the repository.
git clone <REPOSITORY URL YOU COPIED>

# 4. Navigate into the repository folder.
cd <REPOSITORY NAME>
```

2. Install Node.js 22: https://nodejs.org/en/download/package-manager. You can use `nvm` as per the guide, or download a simple installer from that page.

3. Configure your editor to use ESLint and to run it on file save. This will ensure the code looks great for everyone the same way 💅

   - if using VSCode, run `sh -c scripts/configure-vscode.sh`. If encountering issues with `code` command not being available, follow this guide: https://claude.ai/share/084f7821-6d56-4407-90ea-8c8774381b8f.
   - if using any other IDE, start questioning your life decisions. Or just ask mentors for help 😇

4. Install the dependencies using NPM. We are using libraries and code that was already written by other devs.

```shell
npm install
```

5. Start the project!

```shell
npm run dev
```

6. Go to http://localhost:5173/ to see this wonderful project live

7. Open the project in VSCode (if haven't yet)

```shell
code .
```

8. Make changes to project files within the src/ folder to see them reflected on the page

9. You should be all set! Now you can start contributing to the project! 🤘

## Deployment

Hey, some of you might be interested in setting up the deployment of your team's app 👀🚀

You could do this manually, or via an automated GitHub Actions workflow. Just ask your mentor!

## Useful Materials

### LINKS:

Firebase project: https://console.firebase.google.com/u/4/project/ucu-demo-project/overview
Figma design file: https://www.figma.com/design/jTdkZgNfiAMwGCxpHY9lRp/Untitled?node-id=0-1&p=f&t=LGhCqmQKcdqnSgVw-0
PRD document: https://docs.google.com/document/d/1tOFVZL6-Wku7vtw4rzxisLIYC9OdnxfbCN3cENcjDuA/edit?tab=t.0#heading=h.djd578ti9xl

## /backend_server usage tutorial:

Go inside apps/backend_server \
run `npm install` -> `npm run build` -> `npm start` \
Go to `http://localhost:3131/scrape` \
Manually provide a url for testing in the following way:
`http://localhost:3131/scrape/?url=` \
Wait a few seconds for a response.

## /frontend usage tutorial

go inside apps/frontend \
run `npm run dev`.
Boom
