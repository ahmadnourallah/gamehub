'use client';
import { FocusEventHandler, ChangeEventHandler } from 'react';

export default function AuthInput({
    label,
    id,
    name,
    type,
    className,
    value,
    onChange,
    onBlur,
    validationMessage,
    isValid
}: {
    label: string;
    id: string;
    name: string;
    type?: string;
    className?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    validationMessage?: string;
    isValid: boolean;
}) {
    return (
        <label className="flex w-min flex-col" htmlFor={id}>
            {label}
            <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id={id}
                className={`w-60 rounded-md border-none bg-white px-3 py-1 text-black outline-offset-2 focus:outline-2 focus:outline-blue-500 sm:w-100 ${isValid ? '' : 'outline-2 outline-amber-700'} ${className}`}
                name={name}
                type={type}
            />
            {validationMessage && (
                <span
                    className={`mt-2 text-sm text-red-500 ${isValid ? 'invisible' : 'visible'}`}
                >
                    {validationMessage}
                </span>
            )}
        </label>
    );
}
