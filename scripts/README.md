# Translation Generation Script

This script automatically generates i18n translation files for your I Ching app using the DeepL API.

## Setup

1. **Get a DeepL API Key**

   - Sign up at https://www.deepl.com/pro-api
   - Free tier includes 500,000 characters/month

2. **Set Environment Variable**

   ```bash
   export DEEPL_API_KEY="your-api-key-here"
   ```

   Or create a `.env.local` file:

   ```
   DEEPL_API_KEY=your-api-key-here
   ```

3. **Install Dependencies**
   ```bash
   npm install tsx --save-dev
   ```

## Usage

Run the script with your API key:

```bash
DEEPL_API_KEY="your-key-here" npx tsx scripts/generate-translations.ts
```

Or if using `.env.local`, use tsx with dotenv:

```bash
npx tsx --env-file=.env.local scripts/generate-translations.ts
```

Or add to your `package.json` scripts:

```json
{
  "scripts": {
    "generate-translations": "tsx --env-file=.env.local scripts/generate-translations.ts"
  }
}
```

Then run:

```bash
npm run generate-translations
```

## Generated Files

The script will create translation files in:

```
src/locales/
  en/translation.json     (English - base)
  pt/translation.json     (Portuguese)
  es/translation.json     (Spanish)
  fr/translation.json     (French)
  de/translation.json     (German)
  it/translation.json     (Italian)
  zh/translation.json     (Chinese)
  ja/translation.json     (Japanese)
```

## Customization

### Add More Languages

Edit `TARGET_LANGUAGES` in the script:

```typescript
const TARGET_LANGUAGES = [
  "PT-PT", // Portuguese
  "ES", // Spanish
  "FR", // French
  "DE", // German
  "IT", // Italian
  "ZH", // Chinese
  "JA", // Japanese
  "KO", // Korean
  "RU", // Russian
  "AR", // Arabic
  // See DeepL docs for more: https://www.deepl.com/docs-api/translate-text
];
```

### Modify UI Translations

Edit the `englishTranslations.ui` object in the script to add/remove UI strings.

## Translation Structure

Each translation file contains:

- **hexagrams**: All 64 hexagrams with Wilhelm translations
  - name, symbolic, judgment, image, lines
- **ui**: UI strings for navigation, buttons, labels

## Rate Limits

The script includes:

- Batch processing (50 texts per request)
- 1-second delay between batches
- Error handling for API failures

## Notes

- Translation quality depends on DeepL's understanding of I Ching terminology
- You may want to review and refine translations manually
- DeepL free tier has a 500k character/month limit
- The script takes several minutes to complete all languages

## Next Steps

After generating translations, integrate them with a library like:

- **react-i18next** (recommended for React)
- **next-i18next** (for Next.js)
- **react-intl** (for React with ICU message format)
