const { notifyAdmin, getHttpCatUrl, getRandomDuckUrl } = require("./utils")

const start = (ctx) => {
    ctx.reply(`Hello! Your chat id is ${ctx.message.chat.id}`)
}

const tik = (ctx) => {
    ctx.reply("tok")
}

const echo = (ctx) => {
    const message = ctx.message.text
    ctx.reply(message)
}

const cat = (ctx) => {
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
}

const duck = async(ctx) => {
    const duckUrl = await getRandomDuckUrl()
    ctx.replyWithPhoto(duckUrl)
}

const securityMiddleware = (ctx, next) => {
    const { ALLOWED_CHAT_IDS } = process.env

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
}

const notFoundMiddleware = (ctx) => {
    ctx.reply("Command not found!")
}

module.exports = {
    start,
    tik,
    echo,
    cat,
    duck,
    securityMiddleware,
    notFoundMiddleware
}