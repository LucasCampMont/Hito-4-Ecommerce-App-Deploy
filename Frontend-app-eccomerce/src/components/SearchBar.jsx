import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/products?search=${search.trim()}`);
    setSearch("");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="
        flex
        items-center
        bg-gray-100
        px-3
        py-2
        rounded-full
        w-12
        sm:w-48
        md:w-72
      "
    >
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          hidden
          sm:block
          bg-transparent
          outline-none
          text-sm
          w-full
        "
      />

      <button
        type="submit"
        className="text-gray-500 flex items-center justify-center"
      >
        <Search size={18} />
      </button>
    </form>
  );
}

export default SearchBar;