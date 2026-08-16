import { Avatar } from "@/components/shared/Avatar";
import { Badge } from "@/components/shared/Badge";

export type Parent = {
  id: string;
  name: string;
  initial: string;
  avatarColor: string;
  role: "Mamá" | "Papá" | "Tutor";
  status: "active" | "pending";
};

type ParentListItemProps = {
  parent: Parent;
};

const statusSubtitle = (status: Parent["status"]) =>
  status === "active" ? "activa" : "invitación enviada";

const statusBadge = (status: Parent["status"]) =>
  status === "active"
    ? { tone: "sage" as const, label: "ACTIVA" }
    : { tone: "yellow" as const, label: "PENDIENTE" };

export function ParentListItem({ parent }: ParentListItemProps) {
  const badge = statusBadge(parent.status);
  return (
    <div className="flex items-center gap-3">
      <Avatar
        color={parent.avatarColor}
        initial={parent.initial}
        className="text-white"
        size={40}
      />
      <div className="flex-1 min-w-0">
        <div className="font-extrabold text-[14.5px] text-ink-900 truncate">
          {parent.name}
        </div>
        <div className="text-[12.5px] text-ink-200">
          {parent.role} · {statusSubtitle(parent.status)}
        </div>
      </div>
      <Badge tone={badge.tone} label={badge.label} />
    </div>
  );
}