type CollaborationHeadeerProps = {
  title: string;
  description: string;
};

function CollaborationHeader({
  title,
  description,
}: CollaborationHeadeerProps) {
  return (
    <header className="space-y-2 mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-base font-normal">{description}</p>
    </header>
  );
}
export default CollaborationHeader;
