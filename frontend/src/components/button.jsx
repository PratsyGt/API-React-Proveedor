export default function Button({ children, onClick, variant = 'primary', type = 'button' }) {
    return (
    <button type={type} onClick={onClick} className={`btn-custom ${variant}`}>
        {children}
    </button>
    );
}