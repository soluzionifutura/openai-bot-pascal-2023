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

const exchange = async(from) => {
    const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/tools/price-conversion`, {
        params: {
            amount: 1,
            symbol: from,
            convert: "eur"
        },
        headers: {
            "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY
        }
    })

    /* 
        Example response:

        {
            status: {
                timestamp: '2023-09-19T17:47:52.596Z',
                error_code: 0,
                error_message: null,
                elapsed: 14,
                credit_count: 1,
                notice: null
            },
            data: [{
                id: 1,
                symbol: 'BTC',
                name: 'Bitcoin',
                amount: 1,
                last_updated: '2023-09-19T17:46:00.000Z',
                quote: [{
                    EUR: {
                        price: 25472.058195582696,
                        last_updated: '2023-09-19T17:47:05.000Z'
                    }
                }]
            }]
        }    
    */

    let eurPrice = response.data.data[0].quote.EUR.price
    // truncate to 2 decimals
    eurPrice = Math.floor(eurPrice * 100) / 100

    return eurPrice.toString() + "€"
}

module.exports = {
    getRandomDuckUrl,
    getHttpCatUrl,
    notifyAdmin,
    exchange
}
