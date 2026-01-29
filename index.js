import TelegramBot from "node-telegram-bot-api"
import express from "express"
import "dotenv/config"

const bot = new TelegramBot(process.env.BOT_TOKEN)
const app = express()
app.use(express.json())

// webhook endpoint
app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body)
  res.sendStatus(200)
})

// test pesan
bot.on("message", msg => {
  if (msg.from.id !== Number(process.env.MY_ID)) return

  bot.sendMessage(
    msg.chat.id,
    "🤖 Bot keuangan aktif!\nKetik:\n+50000 gaji\n-25000 kopi\nsaldo"
  )
})

app.listen(process.env.PORT, () =>
  console.log("🚀 Bot server running")
)
