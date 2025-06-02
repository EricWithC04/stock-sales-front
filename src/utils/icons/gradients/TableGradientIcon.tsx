export const TableGradientIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a7217f" />
                <stop offset="100%" stopColor="#d3216a" />
            </linearGradient>
        </defs>
        <path d="M12 3v18 0.01h0.1l"></path>
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M3 9h18M3 15h18"></path>
    </svg>
);