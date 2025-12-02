"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HexagramData, Trigram } from "@/types/hexagram";
import { WilhelmHexagram } from "@/types/wilhelm";
import {
  findHexagram,
  generateHexagram,
  getTranslationKeysForHexagramNumber,
  getTrigrams,
} from "@/utils/iching";
import { Intention } from "@/components/Intention/Intention";
import styles from "./Home.module.css";
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { Hero } from "@/components/Hero/Hero";
import { Card } from "@/components/Card/Card";
import { TossMode } from "@/generated/prisma";
import { useAi } from "@/hooks/useAi";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Results } from "../Results/Results";
export const NUMBER_OF_TOSSES = 6;

export const Home: FC = () => {
  const params = useParams();
  const locale = params?.locale || "en";
  const t = useTranslations();
  const { data: session } = useSession();
  const { loading, error, result, getAiResponse } = useAi();

  const [hexagram, setHexagram] = useState<string>("");
  const [coinTosses, setCoinTosses] = useState<number[][]>([]);
  const [isShowingCanvas, setIsShowingCanvas] = useState(false);
  const [intention, setIntention] = useState("");
  const [tossed, setTossed] = useState(false);
  const [trigrams, setTrigrams] = useState<{
    lower: Trigram;
    upper: Trigram;
  } | null>(null);
  const [hexagramData, setHexagramData] = useState<HexagramData | null>(null);
  const [manualMode, setManualMode] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [displayedTosses, setDisplayedTosses] = useState<number[][]>([]);
  const [tossesComplete, setTossesComplete] = useState(false);
  const [intentionTriggered, setIntentionTriggered] = useState(false);
  const [historySaved, setHistorySaved] = useState(false);

  // New state to control which section is shown
  const [showResults, setShowResults] = useState(false);

  // Generate hexagram and reset animation (now for R3F)
  const handleGenerate = useCallback(() => {
    setHexagram("");
    setCoinTosses([]);
    setDisplayedTosses([]);
    setTrigrams(null);
    setHexagramData(null);
    setTossed(true);
    setIsShowingCanvas(true);
    setAnimate(true);
    setTossesComplete(false);
    setHistorySaved(false);
    setShowResults(true); // Show results section

    // Simulate tosses for demo: you can animate this with state for each toss
    const tosses: number[][] = [];
    for (let i = 0; i <= NUMBER_OF_TOSSES; i++) {
      tosses.push([
        Math.random() > 0.5 ? 3 : 2,
        Math.random() > 0.5 ? 3 : 2,
        Math.random() > 0.5 ? 3 : 2,
      ]);
    }
    setCoinTosses(tosses);
  }, []);

  const handleReset = useCallback(() => {
    setHexagram("");
    setCoinTosses([]);
    setDisplayedTosses([]);
    setTrigrams(null);
    setHexagramData(null);
    setTossed(false);
    setIsShowingCanvas(false);
    setAnimate(false);
    setTossesComplete(false);
    setHistorySaved(false);
    setShowResults(false); // Reset to initial inputs
  }, []);

  // Only calculate hexagram after tossesComplete
  useEffect(() => {
    if (tossesComplete && !intentionTriggered) {
      // Only generate hexagram and save history once per toss
      const { hexagram: newHexagram } = generateHexagram();
      setHexagram(newHexagram);
      const trigramsResult = getTrigrams(newHexagram);
      if (trigramsResult.lower && trigramsResult.upper) {
        setTrigrams({
          lower: { name: trigramsResult.lower.name },
          upper: { name: trigramsResult.upper.name },
        });
      } else {
        setTrigrams(null);
      }
      const hexagramResult = findHexagram(newHexagram);
      setHexagramData(hexagramResult || null);

      if (hexagramResult && intention) {
        getAiResponse(hexagramResult.number, intention);
        setIntentionTriggered(true);
      }
    }
  }, [
    tossesComplete,
    intentionTriggered,
    session,
    coinTosses,
    intention,
    manualMode,
    getAiResponse,
  ]);

  useEffect(() => {
    if (result && !loading && !error && !historySaved) {
      // Save toss history if user is signed in
      if (session?.user) {
        const flatTosses = coinTosses.flat();
        if (flatTosses.length === 21 || flatTosses.length === 18) {
          fetch("/api/history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              intention,
              tosses: flatTosses,
              hexagram: hexagramData?.number,
              mode: manualMode ? TossMode.MANUAL : TossMode.AUTOMATIC,
              interpretation: result,
            }),
          });
          setHistorySaved(true);
        }
      }
    }
  }, [
    loading,
    error,
    result,
    coinTosses,
    intention,
    session,
    hexagramData,
    manualMode,
    historySaved,
  ]);

  const hexagramText: WilhelmHexagram | null = hexagramData
    ? getTranslationKeysForHexagramNumber(hexagramData.number)
    : null;

  return (
    <div key={Array.isArray(locale) ? locale.join("-") : locale}>
      {/* Initial Inputs Section */}
      {!showResults && (
        <>
          <Hero />
          <div className={styles.mainLayout} id="main-layout">
            <Card className={styles.intention}>
              <h3
                style={{
                  color: "var(--background)",
                  textShadow: "0px 0px 2px var(--shadow)",
                }}
              >
                <span>✨</span> {t("home.setYourIntention")}
              </h3>
              <p>{t("home.focusYourMind")}</p>
              <Intention
                showIntention={!tossed && !manualMode}
                intention={intention}
                setIntention={setIntention}
              />
            </Card>

            <div className={styles.actions}>
              <Card className={styles.tossMethod}>
                <h3
                  style={{
                    color: "var(--background)",
                    textShadow: "0px 0px 2px var(--shadow)",
                  }}
                >
                  <span>🌌</span> {t("home.coinOracle")}
                </h3>
                <p>{t("home.chooseYourMethod")}</p>
                <div className={styles.responsiveBtns}>
                  <div>
                    {!manualMode && (
                      <Button
                        disabled={intention === "" || animate}
                        onClick={() => {
                          if (tossed) {
                            handleReset();
                          } else {
                            handleGenerate();
                          }
                        }}
                      >
                        <b>
                          {isShowingCanvas && tossed
                            ? t("home.tossAgain")
                            : t("home.tossCoins")}
                        </b>
                        <Image
                          src="/icons/fengshuicoins.png"
                          alt={
                            isShowingCanvas && tossed
                              ? t("home.tossAgain")
                              : t("home.tossCoins")
                          }
                          width={20}
                          height={20}
                        />
                      </Button>
                    )}
                    {/* Show Re-input tosses button in manual mode */}
                    {manualMode && (
                      <Button
                        disabled={intention === ""}
                        onClick={() => {
                          setManualMode(false);
                        }}
                      >
                        <b>{t("home.resetTosses")}</b>
                        <Image
                          src="/icons/fengshuiinput.png"
                          alt={t("home.resetTosses")}
                          width={20}
                          height={20}
                        />
                      </Button>
                    )}
                  </div>
                  {/* Only show 'or' divider when not in manual mode and not tossed */}
                  {!manualMode && !tossed && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          width: "164px",
                          border: `1px solid lightgrey`,
                        }}
                      />
                      <span
                        style={{
                          color: "var(--shadow)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        or
                      </span>
                      <div
                        style={{
                          width: "164px",
                          border: `1px solid lightgrey`,
                        }}
                      />
                    </div>
                  )}
                  <div>
                    {!isShowingCanvas && !tossed && !manualMode && (
                      <Button
                        disabled={intention === ""}
                        onClick={() => {
                          setManualMode(true);
                        }}
                      >
                        <b>
                          {isShowingCanvas && tossed
                            ? t("home.reInputTosses")
                            : t("home.inputTosses")}
                        </b>
                        <Image
                          src="/icons/fengshuiinput.png"
                          alt={
                            isShowingCanvas && tossed
                              ? t("home.reInputTosses")
                              : t("home.inputTosses")
                          }
                          width={20}
                          height={20}
                        />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* Toss Results Section */}
      {showResults && (
        <Results
          intention={intention}
          manualMode={manualMode}
          coinTosses={coinTosses}
          setDisplayedTosses={setDisplayedTosses}
          isShowingCanvas={isShowingCanvas}
          setIsShowingCanvas={setIsShowingCanvas}
          animate={animate}
          setAnimate={setAnimate}
          setManualMode={setManualMode}
          tossesComplete={tossesComplete}
          setTossesComplete={setTossesComplete}
          hexagram={hexagram}
          hexagramData={hexagramData}
          trigrams={trigrams}
          hexagramText={hexagramText}
          loading={loading}
          error={error}
          result={result}
          handleReset={handleReset}
          setTossed={setTossed}
          setCoinTosses={setCoinTosses}
          displayedTosses={displayedTosses}
        />
      )}
    </div>
  );
};
