import { describe } from "mocha";
import {
  contractPrincipalCV,
  makeContractCall,
  uintCV,
} from "@stacks/transactions";
import { deployContract, handleTransaction, mocknet, network } from "./deploy";
import { ADDR5 } from "./mocknet";

const calendarAddress = mocknet
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

describe("advent calendar", () => {
  it("should open door", async () => {
    await openDoor(
      8,
      "" // replace with your key
    );
  });
});
