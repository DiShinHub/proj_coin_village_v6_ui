import logging
import os, shutil
from commons.function.common_function import *


class Log():
    
    def __init__(self):
        self.logger = self.set_log()

    def set_log(self):
        """ 
        def description : 로그 셋팅

        Parameters
        ----------
        self.logger : 로거 객체
        """

        # 로그 생성
        self.logger = logging.getLogger()
        

        return self.logger

    def create_log(self, log_path=None):
        """ 
        def description : 로그 생성

        Parameters
        ----------
        log_path = 로그 경로
        """
        
        # 핸들러 존재여부
        if len(self.logger.handlers) > 0:
            return 

        # 로그의 출력 기준 설정
        self.logger.setLevel(logging.INFO)

        # log 출력 형식
        formatter = logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s")

        # log 출력
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(formatter)
        self.logger.addHandler(stream_handler)
        
        # 30일 전부터 90일 전까지 로그 삭제
        for i in range(30, 90):
            target_date = generate_target_date(-i)
            old_log_path = f"{os.path.abspath(os.curdir)}/log/{str(target_date)}/"
            if os.path.isdir(f'{old_log_path}/'):
                shutil.rmtree(old_log_path)

        # 로그 루트 폴더 체크
        log_root_path = f"{os.path.abspath(os.curdir)}/log/"
        if not os.path.isdir(f'{log_root_path}/'):
            os.mkdir(f'{log_root_path}/')

        # 금일자 로그 폴더 체크
        if log_path == None:
            log_path = f"{os.path.abspath(os.curdir)}/log/{str(generate_now_day())}"
            if not os.path.isdir(f'{log_path}/'):
                os.mkdir(f'{log_path}/')

        # log를 파일에 출력
        now_date = str(generate_now_date())
        file_name = now_date.replace("-","")
        file_name = file_name.replace(":","_")
        file_name = file_name.replace(" ","_")
        file_name = file_name + ".log"

        file_handler = logging.FileHandler(log_path + "/" + file_name, encoding='utf-8')
        file_handler.setFormatter(formatter)
        self.logger.addHandler(file_handler)
    

    def write_log(self, msg):
        """ 
        def description : 로그 작성

        Parameters
        ----------
        msg = 로그 메세지
        """
        self.logger.info(msg)