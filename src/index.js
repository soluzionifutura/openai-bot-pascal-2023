const { Telegraf } = require("telegraf")
const { join } = require("path")

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

// Triggered when start the bot (or send /start command)
bot.start((ctx) => {
    ctx.reply("Hello!")
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
    ctx.replyWithPhoto("https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg")
})

bot.launch({
    dropPendingUpdates: true
})

console.log("Bot started!")

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))