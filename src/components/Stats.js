const Stats = ({data})=> {
    return(
	<div className="stats">
                <h4> Positive Cases : {data.tested_positive}</h4>
                <h4> Recovered Cases : {data.recovered}</h4>
              </div>
    );
};

export default Stats;
