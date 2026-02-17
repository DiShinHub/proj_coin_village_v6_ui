from commons.exception.exception import *
from service.coin_village import *
from service.heatmap import *

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
        hm = HeatmapService()

        if self.service_div == "00":
            return cv.load_runnable_services(input)
        
        elif self.service_div == "01":
            return cv.onoff_runnable_services(input)
        
        elif self.service_div == "02":
            return cv.create_runnable_services(input)
        
        elif self.service_div == "03":
            return cv.update_runnable_services(input)
        
        elif self.service_div == "04":
            return hm.load_heatmaps(input)
        
        elif self.service_div == "05":
            return hm.create_heatmap(input)
        
        elif self.service_div == "07":
            return hm.recreate_heatmap_url(input)
        
        elif self.service_div == "08":
            return hm.delete_heatmap(input)

        # not found
        raise NotFoundException(msg=f"잘못 된 요청입니다")
