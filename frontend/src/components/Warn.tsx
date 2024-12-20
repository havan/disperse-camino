const Warn = () => {
    return (
        <div className="pt-16">
            <h3 className="text-2xl font-light italic">EVM (Ethereum) wallet required</h3>
            <p className="pt-3 text-l font-light">
                consider installing a supported wallet (MetaMask, Rabby, any other EVM wallet)
            </p>
        </div>
    );
};

export default Warn;
