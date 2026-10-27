import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { type ComponentType, useState, type FormEvent } from "react";
import { buildMailtoUrl, CONTACT_EMAIL, CONTACT_MAILTO } from "../lib/mailto";
import { FadeIn } from "./TextReveal";
import { MagneticButton } from "./MagneticButton";
import { type Language, type TranslationKey, t } from "../i18n";

interface ContactProps {
	language: Language;
}

const contactLinks: {
	icon: ComponentType<{ className?: string }>;
	labelKey: TranslationKey;
	value: string;
	href: string;
	external: boolean;
}[] = [
	{
		icon: Mail,
		labelKey: "contact.email",
		value: CONTACT_EMAIL,
		href: CONTACT_MAILTO,
		external: false,
	},
	{
		icon: FaGithub,
		labelKey: "contact.github",
		value: "@D-MachadoDev",
		href: "https://github.com/D-MachadoDev",
		external: true,
	},
	{
		icon: FaLinkedinIn,
		labelKey: "contact.linkedin",
		value: "David Machado",
		href: "https://www.linkedin.com/in/david-machado-94b3921a2/",
		external: true,
	},
];

function ContactForm({ language }: { language: Language }) {
	const [formState, setFormState] = useState<"idle" | "opened">("idle");
	const [formData, setFormData] = useState({ name: "", email: "", message: "" });

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		window.location.href = buildMailtoUrl(formData);
		setFormState("opened");
	};

	const inputClasses =
		"w-full bg-[#0A0A0A] border border-[#27272A] text-[#EDEDED] px-4 py-3 sm:py-4 font-mono text-sm focus:border-[#3B82F6] focus:outline-none transition-colors placeholder:text-[#3a3a3a]";

	return (
		<motion.form
			onSubmit={handleSubmit}
			className="border border-[#27272A] p-6 sm:p-8 md:p-10 relative overflow-hidden group hover:border-[#3B82F6]/20 transition-all duration-500"
			style={{ borderRadius: "12px" }}
		>
			<motion.div
				className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
				style={{
					background:
						"radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.04) 0%, transparent 60%)",
				}}
			/>

			<div className="relative z-10">
				<h3 className="text-xl sm:text-2xl text-[#EDEDED] mb-2">
					{t(language, "contact.formTitle")}
				</h3>
				<p className="text-xs sm:text-sm text-[#71717A] mb-6 sm:mb-8 leading-relaxed">
					{t(language, "contact.formHint")}
				</p>

				<AnimatePresence mode="wait">
					{formState === "opened" ? (
						<motion.div
							key="opened"
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0 }}
							className="flex flex-col items-center justify-center py-10 gap-4 text-center"
						>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 200, damping: 15 }}
							>
								<CheckCircle className="w-14 h-14 text-[#3B82F6]" />
							</motion.div>

							<p className="text-[#EDEDED] text-lg font-medium">
								{t(language, "contact.draftReady")}
							</p>
							<p className="text-[#71717A] text-sm max-w-sm leading-relaxed">
								{t(language, "contact.draftReadySub")}
							</p>

							<div className="flex flex-wrap items-center justify-center gap-3 pt-2">
								<a
									href={`mailto:${CONTACT_EMAIL}`}
									className="text-sm font-mono text-[#60A5FA] hover:text-[#93C5FD] transition-colors break-all"
								>
									{CONTACT_EMAIL}
								</a>
								<button
									type="button"
									onClick={() => setFormState("idle")}
									className="text-xs font-mono text-[#71717A] hover:text-[#EDEDED] transition-colors"
								>
									{t(language, "contact.editDraft")}
								</button>
							</div>
						</motion.div>
					) : (
						<motion.div
							key="form"
							initial={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="space-y-4 sm:space-y-5"
						>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
								<div>
									<label
										htmlFor="contact-name"
										className="block text-xs font-mono text-[#71717A] uppercase tracking-wider mb-2"
									>
										{t(language, "contact.labelName")}
									</label>
									<input
										id="contact-name"
										type="text"
										required
										autoComplete="name"
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										className={inputClasses}
										style={{ borderRadius: "8px" }}
										placeholder={t(language, "contact.placeholderName")}
									/>
								</div>

								<div>
									<label
										htmlFor="contact-email"
										className="block text-xs font-mono text-[#71717A] uppercase tracking-wider mb-2"
									>
										{t(language, "contact.labelEmail")}
									</label>
									<input
										id="contact-email"
										type="email"
										required
										autoComplete="email"
										value={formData.email}
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
										className={inputClasses}
										style={{ borderRadius: "8px" }}
										placeholder={t(language, "contact.placeholderEmail")}
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="contact-message"
									className="block text-xs font-mono text-[#71717A] uppercase tracking-wider mb-2"
								>
									{t(language, "contact.labelMessage")}
								</label>
								<textarea
									id="contact-message"
									required
									rows={5}
									value={formData.message}
									onChange={(e) =>
										setFormData({ ...formData, message: e.target.value })
									}
									className={`${inputClasses} resize-none`}
									style={{ borderRadius: "8px" }}
									placeholder={t(language, "contact.placeholderMessage")}
								/>
							</div>

							<motion.button
								type="submit"
								className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#3B82F6] text-[#EDEDED] font-medium hover:bg-[#2563EB] transition-all relative overflow-hidden"
								style={{ borderRadius: "8px" }}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<span>{t(language, "contact.openDraft")}</span>
								<Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</motion.button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.form>
	);
}

export function Contact({ language }: ContactProps) {
	return (
		<section
			id="contact"
			className="min-h-screen py-16 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-12 relative flex items-center"
		>
			<div className="max-w-6xl mx-auto w-full">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-12 sm:mb-16">
					<div className="flex flex-col">
						<FadeIn>
							<div className="text-left mb-12">
								<motion.div
									className="inline-block px-4 py-2 border border-[#27272A] mb-6 backdrop-blur-sm"
									style={{ borderRadius: "8px" }}
								>
									<span className="text-xs sm:text-sm font-mono text-[#71717A] uppercase tracking-wider">
										{t(language, "contact.badge")}
									</span>
								</motion.div>

								<h2 className="text-5xl lg:text-6xl text-[#EDEDED] mb-6 sm:mb-8 tracking-tight leading-tight text-balance">
									{t(language, "contact.heading")}
									<br />
									<span className="text-[#3B82F6]">
										{t(language, "contact.headingAccent")}
									</span>
								</h2>

								<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#71717A] max-w-xl leading-relaxed">
									{t(language, "contact.subtitle")}
								</p>
							</div>
						</FadeIn>

						<FadeIn delay={0.4}>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-4">
								<div className="flex items-start gap-3 sm:gap-4">
									<div
										className="p-3 border border-[#27272A] hover:border-[#10B981]/30 transition-all relative shrink-0"
										style={{ borderRadius: "8px" }}
									>
										<motion.div
											className="w-3 h-3 rounded-full bg-[#10B981]"
											animate={{ opacity: [1, 0.3, 1] }}
											transition={{ duration: 2, repeat: Infinity }}
										/>
									</div>

									<div>
										<div className="text-xs sm:text-sm text-[#71717A] mb-1 font-mono uppercase tracking-wider">
											{t(language, "contact.availability")}
										</div>
										<div className="text-[#EDEDED] font-medium text-base sm:text-lg">
											{t(language, "contact.availStatus")}
										</div>
									</div>
								</div>

								<div className="flex items-start gap-3 sm:gap-4">
									<div
										className="p-3 border border-[#27272A] hover:border-[#3B82F6]/30 transition-all shrink-0"
										style={{ borderRadius: "8px" }}
									>
										<div className="text-[#3B82F6] font-mono text-sm font-bold">
											UTC
										</div>
									</div>

									<div>
										<div className="text-xs sm:text-sm text-[#71717A] mb-1 font-mono uppercase tracking-wider">
											{t(language, "contact.timezone")}
										</div>
										<div className="text-[#EDEDED] font-medium text-base sm:text-lg font-mono">
											UTC-5
										</div>
									</div>
								</div>
							</div>
						</FadeIn>
					</div>

					<div className="flex flex-col gap-12 lg:w-full">
						<FadeIn delay={0.2}>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
								{contactLinks.map((link, index) => {
									const Icon = link.icon;

									return (
										<motion.div
											key={link.labelKey}
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
										>
											<MagneticButton
												href={link.href}
												target={link.external ? "_blank" : undefined}
												rel={link.external ? "noopener noreferrer" : undefined}
												className="group border border-[#27272A] p-5 hover:border-[#3B82F6] transition-all duration-300 flex flex-col items-start gap-4 relative overflow-hidden block w-full"
												style={{ borderRadius: "10px" }}
											>
												<motion.div
													className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
													style={{
														background:
															"radial-gradient(circle at 0% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
													}}
												/>

												<motion.div
													whileHover={{ scale: 1.08, rotate: 4 }}
													className="relative p-3 border border-[#27272A] group-hover:border-[#3B82F6] transition-all shrink-0"
													style={{ borderRadius: "8px" }}
												>
													<Icon className="w-5 h-5 text-[#3B82F6] relative z-10" />
												</motion.div>

												<div className="w-full text-left relative z-10 min-w-0">
													<div className="text-xs text-[#71717A] mb-0.5 font-mono uppercase tracking-wider">
														{t(language, link.labelKey)}
													</div>
													<div className="text-[#EDEDED] group-hover:text-[#3B82F6] transition-colors font-medium text-sm break-words leading-snug">
														{link.labelKey === "contact.email" ? (
															<>
																{link.value.split("@")[0]}@<wbr />
																{link.value.split("@")[1]}
															</>
														) : (
															link.value
														)}
													</div>
												</div>

												<Send className="absolute right-4 top-4 w-4 h-4 text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity" />
											</MagneticButton>
										</motion.div>
									);
								})}
							</div>
						</FadeIn>

						<FadeIn delay={0.4}>
							<ContactForm language={language} />
						</FadeIn>
					</div>
				</div>

				<FadeIn delay={0.6}>
					<div className="mt-24 sm:mt-32 pt-8 sm:pt-10 border-t border-[#27272A]">
						<div className="flex flex-col md:flex-row items-center justify-between gap-6">
							<div className="text-center md:text-left">
								<p className="text-sm text-[#71717A] font-mono mb-2">
									{t(language, "contact.copyright")}
								</p>
								<p className="text-xs text-[#71717A]">
									{t(language, "contact.tagline")}
								</p>
							</div>

							<div className="flex items-center gap-3 sm:gap-4">
								{contactLinks.slice(1).map((link) => (
									<MagneticButton
										key={link.href}
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 text-[#71717A] hover:text-[#3B82F6] transition-colors border border-transparent hover:border-[#3B82F6]/20"
										style={{ borderRadius: "8px" }}
										aria-label={t(language, link.labelKey as TranslationKey)}
									>
										<link.icon className="w-5 h-5" />
									</MagneticButton>
								))}
							</div>
						</div>

						<div className="mt-8 text-center">
							<p className="text-xs text-[#71717A] font-mono">
								{t(language, "contact.builtWith")}
							</p>
						</div>
					</div>
				</FadeIn>
			</div>
		</section>
	);
}
