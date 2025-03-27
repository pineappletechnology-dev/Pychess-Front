"use client";

import { useState } from 'react';
import styles from './styles.module.css'
import Image from 'next/image';

interface inputOptions {
    inputName: string;
    inputText: string;
    inputLabel: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({ inputName, inputText, inputLabel, onChange }: inputOptions) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className={styles.input}>
            <label htmlFor="" className={styles.inputLabel}>{inputLabel}</label>

            <div className={styles.inputPasswordContainer}>
                <input type={showPassword ? "text" : "password"} className={styles.inputText} name={inputName} placeholder={inputText} onChange={onChange} />
                <button onClick={togglePasswordVisibility}><Image src={showPassword ? "/icons/eye-off.svg" : "/icons/eye-on.svg"} alt="password visibility" width={25} height={25} /></button>
            </div>
        </div>
    )
}