import { describe, expect, it } from "vitest";

import { parseHtml } from "@/services/parser.service";

describe("parseHtml", () => {
  it("extracts seo information", () => {
    const html = `
      <html>
        <head>
          <title>My Website</title>
          <meta
            name="description"
            content="Awesome website"
          />
        </head>

        <body>
          <h1>Hello</h1>
          <h1>World</h1>
        </body>
      </html>
    `;

    const result = parseHtml(html);

    expect(result.title).toBe("My Website");
    expect(result.description).toBe("Awesome website");
    expect(result.h1Count).toBe(2);
  });

  it("handles missing seo tags", () => {
    const result = parseHtml("<html></html>");

    expect(result.title).toBeNull();
    expect(result.description).toBeNull();
    expect(result.h1Count).toBe(0);
  });
});