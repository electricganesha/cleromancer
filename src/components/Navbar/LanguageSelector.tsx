import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/i18n/routing";

export function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split("/")[1];

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    const segments = pathname.split("/");
    // If the first segment is not a supported locale, insert it
    if (!locales.includes(segments[1])) {
      router.push(`/${newLocale}${pathname === "/" ? "" : pathname}`);
    } else {
      segments[1] = newLocale;
      router.push(segments.join("/") || "/");
    }
  }

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      style={{
        marginRight: 48,
        background: "rgba(255,255,255,0.1)",
        border: "1px solid #ccc",
        borderRadius: 18,
        padding: "4px 12px",
        color: "inherit",
        outline: "none",
        cursor: "pointer",
        fontSize: "0.95em",
        transition: "border-color 0.2s, background 0.2s",
      }}
    >
      {locales.map((loc) => (
        <option
          key={loc}
          value={loc}
          style={{
            background: "#fff",
            color: "#222",
            borderRadius: 12,
          }}
        >
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
