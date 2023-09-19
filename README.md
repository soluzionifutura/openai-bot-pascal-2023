# openai-bot-pascal-2023

Public link: [https://github.com/soluzionifutura/openai-bot-pascal-2023](https://github.com/soluzionifutura/openai-bot-pascal-2023)

Public link: [http://bit.ly/bot-pascal](http://bit.ly/bot-pascal)

## Setup

1. Install [NodeJS](https://nodejs.org/en)
2. Install packages: `npm install`
3. Create a `.env` file with the following content:

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

## Useful links

- [Telegraf](https://www.npmjs.com/package/telegraf)
- [Public API](https://github.com/public-apis/public-apis)
- [Rapid API](https://rapidapi.com/collection/list-of-free-apis)
- [OpenAI API](https://platform.openai.com/docs)

## Useful snippets

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

