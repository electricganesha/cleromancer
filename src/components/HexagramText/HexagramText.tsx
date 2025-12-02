"use client";

import { WilhelmHexagram } from "@/types/wilhelm";
import { Card } from "../Card/Card";
import { useTranslations } from "next-intl";

import styles from "./HexagramText.module.css";
import Markdown from "react-markdown";

// Function to render the hexagram using SVG
const renderHexagram = (hexagram: string, step: number) => {
  const lineHeight = 10;
  const lineWidth = 100;
  const gap = 5;
  const strokeWidth = 5;
  const padding = strokeWidth / 2; // Add padding to prevent clipping

  return (
    <svg width={lineWidth} height={lineHeight * 6 + gap * 5 + strokeWidth}>
      {hexagram
        .split("")
        .reverse() // Reverse to draw bottom line first
        .map((line, index) => (
          <line
            key={line + index}
            x1={0}
            y1={index * (lineHeight + gap) + padding}
            x2={lineWidth}
            y2={index * (lineHeight + gap) + padding}
            stroke={line === "1" ? "var(--highlight)" : "transparent"}
            strokeWidth={strokeWidth}
            style={{ opacity: step > index ? 1 : 0 }}
          />
        ))}
      {hexagram
        .split("")
        .reverse() // Reverse to draw bottom line first
        .map((line, index) =>
          line === "0" ? (
            <line
              key={line + index}
              x1={0}
              y1={index * (lineHeight + gap) + padding}
              x2={lineWidth / 2 - 5}
              y2={index * (lineHeight + gap) + padding}
              stroke="var(--highlight)"
              strokeWidth={strokeWidth}
              style={{ opacity: step > index ? 1 : 0 }}
            />
          ) : null
        )}
      {hexagram
        .split("")
        .reverse() // Reverse to draw bottom line first
        .map((line, index) =>
          line === "0" ? (
            <line
              key={line + index}
              x1={lineWidth / 2 + 5}
              y1={index * (lineHeight + gap) + padding}
              x2={lineWidth}
              y2={index * (lineHeight + gap) + padding}
              stroke="var(--highlight)"
              strokeWidth={strokeWidth}
              style={{ opacity: step > index ? 1 : 0 }}
            />
          ) : null
        )}
    </svg>
  );
};

interface HexagramTextProps {
  hexagram: string;
  trigrams: { lower: { name: string }; upper: { name: string } } | null;
  hexagramData: { name: string; number: number } | null;
  hexagramText: WilhelmHexagram | null;
  interpretation: {
    loading: boolean;
    error: string | null;
    result: string | null;
  };
}

export const HexagramText: React.FC<HexagramTextProps> = ({
  hexagram,
  trigrams,
  hexagramData,
  hexagramText,
  interpretation: { error, result },
}) => {
  const t = useTranslations();
  const hexNum = hexagramData?.number;

  return (
    <div style={{ width: "100%" }}>
      <Card>
        <div className={styles.hexagramText}>
          {renderHexagram(hexagram, 6)}
          <h3>{hexNum ? t(`hexagrams.${hexNum}.name`) : hexagramData?.name}</h3>
        </div>
      </Card>
      <hr className={styles.divider}></hr>
      <Card>
        <u>
          <h3>{t("ui.interpretation")}</h3>
        </u>
        <div className={styles.interpretation}>
          {error && <div style={{ color: "red" }}>Error: {error}</div>}
          <div>{result && <Markdown>{result}</Markdown>}</div>
        </div>
      </Card>

      {hexagramText && hexNum && (
        <>
          <Card>
            <p>
              <b>{t("ui.lowerTrigram")}:</b> {trigrams?.lower?.name}
            </p>
            <p>
              <b>{t("ui.upperTrigram")}:</b> {trigrams?.upper?.name}
            </p>
          </Card>
          <hr className={styles.divider}></hr>
          <Card>
            <u>
              <h3>{t("ui.symbolism")}</h3>
            </u>
            <p>
              <b>{t("ui.hexagramNumber")}:</b> {hexNum}
            </p>
            <p>{t(`hexagrams.${hexNum}.symbolic`)}</p>
          </Card>
          <hr className={styles.divider}></hr>
          <Card>
            <u>
              <h3>{t("ui.judgment")}</h3>
            </u>
            <p>
              <b>{t("ui.originalText")}:</b>{" "}
              {t(`hexagrams.${hexNum}.judgment.text`)}
            </p>
            <p>
              <b>{t("ui.comments")}:</b>{" "}
              {t(`hexagrams.${hexNum}.judgment.comments`)}
            </p>
          </Card>
          <hr className={styles.divider}></hr>
          <Card>
            <u>
              <h3>{t("ui.image")}</h3>
            </u>
            <p>
              <b>{t("ui.originalText")}:</b>{" "}
              {t(`hexagrams.${hexNum}.image.text`)}
            </p>
            <p>
              <b>{t("ui.comments")}:</b>{" "}
              {t(`hexagrams.${hexNum}.image.comments`)}
            </p>
          </Card>
          <hr className={styles.divider}></hr>
          <Card>
            <u>
              <h3>{t("ui.lines")}</h3>
            </u>
            {Object.entries(hexagramText.wilhelm_lines).map(([lineIndex]) => (
              <div
                key={lineIndex}
                style={{
                  borderBottom:
                    Number(lineIndex) ===
                    Object.entries(hexagramText.wilhelm_lines).length
                      ? "none"
                      : `1px solid var(--shadow)`,
                  marginBottom: 10,
                }}
              >
                <h4>
                  {t("ui.line")} {lineIndex}
                </h4>
                <p>
                  <b>{t("ui.originalText")}:</b>{" "}
                  {t(`hexagrams.${hexNum}.lines.${lineIndex}.text`)}
                </p>
                <p>
                  <b>{t("ui.comments")}:</b>{" "}
                  {t(`hexagrams.${hexNum}.lines.${lineIndex}.comments`)}
                </p>
              </div>
            ))}
          </Card>
        </>
      )}
    </div>
  );
};
