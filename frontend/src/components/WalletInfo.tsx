type WalletInfoProps = {
    address: string;
};

const WalletInfo = ({ address }: WalletInfoProps) => {
    return (
        <div className="pt-16">
            <h3 className="text-2xl font-light italic">connected to wallet</h3>
            <div className="pt-3 flex">
                <div className="mr-2 text-xs md:text-sm lg:text-base align-text-top italic">as</div>
                <div className="text-base md:text-lg lg:text-xl">{address}</div>
            </div>
        </div>
    );
};

export default WalletInfo;
