import { Card } from "@/components/Card/Card";

import styles from "./page.module.css";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations();
  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutHeader}>
          <Image
            src="/logo/logo_white.png"
            alt="Cleromancer Logo"
            width={128}
            height={128}
          />
          <h1>{t("about.title")}</h1>
        </div>
        <div className={styles.aboutContent}>
          <Card className={styles.cardWithBackground}>
            <div className={styles.cardWithBackgroundContent}>
              <section className={styles.aboutSection}>
                <div className={styles.aboutTitle}>
                  <h2>☯️</h2>
                  <h2 id="about-iching-title">
                    {t("about.cards.about.title")}
                  </h2>
                </div>
                <p>{t("about.cards.about.description")}</p>
              </section>
            </div>
          </Card>

          <Card className={styles.cardWithBackground}>
            <div className={styles.cardWithBackgroundContent}>
              <section aria-labelledby="how-app-works-title">
                <div className={styles.aboutTitle}>
                  <h2>⚙️</h2>
                  <h2 id="how-app-works-title">
                    {t("about.cards.howItWorks.title")}
                  </h2>
                </div>
                <p>{t("about.cards.howItWorks.description")}</p>
                <p>
                  <strong>
                    {t("about.cards.howItWorks.paragraph1.title")}
                  </strong>
                  <br />
                  {t("about.cards.howItWorks.paragraph1.description")}
                </p>
                <p>
                  <strong>
                    {t("about.cards.howItWorks.paragraph2.title")}
                  </strong>
                  <br />
                  {t("about.cards.howItWorks.paragraph2.description")}
                </p>
                <p>
                  <strong>
                    {t("about.cards.howItWorks.paragraph3.title")}
                  </strong>
                  <br />
                  {t("about.cards.howItWorks.paragraph3.description")}
                </p>
                <p>
                  <strong>
                    {t("about.cards.howItWorks.paragraph4.title")}
                  </strong>
                  <br />
                  {t("about.cards.howItWorks.paragraph4.description")}
                </p>
              </section>
            </div>
          </Card>

          <Card className={styles.cardWithBackground}>
            <div className={styles.cardWithBackgroundContent}>
              <section aria-labelledby="ai-interpretation-title">
                <div className={styles.aboutTitle}>
                  <h2>🤖</h2>
                  <h2 id="ai-interpretation-title">
                    {t("about.cards.aiInterpretation.title")}
                  </h2>
                </div>
                <p>
                  {t("about.cards.aiInterpretation.paragraph1.description")}
                </p>
                <p>
                  {t("about.cards.aiInterpretation.paragraph2.description")}
                </p>
                <p>
                  {t("about.cards.aiInterpretation.paragraph3.description")}
                </p>
              </section>
            </div>
          </Card>

          <Card className={styles.cardWithBackground}>
            <div className={styles.cardWithBackgroundContent}>
              <section aria-labelledby="hexagram-calculation-title">
                <div className={styles.aboutTitle}>
                  <Image src="/logo/logo.png" alt="" width={24} height={24} />
                  <h2 id="hexagram-calculation-title">
                    {t("about.cards.hexagramCalculation.title")}
                  </h2>
                </div>
                <p>
                  {t("about.cards.hexagramCalculation.paragraph1.description")}
                </p>
                <p>
                  {t("about.cards.hexagramCalculation.paragraph2.description")}
                </p>
                <p>
                  {t("about.cards.hexagramCalculation.paragraph3.description")}
                </p>
              </section>
            </div>
          </Card>

          <Card className={styles.cardWithBackground}>
            <div className={styles.cardWithBackgroundContent}>
              <section aria-labelledby="randomness-title">
                <div className={styles.aboutTitle}>
                  <h2>🎲</h2>
                  <h2 id="randomness-title">
                    {t("about.cards.aboutRandomness.title")}
                  </h2>
                </div>
                <p>
                  <strong>
                    {t("about.cards.aboutRandomness.paragraph1.title")}
                  </strong>
                  <br />
                  {t("about.cards.aboutRandomness.paragraph1.description")}
                </p>
                <p>
                  <strong>
                    {t("about.cards.aboutRandomness.paragraph2.title")}
                  </strong>
                  <br />
                  {t("about.cards.aboutRandomness.paragraph2.description")}
                </p>
              </section>
            </div>
          </Card>

          <Card className={styles.cardWithBackground}>
            <div className={styles.cardWithBackgroundContent}>
              <section aria-labelledby="why-use-title">
                <div className={styles.aboutTitle}>
                  <h2>📜</h2>
                  <h2 id="why-use-title">{t("about.cards.whyUse.title")}</h2>
                </div>
                <p>{t("about.cards.whyUse.paragraph1.description")}</p>
                <p>{t("about.cards.whyUse.paragraph2.description")}</p>
                <p>{t("about.cards.whyUse.paragraph3.description")}</p>
                <p>{t("about.cards.whyUse.paragraph4.description")}</p>
              </section>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
