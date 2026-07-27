import { describe, expect, it } from "vitest";

import { validateAuditRequest } from "@/validators/audit.validator";
import { AppError } from "@/lib/errors";

describe("validateAuditRequest", () => {
  it("accepts a valid https url", () => {
    expect(
      validateAuditRequest({
        url: "https://example.com",
      })
    ).toBe("https://example.com/");
  });

  it("adds https if protocol is missing", () => {
    expect(
      validateAuditRequest({
        url: "example.com",
      })
    ).toBe("https://example.com/");
  });

  it("rejects empty body", () => {
    expect(() =>
      validateAuditRequest({})
    ).toThrow(AppError);
  });

  it("rejects localhost", () => {
    expect(() =>
      validateAuditRequest({
        url: "http://localhost:3000",
      })
    ).toThrow(AppError);
  });

  it("rejects private ip", () => {
    expect(() =>
      validateAuditRequest({
        url: "http://192.168.1.10",
      })
    ).toThrow(AppError);
  });

  it("rejects invalid hostname", () => {
    expect(() =>
      validateAuditRequest({
        url: "abc",
      })
    ).toThrow(AppError);
  });

  it("rejects ftp protocol", () => {
    expect(() =>
      validateAuditRequest({
        url: "ftp://example.com",
      })
    ).toThrow(AppError);
  });
});