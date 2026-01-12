
import eel


class RequiredException():
    """
    필수 값 입력 오류
    """

    def __init__(self, code=None, msg=None):
        
        status = "fail"
        status_code = 400
        error_msg = "Duplicate_value_input_error"

        if code:
            status_code = code

        if msg:
            error_msg = msg

        response_json = {
            "status" : status,
            "message" : error_msg,
            "status_code" : status_code
        }
        print(response_json)
        #eel.passage_js(response_json)


class RuledException():
    """
    정책 오류
    """

    def __init__(self, code=None, msg=None):
        
        status = "fail"
        status_code = 400
        error_msg = "Duplicate_value_input_error"

        if code:
            status_code = code

        if msg:
            error_msg = msg

        response_json = {
            "status" : status,
            "message" : error_msg,
            "status_code" : status_code
        }
        print(response_json)
        #eel.passage_js(response_json)


class DuplicateException():
    """
    중복 값 오류
    """

    def __init__(self, code=None, msg=None):

        status = "fail"
        status_code = 400
        error_msg = "Duplicate_value_input_error"

        if code:
            status_code = code

        if msg:
            error_msg = msg

        response_json = {
            "status" : status,
            "message" : error_msg,
            "status_code" : status_code
        }
        print(response_json)
        #eel.passage_js(response_json)


class InvalidValueException():
    """
    데이터 형식/값 오류 오류
    """

    def __init__(self, code=None, msg=None):

        status = "fail"
        status_code = 400
        error_msg = "data_type/value error"

        if code:
            status_code = code

        if msg:
            error_msg = msg

        response_json = {
            "status" : status,
            "message" : error_msg,
            "status_code" : status_code
        }
        print(response_json)
        #eel.passage_js(response_json)


class NotFoundSuccessException():
    """
    탐색 오류 (성공 처리)
    """

    def __init__(self, code=None, msg=None):

        status = "success"
        status_code = 200
        error_msg = "data not found"

        if code:
            status_code = code

        if msg:
            error_msg = msg

        response_json = {
            "status" : status,
            "message" : error_msg,
            "status_code" : status_code
        }
        print(response_json)
        #eel.passage_js(response_json)


class NotFoundException():
    """
    탐색 오류 (성공 처리)
    """

    def __init__(self, code=None, msg=None):

        status = "fail"
        status_code = 404
        error_msg = "data not found"

        if code:
            status_code = code

        if msg:
            error_msg = msg

        response_json = {
            "status" : status,
            "message" : error_msg,
            "status_code" : status_code
        }
        print(response_json)
        #eel.passage_js(response_json)


class AuthException():
    """
    인증 오류
    """

    def __init__(self, code=None, msg=None):

        status = "fail"
        status_code = 400
        error_msg = "auth error"

        if code:
            status_code = code

        if msg:
            error_msg = msg

        response_json = {
            "status" : status,
            "message" : error_msg,
            "status_code" : status_code
        }
        print(response_json)
        #eel.passage_js(response_json)


class InternalServerException():
    """
    서버 오류
    """

    def __init__(self, code=None, msg=None):

        status = "fail"
        status_code = 500
        error_msg = "관리자에게 문의하세요"

        if code:
            status_code = code

        if msg:
            error_msg = msg

        response_json = {
            "status" : status,
            "message" : error_msg,
            "status_code" : status_code
        }
        print(response_json)
        #eel.passage_js(response_json)


class KISServerException():
    """
    KIS 서버 오류
    """

    def __init__(self, code=None, msg=None):

        status = "fail"
        status_code = 501
        error_msg = "API키에 문제가 있습니다. 관리자에게 문의하세요"

        if code:
            status_code = code

        if msg:
            error_msg = msg

        response_json = {
            "status" : status,
            "message" : error_msg,
            "status_code" : status_code
        }
        print(response_json)
        #eel.passage_js(response_json)



class YuantaServerException():
    """
    KIS 서버 오류
    """

    def __init__(self, code=None, msg=None):

        status = "fail"
        status_code = 501
        error_msg = "유안타모듈에 문제가 있습니다. 관리자에게 문의하세요"

        if code:
            status_code = code

        if msg:
            error_msg = msg

        response_json = {
            "status" : status,
            "message" : error_msg,
            "status_code" : status_code
        }
        print(response_json)
        #eel.passage_js(response_json)


