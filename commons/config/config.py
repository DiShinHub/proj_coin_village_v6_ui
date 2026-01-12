

from psycopg2 import pool
import redis

import sys
import os
from dotenv import load_dotenv
load_dotenv()

class Config:
        
    def set_redis(self):
        
        with redis.StrictRedis(host=os.getenv('REDIS_HOST'), 
                               port=int(os.getenv('REDIS_PORT')), 
                               db=os.getenv('REDIS_DB')) as conn:
            redis_conn = conn
            
        return redis_conn
        
    def set_postgres(self):

        # Create a connection pool
        connection_pool = pool.ThreadedConnectionPool(
            1, 30, 
            host=os.getenv("POSTGRES_HOST"),
            port=os.getenv("POSTGRES_PORT"),
            user=os.getenv("POSTGRES_USER"),  
            password=os.getenv("POSTGRES_PASSWORD"),  
        )
        return connection_pool
        
        