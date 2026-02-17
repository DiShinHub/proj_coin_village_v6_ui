
window.PageState = {
    page: "0",
    cvServiceInterval: null,
    heatmapInterval: null,

    init() {
        this.page = "0"
        this.resetIntervals();
    },
    setPage(page) {
        this.page = page
        this.resetIntervals();
        if (page == 0) {
            this.startHeatmapInterval();
        } 
        else if (page == 1) {
            this.startHeatmapInterval();
        } 
    },
    resetIntervals() {
        this.stopCvInterval();
        this.stopHeatmapInterval();
    },
    /* CvService board Interval on/off*/
    startCvInterval() {
        let min = 15
        if (this.cvServiceInterval) return; 
        this.cvServiceInterval = setInterval(() => {
            loadRunnableService();
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
            loadHeatmapViewerService();
        }, min*60*1000);
    },
    stopHeatmapInterval() {
        if (this.heatmapInterval) {
            clearInterval(this.heatmapInterval);
            this.heatmapInterval = null;
        }
    }
};
