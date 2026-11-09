import { describe, expect, it } from "vitest";
import { validateContact } from "./contact";

const valid = { name: "Ada", email: "ada@company.com", message: "Let's talk about a role." };

describe("validateContact", () => {
  it("accepts a complete message", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires every field, ignoring whitespace", () => {
    expect(validateContact({ name: "  ", email: "", message: "" })).toEqual({
      name: "Please enter your name.",
      email: "Please enter your email.",
      message: "Please write a message of at least 10 characters.",
    });
  });

  it.each(["ada", "ada@", "ada@company", "ada company@x.com"])("rejects invalid email %s", (email) => {
    expect(validateContact({ ...valid, email }).email).toMatch(/valid email/);
  });

  it("rejects messages shorter than 10 characters", () => {
    expect(validateContact({ ...valid, message: "Hi there" }).message).toBeDefined();
  });
});
