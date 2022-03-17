import CharacterSelectionItem from "./CharacterSelectionItem";

import { useState, useEffect } from "react";

export default function CharacterSelection(props) {
  const [collectionDisplay, setCollectionDisplay] = useState([]);
  const { setSelectedCharacter, collection, setCollection, currentAccount } =
    props;

  const loadCollection = () => {
    fetch(
      `https://api-mainnet.magiceden.dev/v2/wallets/AJvboGysVC3G6sWMsBmkJ6zVWZQ9WVo4WDR5bZeqxp2p/tokens?offset=0&limit=100`
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        res.forEach((obj) => {
          console.log(res);
          setCollectionDisplay((prev) => {
            return [
              ...prev,
              <CharacterSelectionItem
                setSelectedCharacter={setSelectedCharacter}
                image={obj.image}
                name={obj.name}
                sprite={obj.image}
              />,
            ];
          });
        });
      });
  };

  useEffect(() => {
    if (currentAccount) {
      loadCollection();
    }
  }, [currentAccount]);

  return (
    <section className="flex flex-col items-center justify-center h-[100vh]">
      {collectionDisplay.length > 0 ? (
        <h1>Chose your character</h1>
      ) : (
        <h1>Please Connect a Wallet With a Valid Token</h1>
      )}
      <div className="flex ">{collectionDisplay}</div>
    </section>
  );
}
