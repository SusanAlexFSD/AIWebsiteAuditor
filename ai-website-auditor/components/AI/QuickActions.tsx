interface QuickAction {
  title: string;
  prompt: string;
}

interface Props {
  actions: QuickAction[];
  onAction: (prompt: string) => void;
}

export default function QuickActions({
  actions,
  onAction,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {actions.map((action) => (
        <button
          key={action.title}
          type="button"
          onClick={() => onAction(action.prompt)}
          className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
        >
          {action.title}
        </button>
      ))}
    </div>
  );
}