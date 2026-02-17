
from dao.heatmap_view_dao import HeatmapDao

from commons.function.common_function import *
from commons.classes.log import *


class HeatmapService():

    def __init__(self):
        self.log = Log()
        self.log.create_log()

        self.heatmap_dao = HeatmapDao()


    """
    heatmaps_viewer
    """
    def load_heatmaps(self, request):

        heatmaps_viewers = self.heatmap_dao.get_heatmaps_viewers()
        heatmaps_viewers_cnt = self.heatmap_dao.get_heatmaps_viewers_cnt()

        return {
            "request": request,
            "response": {
                "result": True,
                "msg": "",
                "data": {
                    "heatmaps_viewers": heatmaps_viewers,
                    "heatmaps_viewers_cnt": heatmaps_viewers_cnt
                }
            }
        }

    def create_heatmap(self, request):

        if self.heatmap_dao.get_heatmaps_viewer(title=request.get("title")):
            return {
                "request": request,
                "response": {
                    "result": False,
                    "msg": "이미 사용 중인 이름입니다.",
                    "data": {}
                }
            }

        params = {}
        if request.get("title"):
            params["title"] = request.get("title")

        if request.get("desc"):
            params["desc"] = request.get("desc")

        if request.get("split"):
            params["split"] = request.get("split")

        params["sort"] = 0
        if request.get("sort"):
            params["sort"] = request.get("sort")
        
        else:
            res = self.heatmap_dao.get_heatmaps_viewers()
            if res: 
                params["sort"] = res[-1]["sort"]

        self.heatmap_dao.create_heatmaps_viewer(params)

        return {
            "request": request,
            "response": {
                "result": True,
                "msg": "",
                "data": {}
            }
        }

    def delete_heatmap(self, request):

        self.heatmap_dao.delete_heatmaps_viewer(
            request["seq"]
        )

        return {
            "request": request,
            "response": {
                "result": True,
                "msg": "",
                "data": {}
            }
        }

    """
    heatmaps_viewer_url
    """
    def recreate_heatmap_url(self, request):

        heatmaps_viewer_seq = request.get("seq")
        urls = request.get("urls")

        # delete 
        self.heatmap_dao.delete_heatmaps_viewer_url(heatmaps_viewer_seq)

        # create 
        for url in urls:
            params = {}
            params["heatmaps_viewer_seq"] = heatmaps_viewer_seq
            params["url"] = url
            self.heatmap_dao.create_heatmaps_viewer_url(params)

        return {
            "request": request,
            "response": {
                "result": True,
                "msg": "",
                "data": {}
            }
        }