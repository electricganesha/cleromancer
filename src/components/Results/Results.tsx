import { FC } from "react";
import styles from "./Results.module.css";
import { Canvas } from "@react-three/fiber";
import { CoinTossCanvas } from "../CoinTossCanvas/CoinTossCanvas";
import { ManualTossInput } from "../ManualTossInput/ManualTossInput";
import { TossResults } from "../TossResults/TossResults";
import { HexagramText } from "../HexagramText/HexagramText";
import { NUMBER_OF_TOSSES } from "../Home/Home";
import { WilhelmHexagram } from "@/types/wilhelm";

interface ResultsProps {
  animate: boolean;
  intention: string;
  manualMode: boolean;
  coinTosses: number[][];
  tossesComplete: boolean;
  hexagram: string;
  trigrams: { lower: { name: string }; upper: { name: string } } | null;
  hexagramData: { name: string; number: number } | null;
  hexagramText: WilhelmHexagram | null;
  loading: boolean;
  error: string | null;
  result: string | null;
  displayedTosses: number[][];
  isShowingCanvas: boolean;
  setAnimate: (animate: boolean) => void;
  setManualMode: (mode: boolean) => void;
  setIsShowingCanvas: (showing: boolean) => void;
  setTossesComplete: (complete: boolean) => void;
  setTossed: (tossed: boolean) => void;
  handleReset: () => void;
  setCoinTosses: (tosses: number[][]) => void;
  setDisplayedTosses: (tosses: number[][]) => void;
}

export const Results: FC<ResultsProps> = ({
  animate,
  intention,
  manualMode,
  coinTosses,
  tossesComplete,
  hexagram,
  trigrams,
  hexagramData,
  hexagramText,
  loading,
  error,
  result,
  displayedTosses,
  isShowingCanvas,
  setAnimate,
  setManualMode,
  setIsShowingCanvas,
  setTossed,
  handleReset,
  setCoinTosses,
  setDisplayedTosses,
  setTossesComplete,
}) => {
  const DEFAULT_COIN_STATE = new Array(NUMBER_OF_TOSSES).fill([2, 2, 2]);

  return (
    <>
      {/* Coin Toss Animation or Manual Input */}
      <div
        style={{
          padding: "36px 0 24px 0",
          fontSize: 24,
          textAlign: "center",
          border: "2px solid var(--shadow)",
          width: "100%",
        }}
      >
        {intention}
      </div>
      <div className={styles.resultsLayout}>
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            height: 480,
            margin: "0 auto",
          }}
        >
          {/* Show 3D coin toss animation if not manual mode */}
          {!manualMode && (
            <Canvas shadows camera={{ position: [0, 3, 3], fov: 75 }}>
              <CoinTossCanvas
                coinTosses={
                  coinTosses.length > 0 ? coinTosses : DEFAULT_COIN_STATE
                }
                animate={animate}
                onAnimationEnd={() => {
                  setAnimate(false);
                  setTossesComplete(true);
                }}
                onTossUpdate={setDisplayedTosses}
                headsUrl="/icons/fengshuicoinheads-icon.png"
                tailsUrl="/icons/fengshuicointails-icon.png"
              />
            </Canvas>
          )}
          {/* Show manual toss input if in manual mode */}
          {manualMode && (
            <ManualTossInput
              manualMode={manualMode}
              setCoinTosses={setCoinTosses}
              setTossed={setTossed}
              setDisplayedTosses={setDisplayedTosses}
              setIsShowingCanvas={setIsShowingCanvas}
              setManualMode={setManualMode}
              setTossesComplete={setTossesComplete}
              handleReset={handleReset}
            />
          )}
        </div>
        {/* Divider lines for visual separation */}
        {isShowingCanvas && !manualMode ? (
          <hr style={{ border: `1px solid var(--shadow)`, margin: "0" }}></hr>
        ) : null}
        {/* Toss Results */}
        <div style={{ width: "100%", paddingTop: 8, minWidth: 0 }}>
          {displayedTosses.length > 0 && (
            <TossResults coinTosses={displayedTosses} />
          )}
        </div>
        <div className={styles.hexagramTextContainer}>
          {tossesComplete && hexagram && (
            <HexagramText
              hexagram={hexagram}
              trigrams={trigrams}
              hexagramData={hexagramData}
              hexagramText={hexagramText}
              interpretation={{ loading, error, result }}
            />
          )}
        </div>
      </div>
    </>
  );
};
