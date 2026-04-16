type IEEGaugeProps = {
  iee: number;
  color: string;
};

export function IEEGauge({ iee, color }: IEEGaugeProps) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg viewBox="0 0 120 120" className="w-40 h-40">
        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${(iee / 100) * 327} 327`}
          transform="rotate(-90 60 60)"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-4xl font-bold" style={{ color }}>{iee}%</span>
      </div>
    </div>
  );
}
