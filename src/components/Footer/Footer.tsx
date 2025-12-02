import { FC } from "react";

import styles from "./Footer.module.css";
import { useTranslations } from "next-intl";

export const Footer: FC = () => {
  const t = useTranslations();
  return (
    <footer className={styles.footer}>
      <small>{t("footer.builtWithRespect")}</small>
    </footer>
  );
};
