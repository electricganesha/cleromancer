import { FC } from "react";

import styles from "./Hero.module.css";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Hero: FC = () => {
  const t = useTranslations();

  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
        <Image
          src="/logo/logo_white.png"
          alt="Cleromancer Logo"
          width={96}
          height={96}
        />
        <h1 className={styles.hero__title}>Cleromancer</h1>
        <p>{t("hero.description")}</p>
        <div className={styles.features}>
          <div className={styles.featureBox}>
            <div>
              <span style={{ fontSize: 18 }}>⛩️</span>
              <h1>{t("hero.features.ancientWisdom.title")}</h1>
            </div>
            <p>{t("hero.features.ancientWisdom.description")}</p>
          </div>
          <div className={styles.featureBox}>
            <div>
              <span style={{ fontSize: 18 }}>🎲</span>
              <h1>{t("hero.features.digitalCasting.title")}</h1>
            </div>
            <p>{t("hero.features.digitalCasting.description")}</p>
          </div>
          <div className={styles.featureBox}>
            <div>
              <span style={{ fontSize: 18 }}>☯️</span>
              <h1>{t("hero.features.personalInsights.title")}</h1>
            </div>
            <p>{t("hero.features.personalInsights.description")}</p>
          </div>
          <div className={styles.featureBox}>
            <div>
              <span style={{ fontSize: 18 }}>🤖</span>
              <h1>{t("hero.features.aiInterpretation.title")}</h1>
            </div>
            <p>{t("hero.features.aiInterpretation.description")}</p>
          </div>
        </div>
        <button
          className={styles.hero__button}
          onClick={() => {
            const nextSection = document.getElementById("main-layout");
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {t("hero.startYourJourney")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
            />
          </svg>
        </button>
        <h3>{t("hero.subtitle")}</h3>
      </div>
    </section>
  );
};
