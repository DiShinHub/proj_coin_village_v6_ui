import datetime
import time
import random
import re
import hashlib


def generate_hash():
    """ 
    def description : 

    Returns
    -------
    target_date : 타겟날짜 (datetime, 연월일 시분초)
    """

    HASH_NAME = "md5" # hash algorithm (md5,sha1,sha224,sha256,sha384,sha512)

    txt = str(generate_micro_date())

    text = txt.encode('utf-8')
    md5 = hashlib.new(HASH_NAME)
    md5.update(text)
    hash = md5.hexdigest()

    return hash


def generate_target_date(diff_date):
    """ 
    def description : 오늘날짜 기준으로 일수를 가감하여 타겟 날짜 산출

    Returns
    -------
    target_date : 타겟날짜 (datetime, 연월일 시분초)
    """

    target_date = datetime.datetime.now() + datetime.timedelta(diff_date)
    target_date = target_date.strftime("%Y-%m-%d")

    return target_date

def generate_now_date():
    """ 
    def description : 오늘 날짜 연월일 시분초 산출

    Returns
    -------
    now_date : 오늘 날짜 (datetime, 연월일 시분초)
    """
    now_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return now_date


def generate_now_day():
    """ 
    def description : 오늘 날짜 연월일 산출

    Returns
    -------
    now_day : 오늘 날짜 (datetime, 연월일)
    """
    now_day = datetime.datetime.now().strftime("%Y-%m-%d")
    return now_day


def generate_now_time():
    """ 
    def description : 오늘 날짜 시분초 산출

    Returns
    -------
    now_time : 오늘 날짜 (datetime, 시분초)
    """
    now_time = datetime.datetime.now().strftime("%H:%M:%S")
    return now_time


def generate_now_min():
    """ 
    def description : 현재 분 산출

    Returns
    -------
    mm 분(int)
    """
    mm = generate_now_time()[-5:-3]
    return int(mm)


def generate_now_sec():
    """ 
    def description : 현재 초 산출

    Returns
    -------
    ss : 초(int)
    """
    ss = generate_now_time()[-2:]
    return int(ss)

def generate_micro_date():
    """ 
    def description : 오늘 날짜 마이크로 세컨드까지 산출 

    Returns
    -------
    now_date : 오늘 날짜 (datetime, 마이크로 세컨드)
    """
    now_date = datetime.datetime.now().strftime("%Y%m%d_%H%M%S%f")

    return now_date

def is_n_min_passed(target_time, n):
    """
    def description : n분 이상 지났는지 확인 

    Parameters
    ----------
    target_time :  datetime, %Y-%m-%d %H:%M:%S"

    Returns
    -------
    Boolean
    """

    current_time = datetime.datetime.now()
    elapsed_time = (current_time - target_time).total_seconds()

    if elapsed_time >= n*60:  # n분 이상 지난 경우
        return True
    
    else:
        return False


def delay_random_sec_short():
    """ 
    def description : 초단위 랜덤 딜레이 숏
    """

    random_delay = random.randrange(4,5)
    time.sleep(random_delay) 
    return 


def delay_random_sec_long():
    """ 
    def description : 초단위 랜덤 딜레이 롱
    """
    
    random_delay = random.randrange(5,30)
    time.sleep(random_delay) 
    return 


def valid_phone(phone):
    """ 
    def description : 핸드폰 번호 유효성 검사 

    Parameters
    ----------
    phone : 핸드폰 번호 (str)

    Returns
    Boolean
    -------
    """

    if phone.find('-') > 0:
        return False

    regex = r'^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$'
    valid = re.search(regex, phone)

    if valid:
        return True

    else:
        return False


def valid_email(email):
    """ 
    def description : 이메일 주소 유효성 검사 

    Parameters
    ----------
    phone : 핸드폰 번호 (str)

    Returns
    Boolean
    -------
    """

    regex = r'^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$'
    valid = re.search(regex, email)

    if valid:
        return True

    else:
        return False


def replace_tags(text):
    
    text = text.replace("<!HS>", "")
    text = text.replace("<!HE>", "")

    return text