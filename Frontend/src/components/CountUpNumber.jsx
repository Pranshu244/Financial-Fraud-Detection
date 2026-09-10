import React, { useEffect, useState, useRef } from 'react';
import { animate } from 'framer-motion';

export default function CountUpNumber({ value = 0, duration = 0.7, decimals = 0, prefix = '', suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(0);

  useEffect(() => {
    const startVal = prevValueRef.current;
    const endVal = Number(value) || 0;

    if (startVal === endVal) {
      setDisplayValue(endVal);
      return;
    }

    const controls = animate(startVal, endVal, {
      duration,
      ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier easing
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
      onComplete: () => {
        prevValueRef.current = endVal;
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  const formatted = decimals > 0
    ? Number(displayValue).toFixed(decimals)
    : Math.round(displayValue).toLocaleString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
