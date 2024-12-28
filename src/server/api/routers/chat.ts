import { z } from "zod";
import OpenAI from "openai";
import FirecrawlApp, { FirecrawlDocument } from "@mendable/firecrawl-js";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const chatRouter = createTRPCRouter({
  processUrl: protectedProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }) => {
      const url = input.url;
      const firecrawlApp = new FirecrawlApp({
        apiKey: process.env.FIRECRAWL_API_KEY,
      });

      const crawlResponse = await firecrawlApp.crawlUrl(url, {
        limit: 100,
        scrapeOptions: {
          formats: ["markdown", "html"],
        },
      });

      if (!crawlResponse.success) {
        throw new Error(`Failed to scrape: ${crawlResponse.error}`);
      }
      const embeddingStrings = createEmbeddingString(crawlResponse.data);
      const openai = new OpenAI();
      const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: embeddingStrings,
        encoding_format: "float",
      });

      console.log(crawlResponse);
      return { success: true };
    }),

  sendMessage: protectedProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input }) => {
      // Here you would implement the logic to process the message
      // and return the AI response
      return "This is a sample response from the AI.";
    }),
});

function createEmbeddingString(documents: FirecrawlDocument[]): string[] {
  return documents.map((doc) => {
    const url = doc.url ? `URL: ${doc.url}\n` : "";
    const markdown = doc.markdown ? `Markdown: ${doc.markdown}\n` : "";
    const metadata = doc.metadata
      ? `Metadata: ${JSON.stringify(doc.metadata)}\n`
      : "";
    return `${url}${markdown}${metadata}`;
  });
}
