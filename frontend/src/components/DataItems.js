import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DataItems() {
  const [perPageValue, setPerPageValue] = useState(10);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const handleOnClick = (html_url) => {
    if (html_url) {
      window.open(html_url, "_blank");
    } else {
      console.error("No URL provided.");
    }
  };
  const handlePerPageChange = (event) => {
    const perPageValue = parseInt(event.target.value);
    setPerPageValue(perPageValue);
  };
  const [repositories, setRepositories] = useState([]);
  const handleNextClick = () => {
    setPage(page + 1);
    console.log(page);
  };

  const handlePreviousClick = () => {
    console.log("Previous");
    setPage(page - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:8000/repositories?param1=${perPageValue}&param2=${page}`
          `https://short-listed-links-server.vercel.app/repositories?param1=${perPageValue}&param2=${page}`
        );
        setRepositories(response.data);
        console.log(repositories);
        let parsedData = await repositories.json();
        console.log(parsedData);
        if (parsedData.items) {
          setHasNextPage(parsedData.items.length > 0);
        } else {
          setHasNextPage(false);
        }
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    fetchData();
  }, [perPageValue, page]);

  return (
    <div>
      <h2
        className="text-center my-3 mb-5"
        style={{
          fontFamily: "Protest Revolution",
          fontWeight: "400",
          fontStyle: "normal",
        }}
      >
        ShortListed GitHub Repository
      </h2>

      <label
        className="m-3"
        htmlFor="perPage"
        style={{ fontFamily: "Playfair Display" }}
      >
        <b>
          How many Top Repositories do you want to see per page :- &nbsp;&nbsp;
        </b>
      </label>
      <select
        className="text-center m-3"
        id="perPage"
        onChange={handlePerPageChange}
        value={perPageValue}
      >
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>

      <div className="d-flex flex-column m-3">
        {repositories.map((repo, index) => (
          <div key={repo.id} className="d-flex justify-content-between mb-3">
            <div>
              <b>{index + 1 + (page - 1) * perPageValue}</b>-{repo.name} -{" "}
              {repo.stargazers_count} &nbsp;&#9733;
            </div>
            <button
              onClick={() => handleOnClick(repo.html_url)}
              className="btn btn-dark"
            >
              Visit Code
            </button>
          </div>
        ))}
      </div>
      <div className="container d-flex justify-content-between mt-5">
        <button
          style={{ width: "120px" }}
          type="button"
          disabled={page <= 1}
          className="btn btn-dark mb-3"
          onClick={handlePreviousClick}
        >
          {" "}
          &larr; Previous
        </button>
        <button
          style={{ width: "120px" }}
          type="button"
          disabled={!hasNextPage}
          className="btn btn-dark mb-3"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
