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
        disperseAddress: "0xAb84d847dE35AF9C4931aE2A24f584a4F058a784",
        blockExplorer: "https://columbus.caminoscan.com/",
        name: "camino",
    },
    {
        chainId: 501,
        disperseAddress: "0xa73248AA0FD060732959a2c3AFF15F81E0Bb2dCf",
        blockExplorer: "https://columbus.caminoscan.com/",
        name: "columbus",
    },
];
