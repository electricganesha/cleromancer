"use client";

import { FC } from "react";

import styles from "./Intention.module.css";
import { useTranslations } from "next-intl";

interface IntentionProps {
  showIntention: boolean;
  intention: string;
  setIntention: (value: string) => void;
}

export const Intention: FC<IntentionProps> = ({
  showIntention,
  intention,
  setIntention,
}) => {
  const t = useTranslations();
  return (
    <div className={styles.intention}>
      {showIntention ? (
        <textarea
          placeholder={t("home.intentionPlaceholder")}
          className={styles.intentionTextarea}
          onInput={(e) => setIntention((e.target as HTMLTextAreaElement).value)}
        ></textarea>
      ) : (
        <div className={styles.intentionText}>{intention}</div>
      )}
    </div>
  );
};
