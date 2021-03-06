import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';
import { tryLoadUser } from '../auth/actions';
import { getCheckedAuth } from '../auth/reducers';
import Header from './Header';
import Home from './Home';
import Game from '../game/Game';
import Auth from '../auth/Auth';
import Dashboard from '../dashboard/Dashboard';
import LeaderboardDisplay from '../game/LeaderboardDisplay';
import styles from './App.css'

class App extends Component {

  static propTypes = {
    tryLoadUser: PropTypes.func.isRequired,
    checkedAuth: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.tryLoadUser();
  }

  render() { 
    const { checkedAuth } = this.props;

    return (
      <Router>
        <div className={styles.app}>
          <Header/>

          <main>
            {checkedAuth &&
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/auth" component={Auth}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/leaderboard" component={LeaderboardDisplay}/>

                <PrivateRoute path="/games/:gameKey" component={Game}/>
                <Redirect to="/"/>
              </Switch>
            }
          </main>
        </div>
      </Router>
    );
  }
}
 
export default connect(
  state => ({ checkedAuth: getCheckedAuth(state) }),
  { tryLoadUser }
)(App);