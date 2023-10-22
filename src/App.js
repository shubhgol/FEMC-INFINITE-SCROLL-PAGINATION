import { useEffect, useState } from "react";
import "./styles.css";

const debounce = (callback, timer) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, timer);
  };
};
export default function App() {
  const [data, setData] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const paginationHandler = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setCurrentPageNumber((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", debounce(paginationHandler, 100));
  }, []);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const response = await fetch(
          `https://api.instantwebtools.net/v1/passenger?page=${currentPageNumber}&size=10`
        );
        const data = await response.json();
        setData((prev) => {
          const pageData = data.data || [];
          const newData = [...prev, ...pageData];

          return newData;
        });
      } catch {
        setData(data);
      }
    }
    fetchPageData();
  }, [currentPageNumber]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {data.map((pd) => {
        const { id, name, trips } = pd;
        return (
          <div key={id}>
            <label>Name:</label> {name} <br />
            <br />
            <label>Trips:</label> {trips} <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
}
