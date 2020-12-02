import { describe } from "mocha";
import {
  broadcastTransaction,
  bufferCV,
  bufferCVFromString,
  contractPrincipalCV,
  makeContractCall,
  makeContractDeploy,
  StacksTransaction,
  standardPrincipalCV,
  TxBroadcastResultOk,
  TxBroadcastResultRejected,
  uintCV,
} from "@stacks/transactions";
import { StacksTestnet } from "@stacks/network";
import * as fs from "fs";
import {
  contractAddress,
  deployContract,
  handleTransaction,
  network,
  secretKey,
} from "./deploy";

async function deployDay(day: number) {
  const dayString = day.toString().padStart(2, "0");
  await deployContract(`calendar-${dayString}`);
}

async function addCalendar(day: number) {
  const dayString = day.toString().padStart(2, "0");
  let tx = await makeContractCall({
    contractAddress: contractAddress,
    contractName: "calendar",
    functionName: "update-calendar",
    functionArgs: [
      uintCV(day),
      contractPrincipalCV(contractAddress, `calendar-${dayString}`),
    ],
    senderKey: secretKey,
    network,
  });
  await handleTransaction(tx);

  tx = await makeContractCall({
    contractAddress: contractAddress,
    contractName: "calendar",
    functionName: "open-door",
    functionArgs: [
      uintCV(day),
      contractPrincipalCV(contractAddress, `calendar-${dayString}`),
    ],
    senderKey: secretKey,
    network,
  });
  await handleTransaction(tx);
}

describe("calendar test suite", () => {
  before("deploys", async () => {
    await deployContract(`calendar`);
    await deployDay(0);
    await deployDay(1);
    await deployDay(2);
  });

  it("should accept entry 00 and open door", async () => {
    await addCalendar(0);
  });

  it("should accept entry 01 and open door", async () => {
    await addCalendar(1);
  });

  it("should accept entry 02 and open door", async () => {
    await addCalendar(2);
  });
});
