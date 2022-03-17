import Index from "./components/Index";
import { useState } from "react";

function App() {
  const [currentAccount, setCurrentAccount] = useState();

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log(
        `Wallet succesfully connected with ${response.publicKey.toString()}`
      );
      setCurrentAccount(response.publicKey.toString());
    }
  };

  return (
    <div className="App flex flex-col items-center text-white">
      <Index connectWallet={connectWallet} currentAccount={currentAccount} />
    </div>
  );
}

export default App;
