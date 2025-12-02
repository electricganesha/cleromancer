"use client";

import { useTranslations } from "next-intl";
import styles from "./Header.module.css";

import Image from "next/image";
import { FC } from "react";

export const Header: FC = () => {
  const t = useTranslations();
  return (
    <div className={styles.header}>
      <Image
        src="/logo/logo.png"
        alt="Cleromancer Logo"
        width={56}
        height={56}
      />
      <h1 className={styles.header__title}>Cleromancer</h1>
      <h3>{t("header.tagline")}</h3>
    </div>
  );
};
