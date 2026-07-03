interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="10" cy="16" r="4" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="22" cy="16" r="4" stroke="white" strokeWidth="2" fill="none" />
        <line x1="14" y1="16" x2="18" y2="16" stroke="white" strokeWidth="2" />
      </svg>
      <span
        className="font-sans text-lg font-semibold tracking-tight text-white"
        style={{ fontSize: size * 0.6 }}
      >
        Looma
      </span>
    </div>
  );
}
