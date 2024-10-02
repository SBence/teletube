# TeleTube

A Telegram bot that provides extra inforamtion on video links

## Preparation

### Creating a bot on Telegram

Creating a bot is done through [@BotFather](https://t.me/BotFather). See the [official documentation](https://core.telegram.org/bots/features#creating-a-new-bot) for more details.

**Make sure to disable [privacy mode](https://core.telegram.org/bots/features#privacy-mode) to allow the bot to work in group chats as well.**

### Project installation

1. Install dependencies:

   ```sh
   yarn install
   ```

2. Add your bot token from BotFather to the `.env` file in the project directory:

   ```properties
   TOKEN=<insert your Telegram bot token here>
   ```

## Development

### Running the bot

```sh
yarn run dev:start
```

### Building for production

```sh
yarn run build
```

Build files will be output to `build/prod`.

## Deployment

_The steps below should be done in the deployment environment._

1. Copy the contents of the `build/prod` folder to the desired location on the server.
2. Follow the steps in the [Project installation](#project-installation) section.
3. Run the bot:

   ```sh
   node index.cjs
   ```

## Usage

The bot automatically replies to messages containing video links.
