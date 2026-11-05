export type CertificationStatus = "in-progress" | "issued";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  short: string;
  accent: string;
  status: CertificationStatus;
  year: string;
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    id: "az-900",
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    short: "AZ-900",
    accent: "#60A5FA",
    status: "in-progress",
    year: "2026",
  },
  {
    id: "google-data-analytics",
    title: "Google Data Analytics",
    issuer: "Google · Coursera",
    short: "GDA",
    accent: "#34D399",
    status: "in-progress",
    year: "2026",
  },
  {
    id: "oci-foundations",
    title: "Oracle Cloud Infrastructure Foundations",
    issuer: "Oracle",
    short: "OCI",
    accent: "#F87171",
    status: "in-progress",
    year: "2026",
  },
];
