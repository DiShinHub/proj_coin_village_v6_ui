from commons.exception.exception import *
from service.coin_village import *

class Route():


    def __init__(self):

        self.url = None
        self.service_div = None

    # ==========================================================
    # route
    # ==========================================================
    def route(self, input):
        """ 
        def description : 라우트
        -------
        """
        self.service_div = input["service_div"]
        cv = CoinVillageService()

        # load db 
        if self.service_div == "00":
            return cv.load_runnable_services(input)
        
        elif self.service_div == "01":
            return cv.toggle_runnable_services_activation(input)
        
        elif self.service_div == "02":
            return cv.update_runnable_services_options(input)

        # not found
        raise NotFoundException(msg=f"잘못 된 요청입니다")
