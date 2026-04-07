import type { Route } from "./+types/home";
import { BackendConnectionWidget } from "../components/BackendConnectionWidget";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Add new page here
            </h1>
            <BackendConnectionWidget />
          </div>
        </header>
      </div>
    </main>
  );
}
