export type ToastProps = {
    show: boolean;
    message: string;
    level: 'error' | 'warning' | 'info'
}
export default function ToastMessage({ show, message, level }: ToastProps) {
    if (show) {
        return (
            <div className="toast">
                <div className={`alert alert-${level}`}>
                    <div>
                        <span>{message}</span>
                    </div>
                </div>
            </div>)
    }
    return null;
}