import { config } from 'dotenv';


// this will then extract all the environment and then you can export them from this file such as

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_ENV, ARCJET_KEY, QSTASH_URL, QSTASH_TOKEN, QSTASH_CURRENT_SIGNIN_KEY, QSTASH_NEXT_SIGNIN_KEY, EMAIL_PASSWORD} = process.env;