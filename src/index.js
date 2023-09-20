const { Telegraf } = require("telegraf")
const { join } = require("path")
const OpenAI = require("openai")
const commands = require("./commands")
const utils = require("./utils")

require("dotenv").config({ 
    path: join(__dirname, "../.env") 
})

const {
    BOT_TOKEN,
    OPENAI_API_KEY
} = process.env

if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN must be provided!")
}

if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY must be provided!")
}

const bot = new Telegraf(BOT_TOKEN)
const openai = new OpenAI(OPENAI_API_KEY)

bot.start(commands.start)
bot.use(commands.securityMiddleware)
bot.command("tik", commands.tik)
bot.command("echo", commands.echo)
bot.command("cat", commands.cat)
bot.command("duck", commands.duck)

const history = {}

bot.on("message", async(ctx) => {
    const message = ctx.message.text
    const id = ctx.message.chat.id

    const functions = [{
        name: "exchange",
        description: "Converts a crypto currency to EUR",
        parameters: {
            type: "object",
            properties: {
                from: {
                    type: "string",
                    description: "The crypto currency to convert"
                }
            },
            required: ["from"]
        },
    }]

    ctx.reply("Thinking...")

    // Initialize the history of the conversation
    if (history[id] === undefined) {
        history[id] = [{
            role: "system",
            content: "Sei il massimo esperto di cryptovalute"
        }]
    }

    try {
        history[id].push({
            role: "user", 
            content: message
        })

        const completion = await openai.chat.completions.create({
            messages: history[id],
            functions,
            model: 'gpt-3.5-turbo'
        })

        // Get the first response and save it in the history
        const response = completion.choices[0].message
        history[id].push(response)

         // If chatgpt require a function call
        if (response.function_call) {
            const availableFunctions = {
                exchange: utils.exchange,
            }
    
            const functionName = response.function_call.name
            const functionToCall = availableFunctions[functionName]
            const functionArgs = JSON.parse(response.function_call.arguments)
            const functionResponse = await functionToCall(functionArgs)
    
            history[id].push({
                "role": "function",
                "name": functionName,
                "content": functionResponse
            })

            const secondCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: history[id]
            })

            const secondResponse = secondCompletion.choices[0].message
            history[id].push(secondResponse)

            // Reply to the user
            ctx.reply(secondResponse.content)
        } else {
            // Reply to the user
            ctx.reply(response.content)
        }
    } catch (err) {
        ctx.reply(`An error occurred: ${err.message}`)
    }
})

bot.launch({
    dropPendingUpdates: true
})

console.log("Bot started!")

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))