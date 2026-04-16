type RadarChartProps = {
  scores: { name: string; percentage: number }[];
};

export function RadarChart({ scores }: RadarChartProps) {
  const chartDescription = `Gráfico radar com desempenho por setor: ${scores
    .map((score) => `${score.name} ${score.percentage}%`)
    .join(', ')}.`;
  const size = 300;
  const center = size / 2;
  const radius = 120;
  const levels = 5;
  const count = scores.length;

  const angleStep = (2 * Math.PI) / count;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const scaledRadius = (value / 100) * radius;
    return {
      x: center + scaledRadius * Math.cos(angle),
      y: center + scaledRadius * Math.sin(angle),
    };
  };

  const gridLines = Array.from({ length: levels }, (_, index) => {
    const scaledRadius = ((index + 1) / levels) * radius;
    return Array.from({ length: count }, (_, scoreIndex) => {
      const angle = startAngle + scoreIndex * angleStep;
      return `${center + scaledRadius * Math.cos(angle)},${center + scaledRadius * Math.sin(angle)}`;
    }).join(' ');
  });

  const dataPoints = scores.map((score, index) => getPoint(index, score.percentage));
  const dataPath = dataPoints.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ') + 'Z';

  const axisLines = scores.map((_, index) => {
    const angle = startAngle + index * angleStep;
    return {
      x2: center + radius * Math.cos(angle),
      y2: center + radius * Math.sin(angle),
    };
  });

  const labels = scores.map((score, index) => {
    const angle = startAngle + index * angleStep;
    const labelRadius = radius + 28;
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
      name: score.name,
    };
  });

  return (
    <svg role="img" aria-label={chartDescription} viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[400px] mx-auto">
      {gridLines.map((points, index) => (
        <polygon key={index} points={points} fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="1" />
      ))}
      {axisLines.map((line, index) => (
        <line key={index} x1={center} y1={center} x2={line.x2} y2={line.y2} stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
      ))}
      <path d={dataPath} fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="2" />
      {dataPoints.map((point, index) => (
        <circle key={index} cx={point.x} cy={point.y} r="4" fill="#f59e0b" stroke="#0a0e1a" strokeWidth="2" />
      ))}
      {labels.map((label, index) => (
        <text
          key={index}
          x={label.x}
          y={label.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[7px] fill-slate-400"
          style={{ fontFamily: 'system-ui' }}
        >
          {label.name}
        </text>
      ))}
    </svg>
  );
}
