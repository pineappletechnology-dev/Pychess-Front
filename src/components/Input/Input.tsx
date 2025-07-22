interface inputOptions {
    inputName: string;
    inputText: string;
    inputLabel: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ inputName, inputText, inputLabel, value, onChange }: inputOptions) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={inputName} className="">{inputLabel}</label>
            <input
                type="text"
                className="bg-gray-50 px-4 rounded-md border border-gray-300 py-3"
                name={inputName}
                id={inputName}
                placeholder={inputText}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}