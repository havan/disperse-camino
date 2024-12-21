import { useContext } from "react";
import { NetworkContext } from "../App";
import { getNetworkInfo } from "../utils";
import { TxStatus } from "../types/Transaction";

type StatusProps = {
    txnStatus: TxStatus;
};

const Status = ({ txnStatus }: StatusProps) => {
    const { chainId } = useContext(NetworkContext);
    const networkInfo = getNetworkInfo(chainId);

    return (
        <div className={`flex flex-col ml-4 ${txnStatus.status === "pending" && "animate-pulse"}`}>
            {(txnStatus.status !== "error" && (
                <>
                    <p className={`text-sm italic font-semibold ${txnStatus.status === "success" && "text-green-500"}`}>
                        transaction {txnStatus.status}
                    </p>
                    <a
                        href={`${networkInfo?.blockExplorer}tx/${txnStatus.hash}`}
                        target="_blank"
                        className="text-xs border-gray-600 border-b-2"
                    >
                        {txnStatus.hash}
                    </a>
                </>
            )) || (
                <>
                    <p className="text-sm italic font-semibold text-red-500">error</p>
                    <div className="text-xs border-red-500 border-b-2 text-red-500">{txnStatus.hash}</div>
                </>
            )}
        </div>
    );
};

export default Status;
