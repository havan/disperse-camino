import { ethers } from "ethers";
import { ChainInfo, supportedChains } from "./constants";
import { RecipientInfo } from "../types/Recipient";

export const isValidAddress = (address: string) => ethers.utils.isAddress(address);

export const isValidValue = (value: string, decimals: number | null): ethers.BigNumber | false => {
    try {
        return ethers.utils.parseUnits(value, decimals ?? 18);
    } catch (err) {
        return false;
    }
};

export const isChainSupported = (chainId: number) => supportedChains.some((chain) => chain.chainId === chainId);

export const getNetworkInfo = (chainId: number): ChainInfo | undefined =>
    supportedChains.find((chain) => chain.chainId === chainId);

export const getWarnMessage = (): string => {
    let networks = ``;
    supportedChains.map((chain, i) => {
        if (i === 0) {
            networks += `${chain.name}`;
        } else if (i === supportedChains.length - 1) {
            networks += ` and ${chain.name}`;
        } else {
            networks += `, ${chain.name}`;
        }
    });
    return `* supports ${networks} networks *`;
};

export const parseText = (textValue: string, decimals: number | null = 18): RecipientInfo[] => {
    const lines = textValue.split("\n");
    let updatedRecipients: RecipientInfo[] = [];

    lines.map((line) => {
        if (line.includes(" ") || line.includes(",") || line.includes("=") || line.includes("\t")) {
            const [address, value] = line.split(/[,= \t]+/);
            const validValue = isValidValue(value, decimals);
            if (isValidAddress(address) && validValue) {
                updatedRecipients.push({
                    address,
                    value: validValue,
                });
            }
        }
    });

    return updatedRecipients;
};
