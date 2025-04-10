import clsx from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children: ReactNode;
}

function Button({ onClick, disabled, children }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'w-8 h-8 flex items-center justify-center text-base font-semibold rounded-full transition-all',
                'bg-slate-500 hover:bg-slate-700 text-white shadow hover:shadow-lg',
                'disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed',
            )}
        >
            {children}
        </button>
    );
}

export default Button;
