import React from 'react'
import {ScatterPlot} from 'react-d3-components'

class Chart extends React.Component {

	getData = () => {
		return {
    	label: 'somethingA',
    	values: [ { x: 0, y: 2 },
  { x: 4, y: 6 },
  { x: 5, y: 9 },
  { x: 2, y: 1 },
  { x: 4, y: 8 },
  { x: 2, y: 5 },
  { x: 2, y: 1 },
  { x: 5, y: 9 },
  { x: 1.3, y: 5 },
  { x: 5, y: 5 },
  { x: 3, y: 3 },
  { x: 4, y: 8 },
  { x: 1, y: 1 },
  { x: 3, y: 8 },
  { x: 1, y: 9 },
  { x: 2, y: 8 },
  { x: 3, y: 6 },
  { x: 2, y: 3 },
  { x: 4, y: 5 },
  { x: 5, y: 6 },
  { x: 1, y: 9 },
  { x: 4, y: 6 },
  { x: 4, y: 9 },
  { x: 5, y: 1 },
  { x: 3.5, y: 6.5 },
  { x: 4, y: 2 },
  { x: 3, y: 3 },
  { x: 2, y: 4 },
  { x: 5, y: 7 },
  { x: 4, y: 3 },
  { x: 5, y: 5 },
  { x: 2, y: 2 },
  { x: 4, y: 6 },
  { x: 3, y: 2 },
  { x: 2, y: 4 },
  { x: 5, y: 1 },
  { x: 3, y: 6 },
  { x: 1, y: 9 },
  { x: 1, y: 7 },
  { x: 3, y: 8 },
  { x: 4.5, y: 6 },
  { x: 3, y: 3 },
  { x: 2, y: 3 },
  { x: 4, y: 4 },
  { x: 2, y: 1 },
  { x: 5, y: 3 },
  { x: 3, y: 1 },
  { x: 5, y: 7 },
  { x: 5, y: 7 },
  { x: 1, y: 7 },
  { x: 5, y: 4 },
  { x: 4, y: 7 },
  { x: 3, y: 6 },
  { x: 1, y: 1 },
  { x: 5, y: 8 },
  { x: 2, y: 3 },
  { x: 5.5, y: 8 },
  { x: 1, y: 8 },
  { x: 5, y: 1 },
  { x: 1, y: 9 },
  { x: 2, y: 9 },
  { x: 4, y: 4 },
  { x: 3, y: 8 },
  { x: 1, y: 9 } ]
    },
    {
    	label: 'somethingB',
    	values: [ { x: 0, y: 3 },
  { x: 5, y: 2 },
  { x: 3, y: 4 },
  { x: 4, y: 5 },
  { x: 5, y: 7 },
  { x: 4, y: 6 },
  { x: 4, y: 9 },
  { x: 5, y: 9 },
  { x: 1.3, y: 4 },
  { x: 3, y: 5 },
  { x: 5, y: 7 },
  { x: 5, y: 2 },
  { x: 1, y: 5 },
  { x: 2, y: 5 },
  { x: 4, y: 1 },
  { x: 2, y: 9 },
  { x: 3, y: 7 },
  { x: 3, y: 2 },
  { x: 5, y: 1 },
  { x: 4, y: 3 },
  { x: 4, y: 2 },
  { x: 3, y: 8 },
  { x: 5, y: 7 },
  { x: 4, y: 6 },
  { x: 3.5, y: 8 },
  { x: 4, y: 1 },
  { x: 3, y: 3 },
  { x: 3, y: 2 },
  { x: 4, y: 8 },
  { x: 2, y: 7 },
  { x: 3, y: 6 },
  { x: 2, y: 4 },
  { x: 4, y: 7 },
  { x: 5, y: 5 },
  { x: 1, y: 1 },
  { x: 2, y: 3 },
  { x: 1, y: 4 },
  { x: 2, y: 3 },
  { x: 2, y: 7 },
  { x: 4, y: 3 },
  { x: 4.5, y: 7 },
  { x: 3, y: 1 },
  { x: 1, y: 6 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 2, y: 5 },
  { x: 1, y: 2 },
  { x: 4, y: 4 },
  { x: 5, y: 7.8 },
  { x: 1, y: 2 },
  { x: 5, y: 6 },
  { x: 5, y: 6 },
  { x: 3, y: 9 },
  { x: 3, y: 1 },
  { x: 4, y: 5 },
  { x: 2, y: 8 },
  { x: 5.5, y: 9 },
  { x: 3, y: 5 },
  { x: 1, y: 1 },
  { x: 3, y: 5 },
  { x: 4, y: 5 },
  { x: 1, y: 4 },
  { x: 4, y: 8 },
  { x: 5, y: 6 } ]
    }
	}

	render() {
		return (
			<ScatterPlot
			data={this.getData()}
			width={300}
			height={300}
			margin={{top: 40, bottom: 40, left: 40, right: 40}}/>
		)
	}
}

export default Chart