import { ethers } from "ethers";
import { createContext, useEffect, useReducer, useState } from "react";

import "./App.css";
import Header from "./components/Headers";
import Payment from "./components/Payment";
import WalletInfo from "./components/WalletInfo";
import Warn from "./components/Warn";
import Web3Modal from "web3modal";
import Connect from "./components/Connect";
import { initNetworkContextType, initState, reducer } from "./reducers";
import { getNetworkInfo, isChainSupported } from "./utils";

export const NetworkContext = createContext(initNetworkContextType);

function App() {
    const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
    const [address, setAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("chainChanged", () => {
                window.location.reload();
            });
            window.ethereum.on("accountsChanged", () => {
                window.location.reload();
            });
        }
    });

    const fetchNetworkDetails = async () => {
        try {
            const { ethereum } = window;
            const provider = new ethers.providers.Web3Provider(ethereum);
            const { chainId } = await provider.getNetwork();
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            if (!isChainSupported(chainId)) {
                console.log("Chain not supported");
                dispatch({ type: "SET_NETWORK", payload: null });
            } else {
                console.log("Chain supported. Fetching network details...");
                const networkInfo = getNetworkInfo(chainId);
                if (networkInfo) {
                    console.log("Network details fetched.");
                    console.log(`Network: ${networkInfo.name}`);
                    console.log(`Network ID: ${chainId}`);
                    console.log(`Disperse Address: ${networkInfo.disperseAddress}`);
                    dispatch({ type: "SET_NETWORK", payload: networkInfo.name });
                    dispatch({ type: "SET_DISPERSE_ADDRESS", payload: networkInfo.disperseAddress });
                }
            }

            dispatch({ type: "SET_CHAIN_ID", payload: chainId });
            setAddress(address);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const checkAccountConnected = async () => {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await provider.listAccounts();
        if (!accounts.length) {
            setIsMetamaskConnected(false);
            return;
        }
        setIsMetamaskConnected(true);
    };

    const connect = async () => {
        try {
            const web3modal = new Web3Modal();
            const result = await web3modal.connect();
            if (result) {
                setIsMetamaskConnected(true);
                fetchNetworkDetails();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const { ethereum } = window;
        if (ethereum) {
            setIsMetamaskInstalled(true);
            checkAccountConnected();
            fetchNetworkDetails();
        } else {
            setIsMetamaskInstalled(false);
        }
    }, []);
    return (
        <div className="mx-4 px-4 md:mx-8 md:px-8 lg:mx-16 lg:px-16 xl:mx-48 xl:px-48 pt-16 md:pt-20 lg:pt-24 xl:pt-28">
            <NetworkContext.Provider
                value={{
                    chainId: state.chainId,
                    network: state.network,
                    disperseAddress: state.disperseAddress,
                }}
            >
                <Header address={address} />
                {isMetamaskInstalled ? !isMetamaskConnected && <Connect connect={connect} /> : <Warn />}
                {!isLoading && address && (
                    <>
                        <WalletInfo address={address} />
                        <Payment address={address} />
                    </>
                )}
            </NetworkContext.Provider>
        </div>
    );
}

export default App;
