import { FormEvent } from "react";
import toast from "react-hot-toast";
import { MdImageSearch } from "react-icons/md";

import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (userWord: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const searchInput = form.elements.namedItem("search") as HTMLInputElement;
    const userWord = searchInput.value.trim();

    if (!userWord) {
      toast.error("Enter text before search", { position: "top-right" });
      return;
    }

    onSearch(userWord);
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.btn}>
          <MdImageSearch size={25} />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
