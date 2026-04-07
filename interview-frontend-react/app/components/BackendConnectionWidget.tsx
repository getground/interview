import { useQuery } from "@tanstack/react-query";

export function BackendConnectionWidget() {
  const { status } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/health");
      if (!res.ok) throw new Error("Not healthy");
      return res.json();
    },
  });

  let statusText = "In Progress";
  let statusColor = "bg-yellow-100 text-yellow-800 border-yellow-300";
  if (status === "success") {
    statusText = "Successful";
    statusColor = "bg-green-100 text-green-800 border-green-300";
  }
  if (status === "error") {
    statusText = "Error";
    statusColor = "bg-red-100 text-red-800 border-red-300";
  }

  return (
    <div className="mt-4 p-4 rounded bg-gray-100 dark:bg-gray-800 text-center w-full max-w-xs mx-auto">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Connecting to backend.</h2>
      <div
        className={`inline-block px-4 py-2 rounded border font-medium text-base ${statusColor}`}
        data-testid="backend-status"
      >
        {statusText}
      </div>
    </div>
  );
} 