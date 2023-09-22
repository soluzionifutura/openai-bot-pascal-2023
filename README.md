# openai-bot-pascal-2023

Public link: [https://github.com/soluzionifutura/openai-bot-pascal-2023](https://github.com/soluzionifutura/openai-bot-pascal-2023)

Public link: [http://bit.ly/bot-pascal](http://bit.ly/bot-pascal)

Meet: [https://meet.google.com/ibd-tpfm-skw](https://meet.google.com/ibd-tpfm-skw)

Link gradimento: [https://forms.gle/dtrzGMFbVGpG8RoTA](https://forms.gle/dtrzGMFbVGpG8RoTA)

## Setup

1. Install [NodeJS](https://nodejs.org/en)
2. Install packages: `npm install`
3. Create a `.env` file with the following content (and fill the values, ALLOWED_CHAT_IDS and ADMIN_CHAT_ID are optional):

```txt
BOT_TOKEN=
OPENAI_API_KEY=

# Comma separated list of chat ids that are allowed to use the bot
ALLOWED_CHAT_IDS=

# Chat id of the admin user
ADMIN_CHAT_ID=
```

## Development

To run the bot in development mode, open a terminal (terminal > new terminal) and run the following command:

```bash
npm run dev
```

## Local setup

1. Download the repository as a zip file (green button "Code" > Download ZIP)
2. Extract the zip file. Make sure to not nest the folder inside another folder with the same name. Sometimes the zip file is extracted inside a folder with the same name, so you have to move the folder outside the other folder.
3. Open the folder with VSCode (File > Open Folder)
4. Open a terminal (terminal > new terminal)
5. Create a `.env` (this exact name) file with the following content (fill BOT_TOKEN and OPENAI_API_KEY with the values you have received):

```txt
BOT_TOKEN=
OPENAI_API_KEY=

# Comma separated list of chat ids that are allowed to use the bot
ALLOWED_CHAT_IDS=

# Chat id of the admin user
ADMIN_CHAT_ID=
```


## Limit the access to the bot to specific users

1. Get the chat id of the user you want to allow to use the bot (see the section below `Useful snippets`)
2. Set the `ALLOWED_CHAT_IDS` variable in the `.env` file with the chat ids of the users you want to allow to use the bot. The chat ids must be separated by a comma `,`

Example:

```txt
ALLOWED_CHAT_IDS=123456789,987654321
```

If you want to allow all users to use the bot, leave the variable `ALLOWED_CHAT_IDS` empty.

If you want to be notified when a user tries to use the bot but is not allowed, set the `ADMIN_CHAT_ID` variable in the `.env` file with the chat id of the admin user.

Example:

```txt
ADMIN_CHAT_ID=123456789
```

## Common errors

### Command not found

Problem:

```bash
command not found: node
```

Solution:

- Make sure you have installed NodeJS
- Change the terminal (use GitBash or CMD instead of PowerShell)

### Cannot find module - 1

Problem:

```bash
node:internal/modules/cjs/loader:959
  throw err;
  ^

Error: Cannot find module '/Users/alessandromontanari/repo/openai-bot-pascal-2023/index.js'
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:956:15)
    at Function.Module._load (node:internal/modules/cjs/loader:804:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
```

Solution:

- Make sure you are in the right folder and you are trying to run the right file. This error happens when you are trying to run a file that does not exist. Run the command `dir` and make sure you see the correct files. 

### Cannot find module - 2

Problem:

```bash
node:internal/modules/cjs/loader:959
  throw err;
  ^

Error: Cannot find module 'XXXXXXX'
Require stack:
- /Users/alessandromontanari/repo/openai-bot-pascal-2023/src/index.js
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:956:15)
    at Function.Module._load (node:internal/modules/cjs/loader:804:27)
    at Module.require (node:internal/modules/cjs/loader:1028:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/Users/alessandromontanari/repo/openai-bot-pascal-2023/src/index.js:1:22)
    at Module._compile (node:internal/modules/cjs/loader:1126:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1180:10)
    at Module.load (node:internal/modules/cjs/loader:1004:32)
    at Function.Module._load (node:internal/modules/cjs/loader:839:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/Users/alessandromontanari/repo/openai-bot-pascal-2023/src/index.js'
  ]
}
```

Solution:

- Make sure you have installed the packages with `npm install`
- Make sure you have installed the package `XXXXXXX`. You can check it in the `package.json` file under the `dependencies` section. If it is not there, you can install it with `npm install XXXXXXX`

### Missing script: dev

Problem:

```bash
npm ERR! Missing script: "dev"
npm ERR!
npm ERR! To see a list of scripts, run:
npm ERR!   npm run

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/alessandromontanari/.npm/_logs/2023-09-20T15_02_58_028Z-debug-0.log
```

Solution:

- You are in the wrong folder, maybe in another NodeJS project
- If you have created your own project, make sure to add the `dev` script in the `package.json` file. Check the `scripts` section of this project's `package.json` file

### BOT_TOKEN must be provided

Problem:

```bash
/Users/alessandromontanari/repo/openai-bot-pascal-2023/src/index.js:13
    throw new Error("BOT_TOKEN must be provided!")
    ^

Error: BOT_TOKEN must be provided!
    at Object.<anonymous> (/Users/alessandromontanari/repo/openai-bot-pascal-2023/src/index.js:13:11)
    at Module._compile (node:internal/modules/cjs/loader:1126:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1180:10)
    at Module.load (node:internal/modules/cjs/loader:1004:32)
    at Function.Module._load (node:internal/modules/cjs/loader:839:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47
```

Solution:

- Make sure you have created the file `.env` file with the `BOT_TOKEN` variable. The name of file MUST be `.env` and not `sample.env` or `.env.txt`
- Make sure you have set the value in the `.env` file and not in the `sample.env`
- In Windows if you create a file with the name `.env` it will be automatically renamed to `.env.txt`, enable the option to show the file extensions and rename it to `.env`
- If you have created your own project, check that the relative path written in `require("dotenv").config( ... )` is correct

## Useful links

- [Telegraf](https://www.npmjs.com/package/telegraf)
- [Public API](https://github.com/public-apis/public-apis)
- [Rapid API](https://rapidapi.com/collection/list-of-free-apis)
- [OpenAI API](https://platform.openai.com/docs)

## Useful snippets

### Get the chat id of a message

```js
bot.command("id", (ctx) => {
    const chatId = ctx.message.chat.id
    ctx.reply(`Chat id: ${chatId}`)
})
```

### Send a message to a specific chat

```js
bot.telegram.sendMessage(chatId, message)
```

### Retrieve a prop from an object

Method 1:

```js
const { prop } = obj
```

Method 2:

```js
const prop = obj.prop
```

Method 3:

```js
const key = 'prop'
const prop = obj[key]
```

### Set a prop of an object

Method 1:

```js
obj.prop = value
```

Method 2:

```js
key = 'prop'
obj[key] = value
```

### Export a function from a module

Method 1:

```js
module.exports.fn1 = function() {}
module.exports.fn2 = () => {}
```

Method 2:

```js
function fn1() {}
const fn2 = function() {}

module.exports = {
    fn1,
    fn2
}
```

