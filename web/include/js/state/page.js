
window.PageState = {
    page: "0",
    cvServiceInterval: null,
    heatmapInterval: null,

    init() {
        this.page = "0"
        this.clearIntervals();
    },
    loadPage(page, value) {
        this.clearIntervals();
        
        $("#contentArea").load(`./pages/${page}.html`, function (response, status) {
            if (status === "error") {
                $("#contentArea").html("<p>페이지를 불러오지 못했습니다.</p>");
            }
            CvServiceState.clear();
            HeatmapState.clear();

            if (value == "0"){
                CvServiceState.load();
                this.startCvInterval();
            }
            else if (value == "1"){
                HeatmapState.load();
                this.startHeatmapInterval();
            }
        });
    },
    /* Clear all Intervals */
    clearIntervals() {
        this.stopCvInterval();
        this.stopHeatmapInterval();
    },
    /* CvService board Interval on/off*/
    startCvInterval() {
        let min = 15
        if (this.cvServiceInterval) return; 
        this.cvServiceInterval = setInterval(() => {
            CvServiceState.loadCvServices();
        }, min*60*1000);
    },
    stopCvInterval() {
        if (this.cvServiceInterval) {
            clearInterval(this.cvServiceInterval);
            this.cvServiceInterval = null;
        }
    },
    /* heatmaps Interval on/off*/
    startHeatmapInterval() {
        let min = 15
        if (this.heatmapInterval) return; 
        this.heatmapInterval = setInterval(() => {
            HeatmapState.loadHeatmaps();
        }, min*60*1000);
    },
    stopHeatmapInterval() {
        if (this.heatmapInterval) {
            clearInterval(this.heatmapInterval);
            this.heatmapInterval = null;
        }
    }
};
