
/* Replace with your private key for testnet deployment */

import { mocknet } from "./deploy";
import { testnetKeyMap, ADDR5 } from "./mocknet";
import * as fs from "fs";

const keys = mocknet
  ? testnetKeyMap[ADDR5]
  : JSON.parse(
      fs
        .readFileSync("../../blockstack/stacks-blockchain/keychain.json")
        .toString()
    ).paymentKeyInfo;
      

export const secretKey = mocknet ? keys.secretKey : keys.privateKey;
export const contractAddress = mocknet ? keys.address : keys.address.STACKS;
