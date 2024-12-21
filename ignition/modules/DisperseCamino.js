// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DisperseCaminoV1", (m) => {
    const disperseCaminoV1 = m.contract("DisperseCaminoV1");

    return { disperseCaminoV1 };
});
