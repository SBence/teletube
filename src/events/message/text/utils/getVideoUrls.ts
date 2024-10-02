import { Message } from "grammy/types";

const videoURLRegex =
  /https?:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([a-zA-Z0-9-_]{11})(&(amp;)?[\w?=]*)?/;

export default (message: Message) => {
  if (!message.text || !message.entities) return [];

  const videoUrls = [];

  for (const entity of message.entities) {
    switch (entity.type) {
      case "text_link": {
        const currentUrl = entity.url;
        if (videoURLRegex.test(currentUrl)) videoUrls.push(currentUrl);
        break;
      }

      case "url": {
        const currentUrl = message.text.substring(
          entity.offset,
          entity.offset + entity.length,
        );
        if (videoURLRegex.test(currentUrl)) videoUrls.push(currentUrl);
        break;
      }

      default:
        break;
    }
  }

  return videoUrls;
};
