import type { Collaboration } from "@/types/collaboration";
import { statusLabels, statusStyles } from "@/constants/collaboration";

type CollaborationProps = { collaboration: Collaboration; onClose: () => void };

function CollaborationDetails({ collaboration, onClose }: CollaborationProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{collaboration.title}</h2>
          <span
            className={`inline-flex px-2 py-1 rounded-full ${statusStyles[collaboration.status]}`}
          >
            {statusLabels[collaboration.status]}
          </span>
        </div>
        <p className="text-sm text-gray-600">{collaboration.description}</p>
        <div className="flex flex-wrap gap-3">
          <p className="text-sm font-semibold text-gray-600">Expertise:</p>
          {collaboration.expertise.map((element) => {
            return (
              <p
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                key={element}
              >
                {element}
              </p>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-3">
          <p className="text-sm font-semibold text-gray-600">Research Areas:</p>
          {collaboration.researchAreas.map((element) => {
            return (
              <p
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                key={element}
              >
                {element}
              </p>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="self-end px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CollaborationDetails;
