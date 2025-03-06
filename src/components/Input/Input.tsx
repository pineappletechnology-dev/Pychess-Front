import styles from './styles.module.css'

interface inputOptions {
    inputName: string;
    inputText: string;
    inputLabel: string;
}

export default function Input({inputName, inputText, inputLabel}: inputOptions) {
    return(
        <div>
            <label htmlFor="">{inputLabel}</label>
            <input type="text" name={inputName} placeholder={inputText} />
        </div>
    )
}