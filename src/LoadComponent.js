import React from 'react'

class LoadComponent extends React.Component {
	state = {
		component: null
	}
  componentWillMount() {
    System.import('./Chart').then(Component => {
      this.setState({component:Component.default})
    })
  }
  render() {
    return this.props.render(this.state.component)
  }
}

export default LoadComponent