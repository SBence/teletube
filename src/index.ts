import "dotenv/config";
import { Bot } from "grammy";
import errorHandler from "./errorHandler.js";
import { textLinkMessageHandler } from "./events/message/text/handler.js";

async function bootstrap(token: string) {
  const bot = new Bot(token);

  bot.catch(errorHandler);

  bot.command("start", (ctx) =>
    ctx.reply(
      "Hello! When I see a video link I'll tell you some details about it.",
    ),
  );

  bot.on("message:text", textLinkMessageHandler);

  await bot.init();
  console.log(
    `🟢 Running as: ${bot.botInfo.first_name} (@${bot.botInfo.username})`,
  );
  void bot.start();
}

const token = process.env.TOKEN;
if (token) {
  void bootstrap(token);
} else {
  console.error("Token not found in .env file");
}
