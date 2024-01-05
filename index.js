// imports 
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { consola } = require("consola");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// prompt 
const prompt = `Your are arnav`;

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
    consola.start('Waiting for login....\n', qr);
});

// ready log 
client.on('ready', () => {
    consola.success('Client is ready!');
});

// Handles Commands 
client.on("message", async (msg) => {
    if (msg.body.startsWith("/ask")) {
        await cmdAsk(msg)
    }
})

// Handles Self Commands 
client.on("message_create", async (msg) => {
    if (msg.body.startsWith("/ask")) {
        await cmdAsk(msg)
    }
})

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

// init client 
client.initialize();
