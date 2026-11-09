export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Please enter a valid email, like name@company.com.";
  if (values.message.trim().length < 10) errors.message = "Please write a message of at least 10 characters.";
  return errors;
}

/** Getform endpoint; override per environment with NEXT_PUBLIC_FORM_ENDPOINT. */
export const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "https://getform.io/f/4554dc0a-840e-446c-9f9d-249c51844019";

export async function sendContact(data: FormData, endpoint = FORM_ENDPOINT): Promise<void> {
  const response = await fetch(endpoint, {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Form endpoint responded ${response.status}`);
}
