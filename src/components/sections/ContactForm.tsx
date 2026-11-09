"use client";

import { useRef, useState, type FormEvent } from "react";
import { profile } from "@/content/profile";
import { sendContact, validateContact, type ContactErrors, type ContactValues } from "@/lib/contact";
import { Button } from "../ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const fields: {
  name: keyof ContactValues;
  label: string;
  type: "text" | "email" | "textarea";
  autoComplete: string;
}[] = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "message", label: "Message", type: "textarea", autoComplete: "off" },
];

const inputClasses =
  "mt-2 block w-full border-2 border-border-strong bg-surface px-3 py-2.5 text-base text-fg " +
  "placeholder:text-muted focus-visible:border-accent aria-[invalid=true]:border-accent";

export function ContactForm({ sender = sendContact }: { sender?: typeof sendContact }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: ContactValues = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    const firstInvalid = fields.find((f) => nextErrors[f.name]);
    if (firstInvalid) {
      // Move focus to the first problem; its error is announced via aria-describedby.
      const field = form.elements.namedItem(firstInvalid.name);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    setStatus("submitting");
    try {
      await sender(data);
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-labelledby="contact-title" className="space-y-6">
      {fields.map(({ name, label, type, autoComplete }) => {
        const error = errors[name];
        const errorId = `${name}-error`;
        const shared = {
          id: name,
          name,
          autoComplete,
          required: true,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId : undefined,
          className: inputClasses,
        };
        return (
          <div key={name}>
            <label htmlFor={name} className="font-mono text-sm font-semibold">
              {label}
            </label>
            {type === "textarea" ? <textarea rows={6} {...shared} /> : <input type={type} {...shared} />}
            {error && (
              <p id={errorId} className="mt-2 text-sm font-medium text-accent">
                {error}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot: hidden from people and assistive tech, bots fill it and Getform drops the submission. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="_gotcha">Leave this field empty</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
        <p role="status" aria-live="polite" className="text-sm">
          {status === "success" && "Thanks! Your message is on its way. I'll get back to you soon."}
          {status === "error" && (
            <>
              Something went wrong sending your message. Please email me at{" "}
              <a href={`mailto:${profile.email}`} className="font-semibold text-accent underline">
                {profile.email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
