type ChildInfo = {
  birthDate: string;
  classroom: string;
  joinedAt: string;
};

type ChildInfoCardProps = {
  info: ChildInfo;
};

export function ChildInfoCard({ info }: ChildInfoCardProps) {
  return (
    <div className="bg-cream-soft border border-beige-200 rounded-2xl overflow-hidden">
      <div className="flex justify-between py-4 px-[18px] border-b border-beige-500">
        <span className="text-ink-300 text-[14.5px]">Fecha de nacimiento</span>
        <span className="text-ink-900 font-extrabold text-[14.5px]">
          {info.birthDate}
        </span>
      </div>
      <div className="flex justify-between py-4 px-[18px] border-b border-beige-500">
        <span className="text-ink-300 text-[14.5px]">Sala</span>
        <span className="text-ink-900 font-extrabold text-[14.5px]">
          {info.classroom}
        </span>
      </div>
      <div className="flex justify-between py-4 px-[18px]">
        <span className="text-ink-300 text-[14.5px]">Ingreso</span>
        <span className="text-ink-900 font-extrabold text-[14.5px]">
          {info.joinedAt}
        </span>
      </div>
    </div>
  );
}