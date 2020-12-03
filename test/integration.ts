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
  mocknet,
  network,
  secretKey,
} from "./deploy";
import { ADDR5 } from "./mocknet";

const calendarAddress = mocknet
  ? ADDR5
  : "ST3YPJ6BBCZCMH71TV8BK50YC6QJTWEGCNDFWEQ15";
const doorAddress = mocknet ? ADDR5 : "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV"

const day00 = "'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.calendar-00";

async function deployDay(day: number) {
  const dayString = day.toString().padStart(2, "0");
  await deployContract(`calendar-${dayString}`, (codeBody: string) => {
    if (mocknet) {
      return codeBody.replace(
        /ST3YPJ6BBCZCMH71TV8BK50YC6QJTWEGCNDFWEQ15/g,
        "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH"
      );
    } else {
      return codeBody;
    }
  });
}

async function openDoor(day: number) {
  const dayString = day.toString().padStart(2, "0");
  const tx = await makeContractCall({
    contractAddress: calendarAddress,
    contractName: "advent-calendar",
    functionName: "open-door",
    functionArgs: [
      uintCV(day),
      contractPrincipalCV(doorAddress, `calendar-${dayString}`),
    ],
    senderKey: secretKey,
    network,
  });
  await handleTransaction(tx);
}

async function addCalendar(day: number) {
  const dayString = day.toString().padStart(2, "0");
  let tx = await makeContractCall({
    contractAddress: calendarAddress,
    contractName: "advent-calendar",
    functionName: "update-calendar",
    functionArgs: [
      uintCV(day),
      contractPrincipalCV(contractAddress, `calendar-${dayString}`),
    ],
    senderKey: secretKey,
    network,
  });
  await handleTransaction(tx);

  if (mocknet) {
    openDoor(day);
  }
}

describe("calendar test suite", () => {
  before("deploys", async () => {
    await deployContract("advent-calendar", (code) => code);
    /*
    await deployDay(0);
    await deployDay(1);
    await deployDay(2);
    */
    await deployDay(3);
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

  it("should accept entry 03 and open door", async () => {
    await addCalendar(3);
  });
});

describe("testnet", () => {
  it("should deploy to testnet", async () => {
    /*
  await deployDay(0);
  await addCalendar(0);
  await deployDay(1);
  await addCalendar(1);
  await deployDay(2);
  await addCalendar(2);
  */
    await deployDay(3);
    await addCalendar(3);
  });
});

describe("advent calendar", () => {
  it("should open door", async () => {
    await openDoor(3);
  });
});
