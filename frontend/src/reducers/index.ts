type StateType = {
    chainId: number;
    network: string | null;
    disperseAddress: string | null;
    explorerUrl: string | null;
};

export const initState: StateType = {
    chainId: 0,
    network: null,
    disperseAddress: null,
    explorerUrl: null,
};

type ReducerActionType =
    | { type: "SET_CHAIN_ID"; payload: number }
    | { type: "SET_NETWORK"; payload: string | null }
    | { type: "SET_DISPERSE_ADDRESS"; payload: string | null }
    | { type: "SET_EXPLORER_URL"; payload: string | null };

export const reducer = (state: StateType, action: ReducerActionType): StateType => {
    switch (action.type) {
        case "SET_CHAIN_ID": {
            return {
                ...state,
                chainId: action.payload,
            };
        }
        case "SET_NETWORK": {
            return {
                ...state,
                network: action.payload,
            };
        }
        case "SET_DISPERSE_ADDRESS": {
            return {
                ...state,
                disperseAddress: action.payload,
            };
        }
        case "SET_EXPLORER_URL": {
            return {
                ...state,
                explorerUrl: action.payload,
            };
        }
        default:
            return state;
    }
};

type NetworkContextType = {
    chainId: number;
    network: string | null;
    disperseAddress: string | null;
    explorerUrl: string | null;
};

export const initNetworkContextType: NetworkContextType = {
    chainId: 0,
    network: null,
    disperseAddress: null,
    explorerUrl: null,
};
