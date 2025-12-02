import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en"); // Change to your defaultLocale if needed
}
