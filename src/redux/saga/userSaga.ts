import { put, takeEvery, call } from 'redux-saga/effects';
import { userApi } from '../../api/api';
import { FETCH_TOKEN, setToken } from '../userReducer';

import axios from 'axios';

const auth = axios.create({
  baseURL: 'https://id.twitch.tv/oauth2/',
});

const fetchTokenFromApi = () =>
  auth
    .post(
      'token?client_id=9iruphukiixrzpp46qjkyefv41mlgw&client_secret=bqrwk72muo2g3m43983zv1e2wp97ei&grant_type=client_credentials',
    )
    .then(({ data }) => {
      return data;
    });

function* fetchTokenWorker() {
  // @ts-ignore
  const data = yield call(fetchTokenFromApi);
  console.log(data);
  yield put(setToken(data));
}

export function* tokenWatcher() {
  yield takeEvery(FETCH_TOKEN, fetchTokenWorker);
}
