import * as cheerio from "cheerio";

export function parseHtml(html: string) {
  const $ = cheerio.load(html);

  const title = $("title").text().trim() || null;

  const description =
    $('meta[name="description"]').attr("content")?.trim() ?? null;

  const h1Count = $("h1").length;

  return {
    title,
    description,
    h1Count,
  };
}