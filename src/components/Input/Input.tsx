import styles from './styles.module.css'

interface inputOptions {
    inputName: string;
    inputText: string;
    inputLabel: string;
}

export default function Input({inputName, inputText, inputLabel}: inputOptions) {
    return(
        <div className={styles.input}>
            <label htmlFor="" className={styles.inputLabel}>{inputLabel}</label>
            <input type="text" className={styles.inputText} name={inputName} placeholder={inputText} />
        </div>
    )
}