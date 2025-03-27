import styles from './styles.module.css'

interface inputOptions {
    inputName: string;
    inputText: string;
    inputLabel: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ inputName, inputText, inputLabel, onChange }: inputOptions) {
    return (
        <div className={styles.input}>
            <label htmlFor="" className={styles.inputLabel}>{inputLabel}</label>
            <input type="text" className={styles.inputText} name={inputName} placeholder={inputText} onChange={onChange} />
        </div>
    )
}