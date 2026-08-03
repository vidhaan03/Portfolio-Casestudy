import type { Metadata } from "next";
import { ResumeView } from "./ResumeView";

export const metadata: Metadata = {
  title: "Résumé, Vidhan Dubey",
  description: "Résumé of Vidhan Dubey, product designer who codes.",
};

export default function ResumePage() {
  return <ResumeView />;
}
