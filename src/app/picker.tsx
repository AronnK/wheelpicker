"use client";
import React, { useRef, useState } from "react";

interface PickerProps {
  optionGroups: { [key: string]: (string | number)[] };
  valueGroups: { [key: string]: string | number };
  onChange: (newValue: string | number) => void;
}

const Picker: React.FC<PickerProps> = ({
  optionGroups,
  valueGroups,
  onChange,
}) => {
  const groupKey = Object.keys(optionGroups)[0];
  const items = optionGroups[groupKey];
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const itemHeight = 32;
      const firstVisibleIndex = Math.floor(
        containerRef.current.scrollTop / itemHeight
      );

      setHighlightedIndex(firstVisibleIndex + 1);
      const clampedIndex = Math.max(
        0,
        Math.min(firstVisibleIndex + 1, items.length - 1)
      );

      const newValue = items[clampedIndex];
      if (newValue !== valueGroups[groupKey]) {
        onChange(newValue);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="relative h-40 overflow-y-auto flex flex-col items-center gap-2 scroll-smooth snap-y snap-mandatory"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none; // Hides scrollbar in Chrome, Safari, and Edge
        }
      `}</style>
      {items.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer snap-center ${
            index === highlightedIndex
              ? "bg-[#26262D] text-black h-[32px] w-full py-[8px] px-[20px] border-2 border-[#26262D] rounded-lg"
              : "text-black"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Picker;
