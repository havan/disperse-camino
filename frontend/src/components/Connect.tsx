type ConnectProps = {
    connect: () => void;
};

const Connect = ({ connect }: ConnectProps) => {
    return (
        <div className="pt-16">
            <h3 className="text-2xl font-light italic">connect wallet to start</h3>
            <button onClick={connect} className="px-2 mt-6 p-2 italic dc-button dc-input-bg">
                connect wallet
            </button>
        </div>
    );
};

export default Connect;
