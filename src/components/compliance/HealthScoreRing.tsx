import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { scoreCategories, scoreTrend, overallScore } from '@/data/compliance';

const RADIUS = 68;
const STROKE_WIDTH = 12;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ScoreBar({ category, index }: { category: (typeof scoreCategories)[0]; index: number }) {
  const colorClass =
    category.status === 'green'
      ? 'bg-[#22C55E]'
      : category.status === 'amber'
        ? 'bg-[#F59E0B]'
        : 'bg-[#EF4444]';

  const statusColor =
    category.status === 'green'
      ? 'text-[#16A34A]'
      : category.status === 'amber'
        ? 'text-[#B45309]'
        : 'text-[#DC2626]';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">{category.name}</span>
        <span className="text-sm font-bold text-slate-900">{category.score}/100</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colorClass} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${category.score}%` }}
          transition={{ duration: 1, delay: 0.3 + index * 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        />
      </div>
      <span className={`text-xs font-medium ${statusColor}`}>{category.label}</span>
    </div>
  );
}

function TrendSparkline() {
  const height = 48;
  const width = 160;
  const maxVal = Math.max(...scoreTrend);
  const minVal = Math.min(...scoreTrend);
  const range = maxVal - minVal || 1;

  const points = scoreTrend.map((val, i) => {
    const x = (i / (scoreTrend.length - 1)) * width;
    const y = height - ((val - minVal) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });

  const areaPoints = `0,${height} ${points.join(' ')} ${width},${height}`;

  return (
    <div className="flex items-center gap-3">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#sparkFill)" />
        <motion.polyline
          points={points.join(' ')}
          fill="none"
          stroke="#22C55E"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        />
      </svg>
      <div className="flex items-center gap-1 text-sm font-medium text-[#16A34A]">
        <TrendingUp className="w-4 h-4" />
        <span>+12 pts</span>
      </div>
    </div>
  );
}

export default function HealthScoreRing() {
  const [animatedScore, setAnimatedScore] = useState(0);

  const progress = overallScore / 100;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const scoreColor = overallScore >= 75 ? '#22C55E' : overallScore >= 50 ? '#F59E0B' : '#EF4444';
  const scoreLabel = overallScore >= 75 ? 'Good' : overallScore >= 50 ? 'Needs Work' : 'Critical';
  const scoreSubtext = overallScore >= 75
    ? "You're doing well, with some room to improve"
    : overallScore >= 50
      ? 'Several areas need attention soon'
      : 'Urgent action required across multiple areas';

  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      setAnimatedScore(Math.round(eased * overallScore));
      if (progress < 1) requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => requestAnimationFrame(animate), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-16 border border-slate-100 shadow-card p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Score Ring */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <div className="relative">
            <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
              {/* Track */}
              <circle
                cx="80"
                cy="80"
                r={RADIUS}
                fill="none"
                stroke="#F1F5F9"
                strokeWidth={STROKE_WIDTH}
              />
              {/* Fill */}
              <motion.circle
                cx="80"
                cy="80"
                r={RADIUS}
                fill="none"
                stroke={scoreColor}
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold font-mono text-slate-900">{animatedScore}</span>
              <span className="text-xs text-slate-400 mt-1">of 100</span>
            </div>
          </div>
          <span className="text-lg font-semibold font-heading" style={{ color: scoreColor }}>
            {scoreLabel}
          </span>
          <p className="text-sm text-slate-500 text-center max-w-[200px]">{scoreSubtext}</p>
          <TrendSparkline />
        </div>

        {/* Score Breakdown */}
        <div className="flex-1 w-full space-y-5">
          {scoreCategories.map((cat, i) => (
            <ScoreBar key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
