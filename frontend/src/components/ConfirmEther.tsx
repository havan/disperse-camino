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
            setIsDisabled(!ethers.utils.parseUnits(tokenBalance).gt(total));
        }
    }, [total, tokenBalance]);

    return (
        <div className="pt-8">
            <h3 className="text-2xl font-light italic">confirm</h3>
            <ul>
                <li>
                    <div className="flex justify-between mt-4 border-b border-black">
                        <div className="italic">address</div>
                        <div className="italic">amount</div>
                    </div>
                </li>
                {recipientsData.length > 0 &&
                    recipientsData.map((recipient, i) => (
                        <li key={i}>
                            <div className="flex justify-between mt-2">
                                <div>{recipient.address}</div>
                                <div>{ethers.utils.formatEther(recipient.value)}</div>
                            </div>
                        </li>
                    ))}
                <li>
                    <div className="flex justify-between mt-6 border-t border-black">
                        <div className="italic">total</div>
                        <div className="italic">{total ? ethers.utils.formatEther(total) : ""}</div>
                    </div>
                </li>
                <li>
                    <div className="flex justify-between mt-2">
                        <div className="italic">your balance</div>
                        <div className="italic">{tokenBalance}</div>
                    </div>
                </li>
                <li>
                    <div className={`flex justify-between mt-2 ${isDisabled && "text-red-700"}`}>
                        <div className="italic">remaining</div>
                        <div className="italic">{remaining}</div>
                    </div>
                </li>
            </ul>
            {total && tokenBalance && (
                <div className="mt-8 mb-8">
                    <div className="mt-6 mb-16 flex items-center ">
                        <button
                            onClick={disperse}
                            disabled={isDisabled}
                            className={`px-2 py-3 italic disabled:opacity-50 cursor-pointer ${
                                isDisabled && `disabled:cursor-default`
                            }`}
                            style={{
                                background: "aquamarine",
                                boxShadow: "6px 6px crimson",
                            }}
                        >
                            disperse CAM
                        </button>
                        {isDisabled && <div className="ml-4 italic">total exceeds balance</div>}
                        {txStatus && <Status txnStatus={txStatus} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfirmEther;
