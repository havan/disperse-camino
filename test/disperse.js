const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DisperseCaminoV1", function () {
    let disperseContract;
    let mockToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // Deploy mock ERC20 token
        const MockToken = await ethers.getContractFactory("MockERC20");
        mockToken = await MockToken.deploy("Mock Token", "MTK");
        await mockToken.waitForDeployment();

        // Mint some tokens to owner
        await mockToken.mint(owner.address, ethers.parseEther("1000"));

        // Deploy DisperseCaminoV1
        const Disperse = await ethers.getContractFactory("DisperseCaminoV1");
        disperseContract = await Disperse.deploy();
        await disperseContract.waitForDeployment();

        // Approve disperse contract to spend tokens
        await mockToken.approve(await disperseContract.getAddress(), ethers.MaxUint256);
    });

    describe("disperseERC20", function () {
        it("Should distribute ERC20 tokens correctly", async function () {
            const recipients = [addr1.address, addr2.address];
            const values = [ethers.parseEther("100"), ethers.parseEther("50")];

            const tx = await disperseContract.disperseERC20(await mockToken.getAddress(), recipients, values);

            await expect(tx)
                .to.emit(disperseContract, "TokensDispersed")
                .withArgs(await mockToken.getAddress(), ethers.parseEther("150"), recipients.length);

            // Check token balances
            await expect(tx).to.changeTokenBalances(
                mockToken,
                [owner, disperseContract, addr1, addr2],
                [-ethers.parseEther("150"), 0, values[0], values[1]],
            );
        });

        it("Should revert if arrays have different lengths", async function () {
            const recipients = [addr1.address, addr2.address];
            const values = [ethers.parseEther("100")];

            await expect(
                disperseContract.disperseERC20(await mockToken.getAddress(), recipients, values),
            ).to.be.revertedWithCustomError(disperseContract, "ArrayLengthMismatch");
        });

        it("Should revert if recipients array is empty", async function () {
            await expect(
                disperseContract.disperseERC20(await mockToken.getAddress(), [], []),
            ).to.be.revertedWithCustomError(disperseContract, "EmptyRecipients");
        });

        it("Should revert if transfer fails", async function () {
            const recipients = [addr1.address];
            const values = [ethers.parseEther("1001")]; // More than owner has

            await expect(
                disperseContract.disperseERC20(await mockToken.getAddress(), recipients, values),
            ).to.be.revertedWithCustomError(mockToken, "ERC20InsufficientBalance");
        });
    });

    describe("disperseCamino", function () {
        it("Should distribute native currency correctly", async function () {
            const recipients = [addr1.address, addr2.address];
            const values = [ethers.parseEther("1"), ethers.parseEther("2")];
            const totalValue = ethers.parseEther("3");

            const tx = await disperseContract.disperseCamino(recipients, values, {
                value: totalValue,
            });

            await expect(tx).to.emit(disperseContract, "CaminoDispersed").withArgs(totalValue, recipients.length);

            // Check balances
            await expect(tx).to.changeEtherBalances(
                [owner, disperseContract, addr1, addr2],
                [-totalValue, 0, values[0], values[1]],
            );
        });

        it("Should return excess native currency to sender", async function () {
            const recipients = [addr1.address];
            const values = [ethers.parseEther("1")];
            const sentValue = ethers.parseEther("2"); // Sending extra 1 ETH

            const initialBalance = await ethers.provider.getBalance(owner.address);

            await expect(
                disperseContract.disperseCamino(recipients, values, {
                    value: sentValue,
                }),
            ).to.revertedWithCustomError(disperseContract, "TooMuchCAMReceived");
        });

        it("Should revert if insufficient value sent", async function () {
            const recipients = [addr1.address];
            const values = [ethers.parseEther("2")];

            await expect(
                disperseContract.disperseCamino(recipients, values, {
                    value: ethers.parseEther("1"), // Less than needed
                }),
            ).to.be.revertedWithCustomError(disperseContract, "InsufficientValue");
        });

        it("Should revert if arrays have different lengths", async function () {
            const recipients = [addr1.address, addr2.address];
            const values = [ethers.parseEther("1")];

            await expect(
                disperseContract.disperseCamino(recipients, values, {
                    value: ethers.parseEther("1"),
                }),
            ).to.be.revertedWithCustomError(disperseContract, "ArrayLengthMismatch");
        });

        it("Should revert if recipients array is empty", async function () {
            await expect(
                disperseContract.disperseCamino([], [], {
                    value: 0,
                }),
            ).to.be.revertedWithCustomError(disperseContract, "EmptyRecipients");
        });
    });
});
