const api_nepal = 'https://nepalcorona.info/api/v1/data/nepal';
const api_ourworld = 'https://covid.ourworldindata.org/data/owid-covid-data.json';
const api_kaggle = 'https://pomber.github.io/covid19/timeseries.json';
      async function getCovidData() {
          const response = await fetch(api_nepal);
          const data = await response.json();
	  document.getElementById('totalcases').textContent = data.tested_positive;
	  document.getElementById('recoveries').textContent = data.recovered;
	  document.getElementById('deaths').textContent = data.deaths;
	  document.getElementById('isolation').textContent = data.in_isolation;
	  document.getElementById('quarantine').textContent = data.quarantined;
	  document.getElementById('tests').textContent = data.tested_total;
      }
getCovidData();

      async function getChartData() {
          const response = await fetch(api_kaggle);
          const stuff = await response.json();
	  return await stuff.Nepal;
      }
// getChartData();
async function parseChartData(y_axis) {
    array = await getChartData();
    dates = [];
    y = [];
    array.forEach(element => dates.push(element.date));
     if (y_axis == "totalCases") {
	array.forEach(element => y.push(element.confirmed));}
    else if (y_axis == "totalDeaths") {
	array.forEach(element => y.push(element.deaths));} else if (y_axis == "recovered") {
	    array.forEach(element => y.push(element.recovered));};
    return {dates, y};
      }

async function makeChart(label, y_axis) {
        const ctx = document.getElementById("chart-0").getContext('2d');
    const array = await parseChartData(y_axis);
    [dates, y] = [array.dates, array.y]; 
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: array.dates,
            datasets: [
		{
                    label: label,
                    data: y,
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 1
		}
            ]
        },
        options: {}
    });
}
