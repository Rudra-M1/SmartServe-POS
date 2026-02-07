import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        setTimeout(() => setVisible(true), 10);

        // Auto dismiss
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300); // Wait for exit animation
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />
    };

    const colors = {
        success: 'border-green-100 bg-green-50/90 text-green-800',
        error: 'border-red-100 bg-red-50/90 text-red-800',
        info: 'border-blue-100 bg-blue-50/90 text-blue-800'
    };

    return (
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-3 px-6 py-3 rounded-full shadow-antigravity border backdrop-blur-md transition-all duration-300 ${colors[type]} ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {icons[type]}
            <span className="font-medium">{message}</span>
        </div>
    );
}
