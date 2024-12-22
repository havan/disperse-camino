import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { RecipientInfo } from "../types/Recipient";
import { TxStatus } from "../types/Transaction";
import Status from "./Status";

type ConfirmEtherProps = {
    recipientsData: RecipientInfo[];
    total: ethers.BigNumber | null;
    tokenBalance: string | null;
    remaining: string | null;
    disperse: () => Promise<void>;
    txStatus: TxStatus | null;
};

const ConfirmEther = ({ recipientsData, total, tokenBalance, remaining, disperse, txStatus }: ConfirmEtherProps) => {
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (total && tokenBalance) {
            const balance = ethers.utils.parseEther(tokenBalance);
            console.log(`[CAM] Balance: ${balance} Total: ${total} Remaining: ${remaining}`);
            setIsDisabled(!balance.gt(total));
        }
    }, [total, tokenBalance]);

    return (
        <div className="pt-8">
            <h3 className="text-2xl font-light italic">confirm</h3>
            <ul>
                <li>
                    <div className="flex justify-between mt-4 mb-4 border-b border-black">
                        <div className="italic">address</div>
                        <div className="italic">amount</div>
                    </div>
                </li>
                {recipientsData.length > 0 &&
                    recipientsData.map((recipient, i) => (
                        <li key={i}>
                            <div className="flex justify-between mt-2">
                                <div>{recipient.address}</div>
                                <div className="bar"></div>
                                <div>{ethers.utils.formatEther(recipient.value)} CAM</div>
                            </div>
                        </li>
                    ))}
                <li>
                    <div className="flex justify-between mt-4 border-t border-black">
                        <div className="italic">total ({recipientsData.length} addresses)</div>
                        <div className="italic">{total ? ethers.utils.formatEther(total) : ""} CAM</div>
                    </div>
                </li>
                <li>
                    <div className="flex justify-between mt-2">
                        <div className="italic">your balance</div>
                        <div className="italic">{tokenBalance} CAM</div>
                    </div>
                </li>
                <li>
                    <div className={`flex justify-between mt-2 ${isDisabled && "text-red-700 animate-pulse"}`}>
                        <div className="italic">remaining</div>
                        <div className="italic">{remaining} CAM</div>
                    </div>
                </li>
            </ul>
            {total && tokenBalance && (
                <div className="mt-8 mb-8">
                    <div className="mt-6 mb-16 flex items-center ">
                        <button
                            onClick={disperse}
                            disabled={isDisabled}
                            className={`px-2 py-3 italic disabled:opacity-50 cursor-pointer dc-button dc-input-bg ${
                                isDisabled && `disabled:cursor-default`
                            }`}
                        >
                            disperse CAM
                        </button>
                        {isDisabled && <div className="ml-4 italic animate-pulse">total exceeds balance</div>}
                        {txStatus && <Status txnStatus={txStatus} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfirmEther;
