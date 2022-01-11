import { Suspense, useState, useDeferredValue, useId } from "react";

import "./App.css";
import { Products } from "./Products";

function App() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const id = useId();

  return (
    <div className="App">
      <header className="App-header">
        <h1>React 18 🎉</h1>
        <label htmlFor={id + "-search"}>Search</label>
        <div>
          <input
            id={id + "-search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Products search={deferredSearch} />
        </Suspense>
      </header>
    </div>
  );
}

export default App;
