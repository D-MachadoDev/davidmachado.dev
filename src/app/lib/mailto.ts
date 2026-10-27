export const CONTACT_EMAIL = "davidmachado.dev07@gmail.com";

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Portfolio contact")}`;

export interface ContactDraft {
	name: string;
	email: string;
	message: string;
}

/**
 * Builds a mailto URL for the contact form. This is the only delivery path:
 * the page never claims a message was sent, because it cannot know.
 */
export function buildMailtoUrl({ name, email, message }: ContactDraft): string {
	const subject = `Portfolio contact — ${name.trim()}`;
	const body = [
		`Name: ${name.trim()}`,
		`Email: ${email.trim()}`,
		"",
		message.trim(),
	].join("\n");

	return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
