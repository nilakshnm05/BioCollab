type CollaborationCardProps = {
  id: number;
  title: string;
  description: string;
};

function CollaborationCard({ id, title, description }: CollaborationCardProps) {
  return (
    <>
      <p>{id}</p>
      <p>{title}</p>
      <p>{description}</p>
    </>
  );
}

export default CollaborationCard;
