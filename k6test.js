import { check } from 'k6';
import http from 'k6/http';

export let options = {
  stages: [
    { duration: '1s', target: 100 }, // below normal load
    { duration: '5s', target: 2500 }, // spike to 1400 users
  ],
};

export default function () {
  let res = http.get('http://localhost:3000/');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
