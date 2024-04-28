import express from "express";
import client from "prom-client";
const app = express();

// Create a Histogram metric
export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in microseconds',//Description of the aim of the metric 
    labelNames: ['method', 'route', 'code','route_name'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
  });

  export const databaseResponseTImeHistogram=new client.Histogram({
    name: "db_response_time_duration_seconds",
    help: "Database response time in seconds",
    labelNames: ["operation", "success"],
  });

//   export const startTimeFunction=()=>{
//     const collectDefaultMetrics = client.collectDefaultMetrics;

//     collectDefaultMetrics();

//   }