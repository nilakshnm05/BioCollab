type CollaborationCardProps = {
  id: number;
  title: string;
  description: string;
  status: CollaborationStatus;
  expertise: string[];
  researchAreas: string[];
  onView: (id: number) => void;
};
import type { CollaborationStatus } from "@/types/collaboration";
import { statusLabels, statusStyles } from "@/constants/collaboration";
function CollaborationCard({
  id,
  title,
  description,
  status,
  expertise,
  researchAreas,
  onView,
}: CollaborationCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        <p className="text-lg font-semibold">{title}</p>
        <span
          className={`self-start md:self-auto inline-flex px-2 py-1 rounded-full ${statusStyles[status]}`}
        >
          {statusLabels[status]}
        </span>
      </div>
      <p className="text-sm font-normal text-gray-600">{description}</p>
      <div className="flex flex-wrap gap-3">
        <p className="text-sm font-semibold text-gray-600">Expertise:</p>
        {expertise.map((element) => {
          return (
            <p
              key={element}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            >
              {element}
            </p>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3">
        <p className="text-sm font-semibold text-gray-600">Research Areas:</p>
        {researchAreas.map((element) => {
          return (
            <p
              key={element}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            >
              {element}
            </p>
          );
        })}
      </div>
      <button
        onClick={() => onView(id)}
        className="self-end px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
      >
        View
      </button>
    </div>
  );
}

export default CollaborationCard;
