"use client";

import ProfilePicture from "@/components/ProfilePicture/ProfilePicture";
import { useSession } from "next-auth/react";
import React from "react";

import styles from "./page.module.css";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ProfilePage = () => {
  const session = useSession();
  const t = useTranslations();
  const username = session.data?.user?.name || "Guest";
  const email = session.data?.user?.email || "No email";
  const image = session.data?.user?.image || "/default_profile.png";

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <Image
          src="/logo/logo_white.png"
          alt="Cleromancer Logo"
          width={128}
          height={128}
        />
        <h1>{t("profile.title")}</h1>
      </div>
      <div className={styles.profileContent}>
        <ProfilePicture src={image} alt={t("profile.pictureAlt")} size={100} />
        <div className={styles.profileInfo}>
          <p>
            <strong>{t("profile.username")}:</strong> {username}
          </p>
          <p>
            <strong>{t("profile.email")}:</strong> {email}
          </p>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default ProfilePage;
