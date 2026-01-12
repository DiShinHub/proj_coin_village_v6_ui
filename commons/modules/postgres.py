
from commons.config.config import Config
from commons.classes.log import *

from functools import wraps
import inspect


class Postgres:

    def __init__(self):
        self.log = Log()
        self.log.create_log()
        self.connection_pool = Config().set_postgres() 
        
        self.conn = None
        self.cursor = None
        self.fetch_result = None

    def set_db(self):
        self.conn = self.connection_pool.getconn()
        self.cursor = self.conn.cursor()
        
        # 연결이상 있으면 끊고 새 연결 가져오기
        try:
            self.conn.ping()  
            
        except Exception:
            self.connection_pool.putconn(self.conn, close=True)
            self.conn = self.connection_pool.getconn()  
            self.cursor = self.conn.cursor()
        
    def reset_db(self):
        
        # 안전한 반환
        if self.conn:
            try:
                self.connection_pool.putconn(self.conn, close=False)  
                
            except Exception:
                pass
            
        self.conn = None
        self.cursor = None
        self.fetch_result = None
        
    def db_query_handler(func):
        @wraps(func)
        def wrapper(self, *args, **kwargs):
            
            try:
                self.set_db()
                result = func(self, *args, **kwargs)
            
            except Exception as e:
                self.log.write_log(f"method : {str(func.__name__)}, error : {str(e)}")
                raise
                
            finally:
                self.reset_db()
            
            return result
        return wrapper
        
    def format_read_one(self):
        """ 함수 설명 : 단일 조회 포맷팅

        반환값
        -------
        row_dict : 포맷된 데이터(dict) 
        """
        row_dict = {}
        if self.fetch_result:
            for idx, row in enumerate(self.fetch_result):
                row_dict[self.cursor.description[idx][0]] = row

        return row_dict

    def format_read_all(self):
        """ 함수 설명 : 복수 조회 포맷팅

        반환값
        -------
        row_list : 포맷된 데이터 리스트(list)
        """
        row_list = []
        if self.fetch_result:
            for rows in self.fetch_result:
                row_dict = {}
                for idx, row in enumerate(rows):
                    row_dict[self.cursor.description[idx][0]] = row
                row_list.append(row_dict)

        return row_list

    @db_query_handler
    def read_one(self, query):
        """ 함수 설명 : 단일 데이터 조회 

        매개변수 : 
        query : 쿼리문(str)

        반환값
        -------
        response_object : 결과 객체(dict)
        """
        self.cursor.execute(query)
        self.fetch_result = self.cursor.fetchone()
        return self.format_read_one()

    @db_query_handler
    def read_all(self, query):
        """ 함수 설명 : 복수 데이터 조회 

        매개변수 : 
        query : 쿼리문(str)
        bind : 바인드 값(tuple)

        반환값
        -------
        response_object : 결과 객체(dict)
        """
        self.cursor.execute(query)
        self.fetch_result = self.cursor.fetchall()
        return self.format_read_all()

    @db_query_handler
    def execute_query(self, query=None, query_bulk=None):
        """ 함수 설명 : 쿼리 실행

        매개변수 : 
        query : 단일 쿼리문(str)
        query_bulk : 복수 쿼리문 리스트(list)

        반환값
        -------
        response_object : 결과 객체(dict)
        """
        if not query and not query_bulk:
            self.log.write_log(f"{inspect.currentframe().f_code.co_name}, error : no query")
            return 
        
        if query:
            self.cursor.execute(query)

        elif query_bulk:
            for q in query_bulk:
                self.cursor.execute(q)

        return True

    @db_query_handler
    def execute_query_with_commit(self, query=None, query_bulk=None, binds=None):
        """ 함수 설명 : 커밋 포함 쿼리 실행

        매개변수 : 
        query : 단일 쿼리문(str)
        query_bulk : 복수 쿼리문 리스트(list)

        반환값
        -------
        response_object : 결과 객체(dict)
            ㄴlastrowids : 삽입된 PK 리스트(list)
        """
        if not query and not query_bulk:
            self.log.write_log(f"{inspect.currentframe().f_code.co_name}, error : no query")
            return 

        lastrowids = []

        if query:
            
            self.cursor.execute(query, binds)
            if "insert" in query.lower():
                lastrowids.append(self.cursor.lastrowid)

        elif query_bulk:
            for q in query_bulk:
                self.cursor.execute(q)
                if "insert" in q.lower():
                    lastrowids.append(self.cursor.lastrowid)

        self.conn.commit()
        return lastrowids
    
postgres_module = Postgres()