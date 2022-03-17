export default function ConnectWallet(props) {
  const { connectWallet } = props;

  return (
    <section className="flex flex-col justify-center h-[100vh]">
      <h1>Please connect your wallet</h1>
      <button
        onClick={connectWallet}
        className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Connect Your Wallet
      </button>
    </section>
  );
}