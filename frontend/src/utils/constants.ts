export type ChainInfo = {
    chainId: number;
    disperseAddress: string;
    blockExplorer: string;
    name: string;
};

export const supportedChains: ChainInfo[] = [
    {
        chainId: 31337,
        disperseAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        blockExplorer: "https://columbus.caminoscan.com/",
        name: "localhost",
    },
    {
        chainId: 500,
        disperseAddress: "",
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
