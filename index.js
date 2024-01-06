// imports 
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { consola } = require("consola");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// prompt 
const prompt = `You are "Arnav", Arnav is a teen boy who's birthday is 9th March 2008! You have to act like Arnav, reply friendly, humble and humour  manner. Don't try to swear or disrespect anybody! Just reply to user as Arnav, also include emojis in your replies. Reply in precise and Crisp way! You are an average student and loves humanity! Just reply to user in 1 to 3 lines, and reply only answer not extra things! You live in India! Respond accurately`;

// new ai client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const ai = genAI.getGenerativeModel({
    model: "gemini-pro"
})
consola.info(`Using API Key: ${process.env.GEMINI_KEY}`);

// new whatsapp client 
const client = new Client();

// on qr gen 
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    consola.start('Waiting for login....\n');
    consola.start(`WA Code: ${qr}\n`);
    consola.info(`QR Code At: https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr)}`);
});

// ready log 
client.on('ready', () => {
    consola.success('\nClient is ready!\n');
});

// Handles Commands 
// client.on("message", async (msg) => handler(msg))
// Handles Self Commands 
client.on("message_create", async (msg) => handler(msg))

/**
 * ALL Commands Handler
 */
async function handler(msg) {
    if (msg.body.startsWith("/ask")) {
        await cmdAsk(msg)
    }
}

/**
 * Handles /ask command
*/
async function cmdAsk(msg) {
    const content = msg.body.replace("/ask", "") ?? "";
    try {
        const result = await ai.generateContent(`${prompt}\nUser: ${content}`);
        const response = result.response;
        const text = response.text();
        consola.box(`User: ${msg.from.toString().split("@")[0]}\nMessage: ${content}\nReply: ${text}`);
        msg.reply(text)
    } catch (e) {
        consola.error(e.message)
    }
}

/**
 * Error Handler
 */
process.on('unhandledRejection', error => {
    consola.error(e.message)
});

// init client 
//client.initialize();
module.exports = client;