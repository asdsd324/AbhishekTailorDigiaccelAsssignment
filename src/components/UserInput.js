import React, { useState, useEffect } from "react";
import ShowResults from "./showresult";

export default function UserInput() {
  const [state, setState] = useState({
    name: ""
  });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    setIsSubmitted(false);
    setState({ name: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted && state.name.length > 0) {
      fetch(`https://api.tvmaze.com/search/shows?q=${state.name}`)
        .then((response) => {
          if (response.ok) {
            console.log("reponse ok", response.ok);
            return response.json();
          } else {
            console.log("response status", response.status);
            throw new Error(response.status);
          }
        })
        .then((json) => {
          console.log(json);
          setError(null);
          setData(json);
        })
        .catch((error) => {
          console.error(error);
          setError(error);
        });
      setState({ name: "" });
    }
    console.log("isSubmitted", isSubmitted);
  }, [isSubmitted, state.name]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="name"
          onChange={handleChange}
          value={state.name}
          className="input"
        />
        <button type="submit" className="submit-button">
          Search
        </button>
      </form>
      <ShowResults data={data} error={error} />
    </div>
  );
}
