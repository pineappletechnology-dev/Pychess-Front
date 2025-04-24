import styles from './styles.module.css'

interface inputOptions {
    inputName: string;
    inputText: string;
    inputLabel: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ inputName, inputText, inputLabel, value, onChange }: inputOptions) {
    return (
        <div className={styles.input}>
            <label htmlFor={inputName} className={styles.inputLabel}>{inputLabel}</label>
            <input
                type="text"
                className={styles.inputText}
                name={inputName}
                id={inputName}
                placeholder={inputText}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}