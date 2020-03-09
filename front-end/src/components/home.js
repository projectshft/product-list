import App from './app.js'
import { Route, Switch, Link } from 'react-router-dom'
import React from 'react'


class Home extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/' render={() => (
            <App />
          )} />
        </Switch>
      </div>
    )
  }
}

export default Home;