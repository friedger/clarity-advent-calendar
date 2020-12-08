# clarity-advent-calendar
Decentralized protocol for an advent calendar in Clarity


## Open a door
Using [gitpod](https://gitpod.io/#https://github.com/friedger/clarity-advent-calendar) or your local dev environment, you need to verify
1. that `test/deploy.ts` is configured to deploy to testnet (3 times `false`)
1. that `test/open-door.ts` contains your private key of an address that has funds`

Just call
```
yarn mocha test/open-door
```
Then wait for the result. You might want to [run a stacks node](https://docs.blockstack.org/understand-stacks/running-testnet-node) and watch the logs.
