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


// window.addEventListener('load', makeChart());

// async function makeChart(array, label) {
// 	  const ctx = document.getElementById('myChart').getContext('2d');
//         const covid = await getTodayData();
// 	  [dates, y] = [covid.dates, covid.y]; 
//         let myChart = new Chart(ctx, {
//           type: 'line',
//           data: {
//             labels: covid.dates,
//             datasets: [
//               {
//                 label: label,
//                 data: y,
//                 fill: false,
//                 borderColor: 'rgba(255, 99, 132, 1)',
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                 borderWidth: 1
//               }
//             ]
//           },
//           options: {}
//         });
// 	  return myChart;
//       }
// makeChart(); 
      async function getChartData(y_axis) {
          const response = await fetch(api_ourworld);
          const stuff = await response.json();
	  array = stuff.NPL.data;
	  dates = [];
	  y = [];
	  array.forEach(element => dates.push(element.date));
	  if (y_axis == "newcases") {
	      array.forEach(element => y.push(element.new_cases));}
	  else {
	      array.forEach(element => y.push(element.total_cases));  };
	  return {dates, y};
      }

// getChartData();
	
async function makeChart(array, label) {
        const ctx = document.getElementById("chart-0").getContext('2d');
    const covid = await getChartData();
    [dates, y] = [covid.dates, covid.y]; 
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: covid.dates,
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
    return myChart;
}
var chart = makeChart(getChartData(), "Total Cases");

		// eslint-disable-next-line no-unused-vars
document.getElementById("xyz").onclick = addDataset;
		function addDataset() {
			chart.data.datasets.push({
				data: getChartData()
			});
			chart.update();
		}

		// eslint-disable-next-line no-unused-vars

		// eslint-disable-next-line no-unused-vars
		function removeDataset() {
			chart.data.datasets.shift();
			chart.update();
		}


