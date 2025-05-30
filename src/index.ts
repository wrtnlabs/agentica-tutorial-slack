import { Agentica } from "@agentica/core";
import typia from "typia";
import dotenv from "dotenv";
import { OpenAI } from "openai";

import { SlackService } from "@wrtnlabs/connector-slack";

dotenv.config();

export const agent = new Agentica({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    }),
    model: "gpt-4o-mini",
  },
  controllers: [
    {
      name: "Slack Connector",
      protocol: "class",
      application: typia.llm.application<SlackService, "chatgpt">(),
      execute: new SlackService({
        slackToken: process.env.SLACK_TOKEN!,
      }),
    },
  ],
});

const main = async () => {
  console.log(await agent.conversate("What can you do?"));
};

main();
