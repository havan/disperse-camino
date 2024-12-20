import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { RecipientInfo } from "../types/Recipient";
import { TxStatus } from "../types/Transaction";
import Status from "./Status";

type ConfirmProps = {
    recipientsData: RecipientInfo[];
    total: ethers.BigNumber | null;
    tokenBalance: string | null;
    tokenDecimals: number | null;
    remaining: string | null;
    approve: () => Promise<void>;
    disperse: () => Promise<void>;
    txStatus: TxStatus | null;
    approveStatus: TxStatus | null;
};

const Confirm = ({
    recipientsData,
    total,
    tokenBalance,
    tokenDecimals,
    remaining,
    approve,
    disperse,
    txStatus,
    approveStatus,
}: ConfirmProps) => {
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (total && tokenBalance && tokenDecimals) {
            setIsDisabled(!ethers.utils.parseUnits(tokenBalance, tokenDecimals).gt(total));
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
                    recipientsData.map((recipient, index) => (
                        <li key={index}>
                            <div className="flex justify-between mt-2">
                                <div>{recipient.address}</div>
                                <div className="border-b-2 border-black flex-grow-1"></div>
                                <div>{ethers.utils.formatUnits(recipient.value, tokenDecimals ?? 18)}</div>
                            </div>
                        </li>
                    ))}
                <li>
                    <div className="flex justify-between mt-6 border-t border-black">
                        <div className="italic">total</div>
                        <div className="italic">
                            {total ? ethers.utils.formatUnits(total, tokenDecimals ?? 18) : ""}
                        </div>
                    </div>
                </li>
                <li>
                    <div className="flex justify-between mt-2">
                        <div className="italic">your balance</div>
                        <div className="italic">{tokenBalance}</div>
                    </div>
                </li>
                <li>
                    <div className={`flex justify-between mt-2 ${isDisabled && "text-red-700 animate-pulse"}`}>
                        <div className="italic">remaining</div>
                        <div className="italic">{remaining}</div>
                    </div>
                </li>
            </ul>
            <div className="mt-8">
                <h3 className="text-2xl font-light italic ">allowance</h3>
                <div className="mt-4 flex items-center">
                    <button
                        onClick={approve}
                        className={`px-2 py-3 italic disabled:opacity-50 cursor-pointer ${
                            isDisabled && `disabled:cursor-default`
                        }`}
                        style={{
                            background: "aquamarine",
                            boxShadow: "6px 6px crimson",
                        }}
                        disabled={isDisabled}
                    >
                        approve
                    </button>
                    {isDisabled && <div className="ml-4 italic animate-pulse">total exceeds balance</div>}
                    {approveStatus && <Status txnStatus={approveStatus} />}
                </div>
                <div className="mt-6 flex items-center">
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
                        disperse token
                    </button>
                    {isDisabled && <div className="ml-4 italic animate-pulse">total exceeds balance</div>}
                    {txStatus && <Status txnStatus={txStatus} />}
                </div>
            </div>
        </div>
    );
};

export default Confirm;
