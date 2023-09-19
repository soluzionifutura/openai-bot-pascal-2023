const axios = require('axios')

// Documentation: https://random-d.uk/api
const getRandomDuckUrl = async() => {

    /* 
        axios.get is a asynchronous function, so we need to await it
        To await a function, we need to make the function we are calling async
    */

    const data = await axios.get("https://random-d.uk/api/v2/random?type=jpg")

    /* 
        Example response:

        {
            "message": "Powered by random-d.uk",
            "url": "https://random-d.uk/api/79.jpg"
        }
    */

    return data.data.url
}

// Documentation: https://http.cat
const getHttpCatUrl = (code) => {
    return `https://http.cat/${code}`
}

const notifyAdmin = (bot, message) => {
    const { ADMIN_CHAT_ID } = process.env

    if (ADMIN_CHAT_ID) { 
        bot.telegram.sendMessage(ADMIN_CHAT_ID, message)
    }
}

module.exports = {
    getRandomDuckUrl,
    getHttpCatUrl,
    notifyAdmin
}
