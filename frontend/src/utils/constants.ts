export type ChainInfo = {
    chainId: number;
    disperseAddress: string;
    blockExplorer: string;
    name: string;
};

export const supportedChains: ChainInfo[] = [
    {
        chainId: 500,
        disperseAddress: "0x54510dA48aE512387111623D59812B794d11754f",
        blockExplorer: "https://columbus.caminoscan.com/",
        name: "camino",
    },
    {
        chainId: 501,
        disperseAddress: "0x9B1C370a1052AA4C214908081cF22FC97f44312C",
        blockExplorer: "https://columbus.caminoscan.com/",
        name: "columbus",
    },
];
