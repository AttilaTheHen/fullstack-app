import { get, post } from './request';

const URL = '/api';
const AUTH_URL = `${URL}/auth`;
const MATCH_URL = `${URL}/matches`;
const SIGNUP_URL = `${AUTH_URL}/signup`;
const SIGNIN_URL = `${AUTH_URL}/signin`;

export const signup = credentials => post(SIGNUP_URL, credentials);
export const signin = credentials => post(SIGNIN_URL, credentials);

export const postMatch = game => {
  delete game.key;
  const players = Object.keys(game).filter(key => key !== 'winner');
  const data = {
    players,
    game
  };
  post(MATCH_URL, data);
};

export const verifyUser = token => {
  return get(`${AUTH_URL}/verify`, {
    headers: {
      Authorization: token
    }
  });
};

export const getLeaderboard = () => get(`${MATCH_URL}/ranks/leaderboard`);

export const getStatsById = id => get(`${MATCH_URL}/stats/${id}`);  