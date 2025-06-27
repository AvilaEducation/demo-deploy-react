import { useState } from "react";

type Props = {
  onSearch: (name: string) => void;
};

export default function ProductSearch({ onSearch }: Props) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    onSearch(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md transition">
        <div className="flex w-full items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );

}
