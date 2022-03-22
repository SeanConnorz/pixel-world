import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  transferChecked,
} from "@solana/spl-token";
import * as bs58 from "bs58";

export const transaction = async (publicKey, amount) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const feePayer = Keypair.fromSecretKey(
    bs58.decode(process.env.REACT_APP_PAYER_SECRET_KEY)
  );

  const initSupply = Keypair.fromSecretKey(
    bs58.decode(process.env.REACT_APP_SUPPLY_SECRET_KEY)
  );

  const userPubkey = new PublicKey(publicKey);

  const mintPubkey = new PublicKey(
    "APAnud7o4m7x31QGMrGXSpmJXEKRc9yZ8s6wkZ4ePHA7"
  );

  let ata1 = await getOrCreateAssociatedTokenAccount(
    connection, // connection
    feePayer, // fee payer
    mintPubkey, // mint
    initSupply.publicKey // owner,
  );

  console.log(`ata: ${ata1.address.toBase58()}`);

  let ata2 = await getOrCreateAssociatedTokenAccount(
    connection, // connection
    feePayer, // fee payer
    mintPubkey, // mint
    userPubkey // owner,
  );

  console.log(`ata: ${ata2.address.toBase58()}`);

  const tokenAccountSupplyPubkey = new PublicKey(ata1.address);
  const tokenAccountUserPubkey = new PublicKey(ata2.address);

  let txhash = await transferChecked(
    connection, // connection
    feePayer, // payer
    tokenAccountSupplyPubkey, // from (should be a token account)
    mintPubkey, // mint
    tokenAccountUserPubkey, // to (should be a token account)
    initSupply, // from's owner
    amount * 1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
    8 // decimals
  );

  console.log(`txhash: ${txhash}`);
};
