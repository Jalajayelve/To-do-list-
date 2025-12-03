// src/upstash.js

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// create a ratelimiter that allows 100 requests per 60 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),               // this now works because dotenv loads in server.js
    limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default ratelimit;
