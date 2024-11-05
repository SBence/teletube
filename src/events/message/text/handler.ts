import ytdl from "@distube/ytdl-core";
import { Context } from "grammy";
import getVideoUrls from "./utils/getVideoUrls.js";
import secondsToHMS from "./utils/secondsToHMS.js";
import ytdlDateToHumanReadable from "./utils/ytdlDateToHumanReadable.js";

interface videoInfoMessageElement {
  emoji: string;
  value: string;
}

export async function textLinkMessageHandler(ctx: Context) {
  if (!ctx.message || !ctx.from || ctx.from.is_bot) return;
  const videoUrls = getVideoUrls(ctx.message);

  for (const videoURL of videoUrls) {
    const details = (await ytdl.getBasicInfo(videoURL)).videoDetails;
    const videoInfoMessageElements: videoInfoMessageElement[] = [
      {
        emoji: "👁️",
        value: parseInt(details.viewCount).toLocaleString("fr-FR"),
      },
      {
        emoji: "📤",
        value: ytdlDateToHumanReadable(details.uploadDate),
      },
    ];

    if (details.lengthSeconds !== "0")
      videoInfoMessageElements.unshift({
        emoji: "⏱️",
        value: secondsToHMS(details.lengthSeconds),
      });

    if (details.uploadDate !== details.publishDate)
      videoInfoMessageElements.push({
        emoji: "📢",
        value: ytdlDateToHumanReadable(details.publishDate),
      });

    if (details.media.game)
      videoInfoMessageElements.push({
        emoji: "🎮",
        value: details.media.game,
      });

    if (details.media.song) {
      const artist = details.media.artist;
      videoInfoMessageElements.push({
        emoji: "🔊",
        value: artist
          ? `${artist} - ${details.media.song}`
          : details.media.song,
      });
    }

    const replyMessage =
      `<b>${details.title}</b>\n` +
      videoInfoMessageElements
        .map((element) => `${element.emoji} ${element.value}`)
        .join("\n");

    await ctx.reply(replyMessage, { parse_mode: "HTML" });
  }
}
