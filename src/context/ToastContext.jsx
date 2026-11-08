import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const ToastContext = createContext(null)

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast must be used inside a ToastProvider')
    return context
}

export function ToastProvider({ children }) {
    const [toast, setToast] = useState({ message: '', type: 'success', visible: false })
    const timer = useRef(null)

    const showToast = useCallback((message, type = 'success') => {
        window.clearTimeout(timer.current)
        setToast({ message, type, visible: true })
        timer.current = window.setTimeout(() => {
            setToast((current) => ({ ...current, visible: false }))
        }, 3600)
    }, [])

    useEffect(() => () => window.clearTimeout(timer.current), [])

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <div
                className={`toast${toast.visible ? ' show' : ''}${
                    toast.type === 'error' ? ' is-error' : ''
                }`}
                id="toast"
                role="status"
                aria-live="polite"
            >
                <i
                    className={
                        toast.type === 'error' ? 'ri-error-warning-line' : 'ri-check-line'
                    }
                />
                <span>{toast.message}</span>
            </div>
        </ToastContext.Provider>
    )
}
