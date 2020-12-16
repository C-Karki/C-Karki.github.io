const api_nepal = 'https://nepalcorona.info/api/v1/data/nepal';
const api_timeline_url = 'https://data.nepalcorona.info/api/v1/covid/timeline';
const api_nepal_summary = 'https://data.nepalcorona.info/api/v1/covid/summary' ;
      async function getCovidData() {
          const response = await fetch(api_nepal);
          const data = await response.text();
	  const total_cases = data.tested_positive;
	  const date = [];
	  const totalDeaths = [];
	  const totalRecoveries = [];
	  const newCases = [];
//	  data.forEach(newCases => tCases.push(newCases.totalCases));
	  const x = JSON.parse(data);
	  console.log(x);
	  document.getElementById('totalcases').textContent = x.tested_positive;
	  document.getElementById('recoveries').textContent = x.recovered;
	  document.getElementById('deaths').textContent = x.deaths;
	  document.getElementById('isolation').textContent = x.in_isolation;
	  document.getElementById('quarantine').textContent = x.quarantined;
      }
getCovidData();

window.addEventListener('load', setup);

      async function setup() {
	  const ctx = document.getElementById('myChart').getContext('2d');
        const globalTemps = await getData();
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: globalTemps.years,
            datasets: [
              {
                label: 'Total Cases',
                data: globalTemps.temps,
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

      async function getData() {
        // const response = await fetch('testdata.csv');
        const response = await fetch('corona.csv');
        const data = await response.text();
        const years = [];
        const temps = [];
        const rows = data.split('\n').slice(1);
        rows.forEach(row => {
          const cols = row.split(',');
          years.push(cols[0]);
          temps.push(14 + parseFloat(cols[1]));
        });
        return { years, temps };
      }
