import { Badge } from "@/components/shared/Badge";
import type { PostKind } from "@/data/mock";

const kindConfig: Record<
  PostKind,
  { tone: "sage" | "sky" | "indigo"; label: string }
> = {
  achievement: { tone: "sage", label: "LOGRO" },
  activity: { tone: "sky", label: "ACTIVIDAD" },
  announcement: { tone: "indigo", label: "ANUNCIO" },
};

type PostBadgeProps = {
  kind: PostKind;
};

export function PostBadge({ kind }: PostBadgeProps) {
  const { tone, label } = kindConfig[kind];
  return <Badge tone={tone} label={label} />;
}