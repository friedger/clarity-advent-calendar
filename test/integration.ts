import { describe } from "mocha";
import {
  contractPrincipalCV,
  makeContractCall,
  uintCV,
} from "@stacks/transactions";
import {
  deployContract,
  handleTransaction,
  mocknet,
  network,
  secretKey,
} from "./deploy";
import { ADDR5 } from "./mocknet";

const calendarAddress = mocknet
  ? ADDR5
  : "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV";
const doorAddress = mocknet
  ? ADDR5
  : "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV";

const contracts = [
  "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.calendar-00",
  "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.calendar-01",
  "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.calendar-02",
  "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.calendar-03",
  "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.calendar-04",
  "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.calendar-05",
  "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.calendar-06",
  "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.calendar-07",
  "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.calendar-08",
];

async function deployDay(day: number) {
  const dayString = day.toString().padStart(2, "0");
  await deployContract(`calendar-${dayString}`, (codeBody: string) => {
    if (mocknet) {
      return codeBody.replace(
        /ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV/g,
        "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH"
      );
    } else {
      return codeBody;
    }
  });
}

async function openDoor(day: number, senderKey) {
  const parts = contracts[day].split(".");
  if (mocknet && parts[0] === "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV") {
    parts[0] = "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH";
  }
  const tx = await makeContractCall({
    contractAddress: calendarAddress,
    contractName: "advent-calendar",
    functionName: "open-door",
    functionArgs: [uintCV(day), contractPrincipalCV(parts[0], parts[1])],
    senderKey,
    network,
  });
  await handleTransaction(tx);
}

async function addCalendar(day: number) {
  const parts = contracts[day].split(".");
  if (mocknet && parts[0] === "ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV") {
    parts[0] = "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH";
  }
  let tx = await makeContractCall({
    contractAddress: calendarAddress,
    contractName: "advent-calendar",
    functionName: "update-calendar",
    functionArgs: [uintCV(day), contractPrincipalCV(parts[0], parts[1])],
    senderKey: secretKey,
    network,
  });
  await handleTransaction(tx);

  if (mocknet) {
    openDoor(day, secretKey);
  }
}

describe("calendar test suite", () => {
  before("deploys", async () => {
    await deployContract("advent-calendar", (code) => code);
    /* */
    await deployDay(0);
    await deployDay(1);
    await deployDay(2);
    await deployDay(3);
    await deployDay(4);
    await deployDay(5);
    await deployDay(6);
    await deployDay(7);
    await deployDay(8);
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

  it("should accept entry 04 and open door", async () => {
    await addCalendar(4);
  });

  it("should accept entry 05 and open door", async () => {
    await addCalendar(5);
  });

  it("should accept entry 06 and open door", async () => {
    await addCalendar(6);
  });

  it("should accept entry 07 and open door", async () => {
    await addCalendar(7);
  });

  it("should accept entry 08 and open door", async () => {
    await addCalendar(8);
  });
});

describe("testnet", () => {
  it("should deploy to testnet", async () => {
    //await deployContract("advent-calendar", (code) => code);
    /*
    await deployDay(0);
    await addCalendar(0);
    await deployDay(1);
    await addCalendar(1);
    await deployDay(2);
    await addCalendar(2);
    await deployDay(3);
    await addCalendar(3);
    await deployDay(4);
    await addCalendar(4);
    await deployDay(5);
    await addCalendar(5);
    await deployDay(6);
    await addCalendar(6);
    await deployDay(7);
    await addCalendar(7);
    await deployDay(8);
    await addCalendar(8);
    */
  });
});

describe("advent calendar", () => {
  it("should open door", async () => {
    await openDoor(
      8,
      "052cc5b8f25b1e44a65329244066f76c8057accd5316c889f476d0ea0329632c01" // replace with your key
    );
  });
});
