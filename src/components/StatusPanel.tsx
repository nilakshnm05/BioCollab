type StatusPanelProps = { exploring: boolean };
function StatusPanel({ exploring }: StatusPanelProps) {
  return (
    <>
      <p>Status: {exploring ? "Exploring" : "Ready"}</p>
    </>
  );
}
export default StatusPanel;
