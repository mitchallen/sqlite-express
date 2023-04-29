import http from 'k6/http';
import { check } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
  const url = 'http://localhost:3000/users';
  const payload = {
    name: `jack${randomIntBetween(1, 100)}`,
    email: `jack${randomIntBetween(1000, 9999)}@example.com`,
  };
  const data = JSON.stringify(payload);
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, data, params);
  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Response time is less than 200ms': (r) => r.timings.duration < 200,
    'Response contains token': (r) => r.body.includes('token')
  });
}
