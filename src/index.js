const { Telegraf } = require("telegraf")
const { join } = require("path")
const { getHttpCatUrl, getRandomDuckUrl } = require("./utils")

require("dotenv").config({ 
    path: join(__dirname, "../.env") 
})

const {
    BOT_TOKEN,
    ALLOWED_CHAT_IDS,
    ADMIN_CHAT_ID
} = process.env

if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN must be provided!")
}

const bot = new Telegraf(BOT_TOKEN)

const notifyAdmin = (message) => {
    if (ADMIN_CHAT_ID) { 
        bot.telegram.sendMessage(ADMIN_CHAT_ID, message)
    }
}

// Triggered when start the bot (or send /start command)
bot.start((ctx) => {
    ctx.reply(`Hello! Your chat id is ${ctx.message.chat.id}`)
})

// Triggered when send a message
bot.use((ctx, next) => {
    // Apply security on messages check if ALLOWED_CHAT_IDS is provided
    if (ctx.updateType === "message" && ALLOWED_CHAT_IDS) {
        const allowedChatIds = ALLOWED_CHAT_IDS.split(",")

        if (!allowedChatIds.includes(ctx.message.chat.id.toString())) {
            notifyAdmin(`Unauthorized access from chat id ${ctx.message.chat.id}`)
            ctx.reply("You are not authorized to use this bot!")
            return
        }
    }

    // Continue to next middleware
    next()
})

// Triggered when send /tik command
bot.command("tik", (ctx) => {
    ctx.reply("tok")
})

// Triggered when send /echo command
bot.command("echo", (ctx) => {
    const message = ctx.message.text
    ctx.reply(message)
})

// Triggered when send /cat command
bot.command("cat", (ctx) => {
    // Get the arguments from the message
    const args = ctx.message.text.split(" ")
    // remove the first one (the command itself)
    args.shift()

    // Get the first argument: the http code
    const httpCode = args[0]

    if (!httpCode) {
        ctx.reply("You need to provide a http code!")
        return
    }

    try {
        const catUrl = getHttpCatUrl(httpCode)
        ctx.replyWithPhoto(catUrl)
    } catch (err) {
        ctx.reply("An error occurred! Please try with another code or try again later.")
    }
})

// Triggered when send /duck command
bot.command("duck", async(ctx) => {
    const duckUrl = await getRandomDuckUrl()
    ctx.replyWithPhoto(duckUrl)
})

bot.launch({
    dropPendingUpdates: true
})

console.log("Bot started!")

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))