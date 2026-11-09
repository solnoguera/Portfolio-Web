import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@company.com");
  await user.type(screen.getByLabelText("Message"), "We'd love to talk about a senior role.");
}

describe("ContactForm", () => {
  it("focuses the first invalid field and links its error message", async () => {
    const user = userEvent.setup();
    const sender = vi.fn();
    render(<ContactForm sender={sender} />);

    await user.click(screen.getByRole("button", { name: "Send message" }));

    const name = screen.getByLabelText("Name");
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("Please enter your name.");
    expect(sender).not.toHaveBeenCalled();
  });

  it("sends the form data and announces success", async () => {
    const user = userEvent.setup();
    const sender = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm sender={sender} />);

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(sender).toHaveBeenCalledOnce();
    const data = sender.mock.calls[0][0] as FormData;
    expect(data.get("email")).toBe("ada@company.com");
    expect(await screen.findByRole("status")).toHaveTextContent(/Thanks!/);
    expect(screen.getByLabelText("Name")).toHaveValue("");
  });

  it("shows an email fallback when sending fails", async () => {
    const user = userEvent.setup();
    const sender = vi.fn().mockRejectedValue(new Error("network"));
    render(<ContactForm sender={sender} />);

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByRole("link", { name: "noguerasol22@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:noguerasol22@gmail.com",
    );
    // The user's message is kept so they can retry or copy it.
    expect(screen.getByLabelText("Message")).toHaveValue("We'd love to talk about a senior role.");
  });

  it("disables the submit button while sending", async () => {
    const user = userEvent.setup();
    let resolve!: () => void;
    const sender = vi.fn(() => new Promise<void>((r) => (resolve = r)));
    render(<ContactForm sender={sender} />);

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    resolve();
    expect(await screen.findByRole("button", { name: "Send message" })).toBeEnabled();
  });
});
