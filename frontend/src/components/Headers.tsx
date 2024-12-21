import { useContext } from "react";
import { NetworkContext } from "../App";
import CaminoPNG from "../assets/Camino-Token-Logo.png";

type HeaderProps = {
    address: string | null;
};

const Header = ({ address }: HeaderProps) => {
    const networkContext = useContext(NetworkContext);

    return (
        <div className="w-full">
            <div className="relative flex items-center space-between">
                <img
                    src={CaminoPNG}
                    style={{
                        width: "32px",
                        height: "32px",
                        marginLeft: "-32px",
                    }}
                    alt="Camino Token Logo"
                />
                <h2 className="mt-8 text-3xl md:text-4xl lg:text-5xl">disperse</h2>
                {address && (
                    <span className="text-sm md:text-base lg:text-lg italic">
                        {networkContext.network || "unsupported network"}
                    </span>
                )}

                {networkContext.disperseAddress && networkContext.explorerUrl && (
                    <span className="absolute right-0">
                        <a
                            href={`${networkContext.explorerUrl}address/${networkContext.disperseAddress}?tab=contract`}
                            target="_blank"
                            className="text-xs md:text-sm lg:text-base underline italic"
                        >
                            contract
                        </a>
                    </span>
                )}
            </div>
            <p className="mt-4 text-base md:text-lg lg:text-xl">
                <span className="mr-2 text-xs md:text-sm lg:text-base align-text-top italic">verb</span>
                distribute CAM or ERC20 tokens to multiple addresses
            </p>
            <p className="mt-4 text-red-500 text-base md:text-lg lg:text-xl">
                <span className="mr-2 text-xs md:text-sm lg:text-base align-text-top italic">state</span>
                beta, use at your own risk
            </p>
        </div>
    );
};

export default Header;
