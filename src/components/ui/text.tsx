import { Text as RNText, type TextProps } from "react-native";
import { cn } from "@/lib/cn";
import { fontFamilies } from "@/lib/fonts";

const variants = {
  display: "text-title tracking-wide text-text",
  heading: "text-heading tracking-wide text-text",
  body: "text-base text-text",
  strong: "text-base text-text",
  muted: "text-sm text-muted",
  label: "text-xs tracking-widest text-muted",
  jp: "text-2xl text-text",
};

// Bangers glyphs overhang their advance width and Android clips drawing at the text box
// (padding does not help, it is clipped too). A trailing thin space puts the overhang inside the box.
const OVERHANG = " ";

export function Text({
  variant = "body",
  className,
  style,
  children,
  ...props
}: TextProps & { variant?: keyof typeof variants }) {
  return (
    <RNText
      className={cn(variants[variant], className)}
      // includeFontPadding: Android adds uneven top/bottom padding to custom fonts (Bangers: 3x more on top), which pushes labels off-centre.
      style={[
        { fontFamily: fontFamilies[variant], includeFontPadding: false },
        style,
      ]}
      {...props}
    >
      {children}
      {variant === "display" || variant === "heading" ? OVERHANG : null}
    </RNText>
  );
}
