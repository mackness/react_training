import * as React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  state = {
    AsyncModule: null
  }

  loadModule = () => {
    System.import('./AsyncModule').then(AsyncModule => {
      this.setState({AsyncModule:AsyncModule.default})
    })
  }

  render() {
    let AsyncModule = this.state.AsyncModule
    return (
      !this.state.AsyncModule ? (
        <button onClick={this.loadModule}>load module</button>
      ) : (
        <AsyncModule/>
      )
    )
  }
}

window.onload = function() {
  ReactDOM.render(<App/>, document.querySelector('#render'))
}