const api_nepal = 'https://nepalcorona.info/api/v1/data/nepal';
const api_ourworld = 'https://covid.ourworldindata.org/data/owid-covid-data.json';
      async function getCovidData() {
          const response = await fetch(api_nepal);
          const data = await response.json();
	  const date = [];
	  const totalDeaths = [];
	  const totalRecoveries = [];
	  const newCases = [];
	  document.getElementById('totalcases').textContent = data.tested_positive;
	  document.getElementById('recoveries').textContent = data.recovered;
	  document.getElementById('deaths').textContent = data.deaths;
	  document.getElementById('isolation').textContent = data.in_isolation;
	  document.getElementById('quarantine').textContent = data.quarantined;
	  document.getElementById('tests').textContent = data.tested_total;
      }
getCovidData();
      async function getChartData() {
          const response = await fetch(api_ourworld);
          const stuff = await response.json();
	  return await stuff.NPL.data;
      }
getChartData();
async function parseChartData(y_axis) {
    array = await getChartData();
    dates = [];
    y = [];
    array.forEach(element => dates.push(element.date));
    if (y_axis == "newCases") {
	array.forEach(element => y.push(element.new_cases_smoothed));}
    else if (y_axis == "totalCases") {
	array.forEach(element => y.push(element.total_cases));}
    else if (y_axis == "totalDeaths") {
	array.forEach(element => y.push(element.total_deaths));}
    else if (y_axis == "casesPerMil") {
	array.forEach(element => y.push(element.total_cases_per_million));}
    else if (y_axis == "totalTests") {
	array.forEach(element => y.push(element.total_tests));}
    else if (y_axis == "newDeaths") {
	array.forEach(element => y.push(element.new_deaths_smoothed));};

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
