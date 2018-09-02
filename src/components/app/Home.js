import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser, getGames } from './reducers';
import { requestGame } from './actions';
import styles from './Home.css';

export class Home extends Component {

  static propTypes = {
    user: PropTypes.object,
    games: PropTypes.string,
    requestGame: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    const { games, history } = this.props;
    if(!games) return;
    history.push({
      pathname: `/games/${games}`
    });
  }

  render() { 
    const { user, games, requestGame } = this.props;

    return (
      <div className={styles.home}>
        <h1>GORTS</h1>
        <section>
          <h3>How to Play:</h3>
          <p>You and your opponent choose how many troops to send to battle. </p>
          <ul>
            <li><strong>Stalemate:</strong> on a tie.</li>
            <li><strong>Guerilla Warfare:</strong>  Lower number wins if the difference is greater than 3.</li>
            <li><strong>Outnumbered:</strong> Higher number wins, otherwise.</li>
          </ul>
        </section>
      </div>
    );
  }
}
 
export default connect(
  state => ({
    user: getUser(state),
    games: getGames(state)
  }),
  { requestGame }
)(Home);

export const UserGames = ({ onRequest, games }) => {
  return (
    <section>
      <button onClick={onRequest}>ENGAGE IN GORTS</button>
      <h1>{games}</h1>
    </section>
  );
};

UserGames.propTypes = {
  games: PropTypes.string.isRequired,
  onRequest: PropTypes.func.isRequired
};