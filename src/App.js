import "./index.css";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonmock.hackerrank.com/api/stocks?date=5-January-2000`)
      .then((response) => {
        //check if response is okey not not
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        // returining result in json format
        return response.json();
      })
      .then((actualData) => {
        //set value of data
        setData(actualData.data);
        setError(null);
        console.log(actualData);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
       {/* display date againt search query */}
      <ul>
        {data &&
          data.map((item, i) => (
            
            <li key={i}>
              <h1>Date: {item.date}</h1>
            </li>
          ))}
      </ul>
      <br/>
      {loading && <div>Please wait a moment...</div>}
      {error && (
        <div>{`There is a problem in fetching the data - ${error}`}</div>
      )}
      {/* display data of the query */}
      <ul>
        {data &&
          data.map((item, i) => (
            
            <li key={i} sx={{innerWidth:20}}>
              <h3>Open : {item.open}</h3>
              <h3>High: {item.high}</h3>
              <h3>Low: {item.low}</h3>
              <h3>Close {item.close}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
}
