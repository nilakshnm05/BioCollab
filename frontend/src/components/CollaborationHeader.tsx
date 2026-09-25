import { ReactNode } from "react";

type CollaborationHeadeerProps = {
  title: string;
  description: string;
  action?: ReactNode
};

function CollaborationHeader({
  title,
  description, action
}: CollaborationHeadeerProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-base font-normal">{description}</p>
      </div>

      {action}
    </header>
  );
}
export default CollaborationHeader;
