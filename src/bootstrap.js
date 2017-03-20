import * as React from 'react'
import ReactDOM from 'react-dom'
import LoadComponent from './LoadComponent'

class App extends React.Component {
  
  state = {
    showChart: false
  }

  showChart = () => {
    this.setState({
      showChart: !this.state.showChart
    })
  }

  render() {
    return (
    <div>
      <button onClick={this.showChart}>load chart</button>
      {this.state.showChart ? (
        <LoadComponent path='Chart' render={(Chart)=> {
          if(Chart) {
            return <Chart />
          } else {
            return <div>Loading...</div>
          }
        }}/>
      ) : null}
    </div>
    )
  }
}

window.onload = function() {
  ReactDOM.render(<App/>, document.querySelector('#render'))
}