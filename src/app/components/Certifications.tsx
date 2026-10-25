import { motion } from "motion/react";
import { Award, Calendar } from "lucide-react";
import { FadeIn } from "./TextReveal";
import { type Language, t } from "../i18n";

const certifications = [
	{
		title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
		issuer: "Microsoft",
		status: "planned",
		accent: "#3B82F6",
	},
	{
		title: "Google Data Analytics Professional Certificate",
		issuer: "Google / Coursera",
		status: "planned",
		accent: "#10B981",
	},
	{
		title: "Oracle Cloud Infrastructure Foundations Associate",
		issuer: "Oracle",
		status: "planned",
		accent: "#F59E0B",
	},
];

export function Certifications({ language }: { language: Language }) {
	return (
		<section id="certifications" className="relative py-24 sm:py-32">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
				<FadeIn>
					<div className="mb-12">
						<p className="text-xs font-mono uppercase tracking-[0.3em] text-[#3B82F6] mb-4">
							{t(language, "cert.badge")}
						</p>
						<h2 className="text-3xl sm:text-4xl md:text-5xl text-[#EDEDED] mb-4">
							{t(language, "cert.heading")}
						</h2>
						<p className="text-[#71717A] max-w-2xl">
							{t(language, "cert.subtitle")}
						</p>
					</div>
				</FadeIn>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{certifications.map((cert, index) => (
						<motion.div
							key={cert.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ delay: index * 0.08, duration: 0.5 }}
							className="border border-[#27272A] p-6 relative overflow-hidden"
							style={{ borderRadius: "8px", backgroundColor: "#0B0B0C" }}
						>
							<div
								className="absolute top-0 left-0 right-0 h-[2px]"
								style={{
									background: `linear-gradient(90deg, ${cert.accent} 0%, transparent 100%)`,
								}}
							/>
							<div className="flex items-start gap-4">
								<div
									className="p-2.5 border border-[#27272A]"
									style={{ borderRadius: "8px", color: cert.accent }}
								>
									<Award className="w-5 h-5" />
								</div>
								<div className="flex-1">
									<h3 className="text-[#EDEDED] text-lg mb-1 leading-snug">
										{cert.title}
									</h3>
									<p className="text-[#71717A] text-sm mb-3">{cert.issuer}</p>
									<span
										className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-2.5 py-1 border"
										style={{
											color: cert.accent,
											borderColor: `${cert.accent}40`,
											borderRadius: "6px",
											backgroundColor: `${cert.accent}10`,
										}}
									>
										<Calendar className="w-3.5 h-3.5" />
										{t(language, "cert.statusPlanned")}
									</span>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
