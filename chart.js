const api_nepal = 'https://nepalcorona.info/api/v1/data/nepal';
const api_nepal_hospitals= 'https://nepalcorona.info/api/v1/hospitals' ;
const api_ourworld = 'https://covid.ourworldindata.org/data/owid-covid-data.json';
      async function getCovidData() {
          const response = await fetch(api_nepal);
          const data = await response.json();
	  const date = [];
	  const totalDeaths = [];
	  const totalRecoveries = [];
	  const newCases = [];
//	  data.forEach(newCases => tCases.push(newCases.totalCases));
	  document.getElementById('totalcases').textContent = data.tested_positive;
	  document.getElementById('recoveries').textContent = data.recovered;
	  document.getElementById('deaths').textContent = data.deaths;
	  document.getElementById('isolation').textContent = data.in_isolation;
	  document.getElementById('quarantine').textContent = data.quarantined;
	  document.getElementById('tests').textContent = data.tested_total;
      }
getCovidData();


window.addEventListener('load', setup);

      async function setup() {
	  const ctx = document.getElementById('myChart').getContext('2d');
        const covid = await getTodayData();
          console.log(covid);
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: covid.dates,
            datasets: [
              {
                label: 'Total Cases',
                data: covid.y,
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
 
      async function getTodayData() {
          const response = await fetch(api_ourworld);
          const stuff = await response.json();
	  array = stuff.NPL.data;
	  dates = [];
	  y = [];
	  array.forEach(element => dates.push(element.date));
	  array.forEach(element => y.push(element.total_cases));
	  return {dates, y};
      }

getTodayData();

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}
