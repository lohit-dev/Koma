import { Text as RNText, type TextProps } from "react-native";
import { cn } from "@/lib/cn";
import { fontFamilies } from "@/lib/fonts";

const variants = {
  display: "font-display text-title tracking-wide text-text",
  heading: "font-display text-heading tracking-wide text-text",
  body: "font-sans text-base text-text",
  strong: "font-sans-semibold text-base text-text",
  muted: "font-sans text-sm text-muted",
  label: "font-sans-semibold text-xs tracking-widest text-muted",
  jp: "font-jp-bold text-2xl text-text",
};

export function Text({
  variant = "body",
  className,
  style,
  ...props
}: TextProps & { variant?: keyof typeof variants }) {
  return (
    <RNText
      className={cn(variants[variant], className)}
      style={[{ fontFamily: fontFamilies[variant] }, style]}
      {...props}
    />
  );
}
