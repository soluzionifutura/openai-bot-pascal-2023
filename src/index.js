const { Telegraf } = require("telegraf")
const { join } = require("path")
const commands = require("./commands")

require("dotenv").config({ 
    path: join(__dirname, "../.env") 
})

const {
    BOT_TOKEN
} = process.env

if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN must be provided!")
}

const bot = new Telegraf(BOT_TOKEN)

bot.start(commands.start)
bot.use(commands.securityMiddleware)
bot.command("tik", commands.tik)
bot.command("echo", commands.echo)
bot.command("cat", commands.cat)
bot.command("duck", commands.duck)
bot.use(commands.notFoundMiddleware)

bot.launch({
    dropPendingUpdates: true
})

console.log("Bot started!")

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))