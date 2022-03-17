import { init } from "../logic/init";
import { useState, useEffect } from "react";
import "./styles.css";

export default function ConnectWallet(props) {
  const { selectedCharacter, currentAccount } = props;

  useEffect(() => {
    if (currentAccount) {
      init(selectedCharacter);
    }
  }, [currentAccount]);

  return (
    <section>
      <div className="game-container flex flex-col justify-center items-center mt-[30rem] scale-[4]">
        <canvas
          className="game-canvas w-[352px] h-[198px]"
          width="352"
          height="198"
        ></canvas>
      </div>
    </section>
  );
}
