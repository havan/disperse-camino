type RecipientsProps = {
    tokenSymbol: string | null;
    textValue: string;
    setTextValue: React.Dispatch<React.SetStateAction<string>>;
};

const Recipients = ({ tokenSymbol, textValue, setTextValue }: RecipientsProps) => {
    return (
        <div className="pt-16 mb-8">
            <h3 className="text-2xl font-light italic">recipients and amounts</h3>
            <p className="pt-3 italic font-light">
                enter one address and amount in {tokenSymbol} on each line, separated by a comma, space, tab, or equal
                sign
            </p>
            <textarea
                spellCheck="false"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                className="block border-b-2 border-black outline-none px-2 py-2 mt-4 h-48 max-w-3xl text-xs md:text-sm lg:text-base dc-input dc-input-bg"
                placeholder="0xFe77dcE375C3814F15F8035bCAC1A791D3dCdf21=21.42
0xFe77dcE375C3814F15F8035bCAC1A791D3dCdf21 21.42
0xFe77dcE375C3814F15F8035bCAC1A791D3dCdf21,21.42"
            ></textarea>
        </div>
    );
};

export default Recipients;
