import TelegramBot from "node-telegram-bot-api";
import express from "express";
import "dotenv/config";

// === INIT ===
const app = express();
const bot = new TelegramBot(process.env.BOT_TOKEN);

app.use(express.json());

// === ENDPOINT WAJIB UNTUK RENDER (BIAR PORT KEDETEKSI) ===
app.get("/", (req, res) => {
  res.send("Bot is running 🚀");
});

// === WEBHOOK ENDPOINT TELEGRAM ===
app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// === TEST PESAN TELEGRAM ===
bot.on("message", (msg) => {
  // hanya izinkan user kamu sendiri
  if (msg.from.id !== Number(process.env.MY_ID)) return;

  bot.sendMessage(
    msg.chat.id,
    "🤖 Bot keuangan aktif!\n\nContoh:\n+50000 gaji\n-25000 kopi\nsaldo"
  );
});

// === START SERVER (WAJIB PAKE process.env.PORT) ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🤖 Bot server running on port", PORT);
});
