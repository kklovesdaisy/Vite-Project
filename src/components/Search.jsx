const Search = ({ searchTerm, setSearchTerm }) => (
  <div className="search">
    <div>
      <img src="/search.svg" alt="" aria-hidden="true" />
      <input
        type="search"
        placeholder="Search through thousands of movies"
        aria-label="Search movies"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>
  </div>
);

export default Search;
