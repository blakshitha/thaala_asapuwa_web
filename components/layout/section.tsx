import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLProps<HTMLElement> {
  background?: string;
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ className, children, background, ...props }) => {
  return (
    <div className={background || "bg-default"}>
      <section
        className={cn("py-12 mx-auto max-w-7xl px-6", className)}
        {...props}
      >
        {children}
      </section>
    </div>
  );
};

export const tailwindBackgroundOptions = [
  { label: "Default", value: "bg-default" },
  { label: "White", value: "bg-white" },
  { label: "Off-White", value: "bg-zinc-50" },
  { label: "Light Gray", value: "bg-zinc-100" },
  { label: "Gray", value: "bg-zinc-200" },
  { label: "Dark Gray", value: "bg-zinc-800" },
  { label: "Near Black", value: "bg-zinc-900" },
  { label: "Black", value: "bg-black" },
  { label: "Gold Tint", value: "bg-amber-50" },
  { label: "Gold Light", value: "bg-amber-100" },
  { label: "Gold", value: "bg-primary" },
  { label: "Gold/Black", value: "bg-gradient-to-br from-black to-amber-900" },
  { label: "Black/Gold", value: "bg-gradient-to-br from-zinc-900 to-amber-950" },
  { label: "White/Gold", value: "bg-gradient-to-br from-white to-amber-100" },
];

export const sectionBlockSchemaField = {
  type: "string",
  label: "Background",
  name: "background",
  options: tailwindBackgroundOptions,
};