import { useId } from "react";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Path,
  Pattern,
  Rect,
  Text as SvgText,
} from "react-native-svg";
import { colors } from "@/lib/colors";

const { ink, paper, gold } = colors;
const JP = "ZenMaruGothic_700Bold";

const Bubble = ({
  cx,
  cy,
  rx,
  ry,
  text,
  size,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  text: string;
  size: number;
}) => (
  <>
    <Ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill="#fff"
      stroke={ink}
      strokeWidth={3}
    />
    <SvgText
      x={cx}
      y={cy + 4}
      textAnchor="middle"
      fontFamily={JP}
      fontSize={size}
      fill={ink}
    >
      {text}
    </SvgText>
  </>
);

const Person = ({ x, hair }: { x: number; hair: string }) => (
  <>
    <Path
      d={`M${x - 32},120 Q${x - 30},98 ${x},96 Q${x + 30},98 ${x + 32},120Z`}
      fill={ink}
    />
    <Circle cx={x} cy={72} r={19} fill="#fff" stroke={ink} strokeWidth={3} />
    <Path d={hair} fill={ink} />
  </>
);

// The four intro panels (menu / customer / chef / bowl), drawn in a 157x120 box.
const art = [
  (ht: string) => (
    <>
      <Rect y={70} width={157} height={50} fill={ht} />
      <Rect width={157} height={14} fill={ink} />
      {[9, 45, 81, 117].map((x) => (
        <Path
          key={x}
          d={`M${x},14 H${x + 30} V70 L${x + 15},62 L${x},70Z`}
          fill={ink}
        />
      ))}
      {[
        ["ら", 24],
        ["め", 96],
        ["ん", 132],
      ].map(([t, x]) => (
        <SvgText
          key={t}
          x={x}
          y={46}
          textAnchor="middle"
          fontFamily={JP}
          fontSize={20}
          fill={paper}
        >
          {t}
        </SvgText>
      ))}
      <Rect x={57} y={26} width={6} height={30} rx={3} fill={paper} />
      <Rect y={98} width={157} height={22} fill={ink} />
      <Ellipse
        cx={24}
        cy={88}
        rx={12}
        ry={10}
        fill={gold}
        stroke={ink}
        strokeWidth={3}
      />
    </>
  ),
  (ht: string) => (
    <>
      <Rect y={72} width={157} height={48} fill={ht} />
      <Person
        x={44}
        hair="M24,70 Q24,48 44,48 Q64,48 64,70 Q54,60 44,62 Q34,60 24,70Z"
      />
      <Circle cx={37} cy={77} r={2.2} fill={ink} />
      <Circle cx={51} cy={77} r={2.2} fill={ink} />
      <Path
        d="M40,86 Q44,89 48,86"
        fill="none"
        stroke={ink}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M80,50 L62,57 L92,54Z"
        fill="#fff"
        stroke={ink}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <Bubble cx={104} cy={34} rx={44} ry={21} text="すみません！" size={12} />
    </>
  ),
  (ht: string) => (
    <>
      <Rect y={72} width={157} height={48} fill={ht} />
      <Person x={113} hair="M95,60 Q96,46 113,46 Q130,46 131,60Z" />
      <Rect
        x={94}
        y={58}
        width={38}
        height={9}
        fill={gold}
        stroke={ink}
        strokeWidth={2.5}
      />
      <Path
        d="M103,78 Q106,74 109,78M117,78 Q120,74 123,78"
        fill="none"
        stroke={ink}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Ellipse cx={113} cy={87} rx={5} ry={4} fill={ink} />
      <Path
        d="M78,45 L98,56 L92,38Z"
        fill="#fff"
        stroke={ink}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <Bubble cx={54} cy={30} rx={48} ry={20} text="いらっしゃい！" size={11} />
    </>
  ),
  (ht: string) => (
    <>
      <Rect y={80} width={157} height={40} fill={ht} />
      <Path
        d="M52,70 Q46,62 52,54 Q58,46 52,41M105,70 Q99,62 105,54 Q111,46 105,41"
        fill="none"
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path d="M26,86 Q28,112 78.5,114 Q129,112 131,86Z" fill={ink} />
      <Ellipse
        cx={78.5}
        cy={86}
        rx={52.5}
        ry={10}
        fill={gold}
        stroke={ink}
        strokeWidth={3}
      />
      <Circle cx={98} cy={84} r={6} fill="#fff" stroke={ink} strokeWidth={2} />
      <Path
        d="M50,84 Q58,78 66,84 T82,84"
        fill="none"
        stroke={ink}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M70,37 L76,50 L86,37Z"
        fill="#fff"
        stroke={ink}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <Bubble cx={78.5} cy={22} rx={52} ry={17} text="ラーメンを" size={11} />
    </>
  ),
];

/** One manga panel from the first strip (index 0-3). Scales to any width. */
export function Panel({
  index,
  width,
}: {
  index: 0 | 1 | 2 | 3;
  width: number;
}) {
  const id = useId().replace(/\W/g, "");
  const ht = `ht${id}`;
  const clip = `clip${id}`;
  return (
    <Svg width={width} height={(width * 120) / 157} viewBox="0 0 157 120">
      <Defs>
        <Pattern
          id={ht}
          width={6}
          height={6}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(30)"
        >
          <Circle cx={3} cy={3} r={1.3} fill={ink} opacity={0.4} />
        </Pattern>
        <ClipPath id={clip}>
          <Rect x={1.5} y={1.5} width={154} height={117} rx={6} />
        </ClipPath>
      </Defs>
      <G clipPath={`url(#${clip})`}>
        <Rect width={157} height={120} fill={paper} />
        {art[index](`url(#${ht})`)}
      </G>
      <Rect
        x={1.5}
        y={1.5}
        width={154}
        height={117}
        rx={6}
        fill="none"
        stroke={ink}
        strokeWidth={3}
      />
    </Svg>
  );
}
