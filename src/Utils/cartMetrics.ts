// cartMetrics.ts

import { Histogram, register } from 'prom-client';

export const cartResponseTime = new Histogram({
  name: 'cart_api_response_time_seconds',
  help: 'Response time of the cart API endpoints',
  labelNames: ['method', 'route', 'code'],
  registers: [register],
});

export const recordCartResponseTime = (method: string, route: string, statusCode: number, duration: number) => {
  cartResponseTime.observe({ method, route, code: statusCode.toString() }, duration / 1000);
}
