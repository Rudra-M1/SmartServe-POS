export default function Card({ children, className = '', ...props }) {
    // Agar className mein 'p-' hai toh default padding mat lagao
    const hasPadding = className.includes('p-');
    const defaultPadding = hasPadding ? '' : 'p-6';

    return (
        <div
            className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-antigravity border border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${defaultPadding} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}