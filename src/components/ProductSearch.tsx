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
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Search by name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ flex: 1, padding: "0.5rem" }}
      />
      <button onClick={handleSearch} style={{ padding: "0.5rem 1rem" }}>
        Search
      </button>
    </div>
  );
}
