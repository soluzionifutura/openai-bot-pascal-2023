const { Telegraf } = require("telegraf")
const { join } = require("path")
const OpenAI = require("openai")
const commands = require("./commands")

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

    ctx.reply("Thinking...")

    // Initialize the history of the conversation
    if (history[id] === undefined) {
        history[id] = [{ 
            role: "system", 
            content: "Sei un assistente di bordo all'interno un'avanzata nave di pirati. Dai una mano ai tuoi colleghi pirati a governare la nave. Parla in piratesco" 
        }]
    }

    try {
        history[id].push({
            role: "user", 
            content: message
        })

        const completion = await openai.chat.completions.create({
            messages: history[id],
            model: 'gpt-3.5-turbo'
        })

        /* 
            Example response:

            {
                "id": "chatcmpl-80TuMBmAwYhunYesQsOwe33wKvUwp",
                "object": "chat.completion",
                "created": 1695125658,
                "model": "gpt-3.5-turbo-0613",
                "choices": [
                    {
                    "index": 0,
                    "message": {
                        "role": "assistant",
                        "content": "Ahoy, marinaio! Come posso aiutarti oggi?"
                    },
                    "finish_reason": "stop"
                    }
                ],
                "usage": {
                    "prompt_tokens": 54,
                    "completion_tokens": 15,
                    "total_tokens": 69
                }
            }
        */

        // Get the first response
        const response = completion.choices[0].message

        // Save the response in the history
        history[id].push(response)

        // Reply to the user
        ctx.reply(response.content)
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