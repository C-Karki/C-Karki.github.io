import React, { Component } from 'react';

const api_nepal = 'http://nepalcorona.info/api/v1/data/nepal';

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

// export const Info = () => {
//     return (
//         <>
//           <h4>${ data[0] }</h4>
//         </>
//    );
//  };
class Information extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
        stats:  [],
    };
  }
 
  componentDidMount() {
    fetch('api_nepal')
      .then(response => response.json())
          .then(data => this.setState({ stats: data.tested_positive }));
  } 

    render () {
        const { stats } = this.state;
        return (
            <h4>{ stats }</h4>   
        );
    }
}
const Info = new Information;
export default Info;
