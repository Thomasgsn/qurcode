import React, { Dispatch, ReactNode, SetStateAction, useCallback, useEffect } from "react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onClose?: () => void;
    children?: ReactNode;
}

export const Modal = ({
    open,
    setOpen,
    onClose,
    children,
    ...props
}: ModalProps) => {

    const close = useCallback(() => {
        setOpen(false);
        onClose?.();
    }, [onClose, setOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };

        if (open) {
            const scrollbarWidth =
                window.innerWidth - document.documentElement.clientWidth;

            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;

            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [close, open]);

    return (
        <div
            onClick={close}
            className={`
                fixed inset-0 z-50 flex items-center justify-center transition-all
                ${open
                    ? "visible opacity-100 bg-black/70"
                    : "invisible opacity-0 pointer-events-none"}
            `}
        >
            <div
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                className={`
                    bg-white dark:bg-neutral-900 shadow-xl transition-all duration-400
                    ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}
                `}
                {...props}
            >
                {children}
            </div>
        </div>
    );
};

interface ModalTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    onOpen: () => void;
}

export const ModalTrigger = ({ children, onOpen, ...props }: ModalTriggerProps) => (
    <button onClick={onOpen} {...props}>
        {children}
    </button>
);
