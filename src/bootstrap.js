import * as React from 'react'
import ReactDOM from 'react-dom'
import fetch from 'node-fetch'
import _ from 'lodash'

class Favorites extends React.Component {

  static contextTypes = {
    app: React.PropTypes.shape({
      favorites: React.PropTypes.array.isRequired,
      setFavorite: React.PropTypes.func.isRequired
    }).isRequired
  }

  render() {
    const favorites = this.context.app.favorites.map((favorite, i) => (
      <div key={i} style={{backgroundColor: 'red'}}>
        <span>{`score: ${favorite.score}`}</span>
        <span>{`author: ${favorite.author}`}</span>
        <a href={favorite.permalink}>{favorite.title}</a>
      </div>
    ))
    return (
      <div>{favorites}</div>
    )
  }
}

class List extends React.Component {

  state = {
    open: false
  }

  toggleAll = () => {
    this.setState({open: !this.state.open})
  }
 
  render() {
    const children = this.props.children.map(child => {
      if (child.type === ListItem) {
        return React.cloneElement(child, {
          open: this.state.open
        })
      } else {
        return React.cloneElement(child, {
          toggleAll: this.toggleAll
        })
      }
    })
    return <div>{children}</div>
  }
}

class ToggleAll extends React.Component {
  render() {
    return <button onClick={this.props.toggleAll}>toggle all</button>
  }
}

class ListItem extends React.Component {
  
  state = {
    open: false
  }

  componentWillReceiveProps() {
    this.setState({open: this.props.open})
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  
  toggleListItem = () => {
    this.setState({open: !this.state.open})
  }
  
  render() {
    return this.props.render(this.state.open, this.toggleListItem)
  }
}

class LoadSubredditData extends React.Component {
  
  state = {
    author: '',
    score: '',
    title: '',
    permalink: ''
  }

  static contextTypes = {
    app: React.PropTypes.shape({
      favorites: React.PropTypes.array.isRequired,
      setFavorite: React.PropTypes.func.isRequired
    }).isRequired
  }

  componentWillMount() {
    fetch(`https://www.reddit.com/r/${this.props.subreddit}.json`)
      .then((res) => {
          return res.json()
      }).then((json) => {
          const {
            author,
            score,
            title,
            permalink
          } = json.data.children[0].data
          return {
            author,
            score,
            title,
            permalink
          }
      }).then((state) => {
        this.setState(state)
      })
  }

  setFavorite = (favorite) => {
    this.context.app.setFavorite(favorite)
  }
  
  render() {
    const LoadingElement = <span>Loading...</span>
    return this.props.render(this.state, this.setFavorite, LoadingElement)
  }
}

class App extends React.Component {

  state = {
    favorites: []
  }

  static childContextTypes = {
    app: React.PropTypes.shape({
      favorites: React.PropTypes.array.isRequired,
      setFavorite: React.PropTypes.func.isRequired
    }).isRequired
  }

  getChildContext() {
    return {
      app: {
        favorites: this.state.favorites,
        setFavorite: (favorite) => this.setFavorite(favorite)
      }
    }
  }

  setFavorite = (favorite) => {
    const {favorites} = this.state
    favorites.push(favorite)
    this.setState({favorites})
  }

  render() {
    const subreddits = ['javascript', 'webdev', 'funny', 'youtubehaiku', 'totallynotrobots']
    return (
      <div>
        <Favorites />
        <List>
          {subreddits.map((subreddit, i) => (
            <ListItem key={i} render={(open, toggleListItem) => (
              open ? (
                <div>
                  <div onClick={toggleListItem}>{subreddit}</div>
                  <LoadSubredditData subreddit={subreddit} render={(response, setFavorite, LoadingElement) => (
                    response.author ? (
                      <div>
                        <span>{`score: ${response.score}`}</span>
                        <span>{`author: ${response.author}`}</span>
                        <a href={`https://www.reddit.com/${response.permalink}`}>{response.title}</a>
                        <button href="#" onClick={()=> setFavorite(response)}>favorite</button>
                      </div>
                    ) : (
                      <div>{LoadingElement}</div>
                    )
                  )}/>
                </div>
              ) : (
                <div onClick={toggleListItem}>{subreddit}</div>
              )
            )}/>
          )).concat(<ToggleAll key="xyz"/>)}
        </List>
      </div>
    )
  }
}

window.onload = function() {
  ReactDOM.render(<App/>, document.querySelector('#render'))
}