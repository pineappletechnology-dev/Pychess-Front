"use client";

import { useState } from 'react';
import Image from 'next/image';

interface inputOptions {
    inputName: string;
    inputText: string;
    inputLabel: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({ inputName, inputText, inputLabel, value, onChange }: inputOptions) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={inputName}>{inputLabel}</label>

            <div className='bg-gray-50 px-4 rounded-md border border-gray-300 py-3 flex justify-between'>
                <input
                    type={showPassword ? "text" : "password"}
                    className=""
                    name={inputName}
                    id={inputName}
                    placeholder={inputText}
                    value={value}
                    onChange={onChange}
                />
                <button type='button' onClick={togglePasswordVisibility}>
                    <Image
                        src={showPassword ? "/icons/eye-off.svg" : "/icons/eye-on.svg"}
                        alt="password visibility"
                        width={25}
                        height={25}
                    />
                </button>
            </div>
        </div>
    );
}