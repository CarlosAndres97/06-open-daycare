import { IconAlert } from "@/components/shared/Icons";

type AllergyAlertProps = {
  text: string;
};

export function AllergyAlert({ text }: AllergyAlertProps) {
  return (
    <div className="bg-beige-100 rounded-2xl p-4 flex items-start gap-[14px]">
      <div className="w-10 h-10 rounded-[11px] bg-coral-400 flex items-center justify-center shrink-0">
        <IconAlert width={22} height={22} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-coral-700 font-extrabold text-[15px] mb-[2px]">
          Alergias y notas
        </div>
        <div className="text-coral-700/80 text-[14.5px] leading-[1.5]">
          {text}
        </div>
      </div>
    </div>
  );
}