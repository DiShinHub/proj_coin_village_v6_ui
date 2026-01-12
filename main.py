
from route import *
from commons.exception.exception import *

import eel
import sys

sys.path.append(f"{os.path.realpath(__file__)}/..")

# eel 이닛
eel.init('web')           

def handle_request(input):
    """
    def description : 전처리 (TODO : 추후 기능 추가)
    """
    try : 
        return input
    
    except Exception as ex :
        raise InternalServerException(msg=f"{str(ex)}")

def handle_route(input):
    """
    def description : 라우터
    """
    try : 
        route = Route()
        res = route.route(input)

        return res
    
    except Exception as ex :
        raise InternalServerException(msg=f"{str(ex)}")

def handle_response(res):
    """
    def description : 후처리
    """
    try : 
        eel.passage_js(res)
    
    except Exception as ex :
        raise InternalServerException(msg=f"{str(ex)}")

@eel.expose                         
def send(input):
    """
    def description : 프론트에서 넘긴 데이터를 핸들링함.
    """
    #handle_request(input)

    # service router
    res = handle_route(input)
    handle_response(res)
    return 


# eel Start
eel.start('main.html', size=(1400, 1050))

# # test
# input={}
# input["service_div"] = "00"
# handle_route(input)