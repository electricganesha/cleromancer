/**
 * Script to generate i18n translation files using DeepL API
 *
 * Usage:
 * 1. Set DEEPL_API_KEY environment variable
 * 2. Run: DEEPL_API_KEY="your-key" npx tsx scripts/generate-translations.ts
 *    Or: npx tsx --env-file=.env.local scripts/generate-translations.ts
 *
 * This will generate translation files in src/locales/{lang}/translation.json
 */

import * as fs from "fs";
import * as path from "path";
import ichingWilhelmTranslation from "../src/data/iching_wilhelm_translation";

// Supported languages for DeepL
const TARGET_LANGUAGES = [
  "PT-PT", // Portuguese (Portugal)
  "PT-BR", // Portuguese (Brazil)
  "ES", // Spanish
  "FR", // French
  "DE", // German
  "IT", // Italian
  "ZH", // Chinese (simplified)
  "JA", // Japanese
  "KO", // Korean
  // Add more languages as needed
];

interface TranslationStructure {
  hexagrams: Record<
    number,
    {
      name: string;
      symbolic: string;
      judgment: {
        text: string;
        comments: string;
      };
      image: {
        text: string;
        comments: string;
      };
      lines: Record<
        number,
        {
          text: string;
          comments: string;
        }
      >;
    }
  >;
  ui: {
    home: string;
    about: string;
    history: string;
    profile: string;
    signIn: string;
    signOut: string;
    tossCoins: string;
    tossAgain: string;
    inputTosses: string;
    resetTosses: string;
    viewDetails: string;
    hideDetails: string;
    setIntention: string;
    hexagramReceived: string;
    interpretation: string;
    symbolism: string;
    judgment: string;
    image: string;
    lines: string;
    lowerTrigram: string;
    upperTrigram: string;
    hexagramNumber: string;
    originalText: string;
    comments: string;
    totalReadings: string;
    thisMonth: string;
    uniqueHexagrams: string;
    recentConsultations: string;
    noHistory: string;
    loading: string;
    manualToss: string;
    automaticToss: string;
  };
}

async function translateText(
  text: string,
  targetLang: string,
  apiKey: string
): Promise<string> {
  const response = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: [text],
      target_lang: targetLang,
      source_lang: "EN",
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepL API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.translations[0].text;
}

async function translateBatch(
  texts: string[],
  targetLang: string,
  apiKey: string
): Promise<string[]> {
  // DeepL allows up to 50 texts per request
  const batchSize = 50;
  const results: string[] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);

    // Validate and clean the batch - ensure all are strings and non-empty
    const cleanedBatch = batch
      .filter(
        (text) =>
          text != null && typeof text === "string" && text.trim().length > 0
      )
      .map((text) => String(text).trim());

    if (cleanedBatch.length === 0) {
      console.warn(`Skipping empty batch ${i / batchSize + 1}`);
      continue;
    }

    console.log(
      `Translating batch ${i / batchSize + 1} of ${Math.ceil(
        texts.length / batchSize
      )} to ${targetLang} (${cleanedBatch.length} texts)...`
    );

    try {
      const response = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
          Authorization: `DeepL-Auth-Key ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: cleanedBatch,
          target_lang: targetLang,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`DeepL API error response: ${errorBody}`);
        throw new Error(
          `DeepL API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      results.push(
        ...data.translations.map((t: unknown) => (t as { text: string }).text)
      );

      // Add delay to respect rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error in batch ${i / batchSize + 1}:`, error);
      throw error;
    }
  }

  return results;
}

async function generateTranslations() {
  const apiKey = process.env.DEEPL_API_KEY;

  if (!apiKey) {
    console.error("Error: DEEPL_API_KEY environment variable is not set");
    console.log("Get your API key from: https://www.deepl.com/pro-api");
    process.exit(1);
  }

  // Create base English structure
  const englishTranslations: TranslationStructure = {
    hexagrams: {},
    ui: {
      home: "Home",
      about: "About",
      history: "History",
      profile: "Profile",
      signIn: "Sign In",
      signOut: "Sign Out",
      tossCoins: "Toss Coins",
      tossAgain: "Toss Again",
      inputTosses: "Input Tosses",
      resetTosses: "Reset Tosses",
      viewDetails: "View Details",
      hideDetails: "Hide Details",
      setIntention: "Set your intention",
      hexagramReceived: "Hexagram received",
      interpretation: "Interpretation",
      symbolism: "Symbolism",
      judgment: "Judgment",
      image: "Image",
      lines: "Lines",
      lowerTrigram: "Lower Trigram",
      upperTrigram: "Upper Trigram",
      hexagramNumber: "Hexagram Number",
      originalText: "Original Text",
      comments: "Comments",
      totalReadings: "Total readings",
      thisMonth: "This month",
      uniqueHexagrams: "Unique hexagrams",
      recentConsultations: "Recent consultations",
      noHistory: "No history available",
      loading: "Loading",
      manualToss: "Manual toss",
      automaticToss: "Automatic toss",
    },
  };

  // Add hexagram data
  Object.entries(ichingWilhelmTranslation).forEach(([key, value]) => {
    const hexNumber = parseInt(key);
    englishTranslations.hexagrams[hexNumber] = {
      name: value.name,
      symbolic: value.wilhelm_symbolic,
      judgment: {
        text: value.wilhelm_judgment.text,
        comments: value.wilhelm_judgment.comments,
      },
      image: {
        text: value.wilhelm_image.text,
        comments: value.wilhelm_image.comments,
      },
      lines: value.wilhelm_lines,
    };
  });

  // Save English version
  const localesDir = path.join(__dirname, "..", "src", "locales");
  const enDir = path.join(localesDir, "en");
  fs.mkdirSync(enDir, { recursive: true });
  fs.writeFileSync(
    path.join(enDir, "translation.json"),
    JSON.stringify(englishTranslations, null, 2)
  );
  console.log("✅ Generated English translation file");

  // Translate to other languages
  for (const targetLang of TARGET_LANGUAGES) {
    console.log(`\n🌍 Translating to ${targetLang}...`);

    try {
      // Collect all texts to translate
      const textsToTranslate: string[] = [];
      const textMap: Map<number, { type: string; path: string }> = new Map();
      let index = 0;

      // Add UI texts
      Object.entries(englishTranslations.ui).forEach(([key, value]) => {
        textsToTranslate.push(value);
        textMap.set(index++, { type: "ui", path: key });
      });

      // Add hexagram texts
      Object.entries(englishTranslations.hexagrams).forEach(([hexNum, hex]) => {
        textsToTranslate.push(hex.name);
        textMap.set(index++, { type: "hexagram", path: `${hexNum}.name` });

        textsToTranslate.push(hex.symbolic);
        textMap.set(index++, { type: "hexagram", path: `${hexNum}.symbolic` });

        textsToTranslate.push(hex.judgment.text);
        textMap.set(index++, {
          type: "hexagram",
          path: `${hexNum}.judgment.text`,
        });

        textsToTranslate.push(hex.judgment.comments);
        textMap.set(index++, {
          type: "hexagram",
          path: `${hexNum}.judgment.comments`,
        });

        textsToTranslate.push(hex.image.text);
        textMap.set(index++, {
          type: "hexagram",
          path: `${hexNum}.image.text`,
        });

        textsToTranslate.push(hex.image.comments);
        textMap.set(index++, {
          type: "hexagram",
          path: `${hexNum}.image.comments`,
        });

        Object.entries(hex.lines).forEach(([lineNum, line]) => {
          textsToTranslate.push(line.text);
          textMap.set(index++, {
            type: "hexagram",
            path: `${hexNum}.lines.${lineNum}.text`,
          });

          textsToTranslate.push(line.comments);
          textMap.set(index++, {
            type: "hexagram",
            path: `${hexNum}.lines.${lineNum}.comments`,
          });
        });
      });

      console.log(`Total texts to translate: ${textsToTranslate.length}`);

      // Translate in batches
      const translatedTexts = await translateBatch(
        textsToTranslate,
        targetLang,
        apiKey
      );

      // Build translated structure
      const translatedStructure: TranslationStructure = {
        hexagrams: {},
        ui: {} as unknown as TranslationStructure["ui"],
      };

      translatedTexts.forEach((translation, idx) => {
        const mapping = textMap.get(idx);
        if (!mapping) return;

        if (mapping.type === "ui") {
          translatedStructure.ui[
            mapping.path as keyof typeof translatedStructure.ui
          ] = translation;
        } else if (mapping.type === "hexagram") {
          const pathParts = mapping.path.split(".");
          const hexNum = parseInt(pathParts[0]);

          if (!translatedStructure.hexagrams[hexNum]) {
            translatedStructure.hexagrams[hexNum] = {
              name: "",
              symbolic: "",
              judgment: { text: "", comments: "" },
              image: { text: "", comments: "" },
              lines: {},
            };
          }

          if (pathParts[1] === "name") {
            translatedStructure.hexagrams[hexNum].name = translation;
          } else if (pathParts[1] === "symbolic") {
            translatedStructure.hexagrams[hexNum].symbolic = translation;
          } else if (pathParts[1] === "judgment") {
            translatedStructure.hexagrams[hexNum].judgment[
              pathParts[2] as "text" | "comments"
            ] = translation;
          } else if (pathParts[1] === "image") {
            translatedStructure.hexagrams[hexNum].image[
              pathParts[2] as "text" | "comments"
            ] = translation;
          } else if (pathParts[1] === "lines") {
            const lineNum = parseInt(pathParts[2]);
            if (!translatedStructure.hexagrams[hexNum].lines[lineNum]) {
              translatedStructure.hexagrams[hexNum].lines[lineNum] = {
                text: "",
                comments: "",
              };
            }
            translatedStructure.hexagrams[hexNum].lines[lineNum][
              pathParts[3] as "text" | "comments"
            ] = translation;
          }
        }
      });

      // Save translated version
      const langCode = targetLang.toLowerCase().split("-")[0];
      const langDir = path.join(localesDir, langCode);
      fs.mkdirSync(langDir, { recursive: true });
      fs.writeFileSync(
        path.join(langDir, "translation.json"),
        JSON.stringify(translatedStructure, null, 2)
      );
      console.log(`✅ Generated ${targetLang} translation file`);
    } catch (error) {
      console.error(`❌ Error translating to ${targetLang}:`, error);
    }
  }

  console.log("\n🎉 Translation generation complete!");
}

generateTranslations().catch(console.error);
