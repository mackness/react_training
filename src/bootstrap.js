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
    red: false,
  }
 
  render() {
    const children = this.props.children.map(child=> (
      console.log(child)
    ))
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

class ListItem extends React.Component {
  
  state = {
    open: false
  }
  
  handleClick = () => {
    this.setState({open: !this.state.open})
  }
  
  render() {
    return this.props.render(this.state.open, this.handleClick)
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
          return res.json();
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
      });
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
    this.setState({
      favorites: favorites
    })
  }

  render() {
    const subreddits = ['javascript', 'webdev', 'funny', 'aww', 'totallynotrobots']
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
                        <a href="#" onClick={()=> setFavorite(response)}>favorite</a>
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
          ))}
        </List>
      </div>
    )
  }
}

window.onload = function() {
  ReactDOM.render(<App/>, document.querySelector('#render'))
}