import { useEffect, useState } from "react";
import Stats from "./Stats";

export const Info = () => {
  const [data, setData] = useState(null);
  const api_nepal = "http://nepalcorona.info/api/v1/data/nepal";
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(api_nepal)
      .then(res => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      });
  }, []);
    console.log(data); 
  return (
    <div className="Info">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <Stats data={data} />}
    </div>
  );
};

// let data = async () => {
//           const response = await fetch(api_nepal);
//           const stuff = await response.json();
// 	  // document.getElementById('totalcases').textContent = data.tested_positive;
// 	  // document.getElementById('recoveries').textContent = data.recovered;
// 	  // document.getElementById('deaths').textContent = data.deaths;
// 	  // document.getElementById('isolation').textContent = data.in_isolation;
// 	  // document.getElementById('quarantine').textContent = data.quarantined;
// 	  // document.getElementById('tests').textContent = data.tested_total;
//     console.log(stuff);
//     const apiData= [stuff.tested_positive, stuff.recovered, stuff.deaths, stuff.in_isolation, stuff.quarantined, stuff.tested_total ];
//     console.log(apiData);
//     return apiData;
// };

// console.log(data);

// const display = (props) => {
//     return (
//         <h4>{props.category} = {props.num}</h4>
//     );
// };
