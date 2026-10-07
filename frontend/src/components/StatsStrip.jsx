import React, { useState, useEffect, useRef } from "react";
import { Users, BookOpen, Code2, Award } from "lucide-react";

// ── U6: Animated Counter Hook ─────────────────────────────────────────────────
function useCountUp(target, duration = 1800, isVisible = false) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;

    // Parse the numeric part from strings like "42,000+", "94%", "65+"
    const numericStr = target.replace(/[^0-9]/g, "");
    const end = parseInt(numericStr, 10);
    if (isNaN(end)) return;

    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  // Format the count to match the original format
  if (!isVisible || !started.current) return "0";
  const numericStr = target.replace(/[^0-9]/g, "");
  const end = parseInt(numericStr, 10);
  if (isNaN(end)) return target;
  const formatted = count.toLocaleString();
  return target.replace(numericStr, formatted);
}

function AnimatedStat({ icon: Icon, value, label, description, isVisible }) {
  const displayValue = useCountUp(value, 1800, isVisible);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        padding: "12px",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          color: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "var(--shadow-xs)",
        }}
      >
        <Icon size={22} />
      </div>

      <div>
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "4px",
            transition: "all 0.1s ease",
          }}
        >
          {displayValue}
        </div>
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.92rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "2px",
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
          {description}
        </div>
      </div>
    </div>
  );
}

export default function StatsStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const stats = [
    {
      icon: Users,
      value: "4,218+",
      label: "Active Squads",
      description: "Study groups learning together right now",
    },
    {
      icon: Code2,
      value: "12,847+",
      label: "Missions Completed Today",
      description: "Across all tracks and sprints globally",
    },
    {
      icon: Award,
      value: "18+",
      label: "Avg Score Gain/Sprint",
      description: "Career Readiness Score points per 14-day sprint",
    },
    {
      icon: BookOpen,
      value: "91%",
      label: "Streak Retention",
      description: "Learners who keep their streak past day 7",
    },
  ];

  // U6: Intersection Observer to trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "var(--bg-subtle)",
        borderBottom: "1px solid var(--border)",
        padding: "36px 0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {stats.map((stat) => (
            <AnimatedStat
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
