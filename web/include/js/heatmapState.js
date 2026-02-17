
window.HeatmapState = {
    totalCnt: 0,
    idx: 0,
    viewers: [],
    heatmapSliding: null,
    heatmapSlidingSec: null,

    init(cnt, viewers) {
        this.totalCnt = cnt;
        this.idx = 0;
        this.viewers = viewers || [];
        this.heatmapSliding = null;
        this.heatmapSlidingSec = null;
        this.updateCntUI();
    },
    next() {
        this.idx = (this.idx + 1) % this.totalCnt;
        this.render();
    },
    prev() {
        this.idx = (this.idx - 1 + this.totalCnt) % this.totalCnt;
        this.render();
    },
    render() {
        const viewer = this.viewers[this.idx];
        if (!viewer) return;
    
        const container = document.querySelector("#heatmapContainer");
        container.innerHTML = "";
        
        renderHeatmapContent(viewer);
        this.updateCntUI();
    },
    updateCntUI() {
        $("#heatmapCurrentIdx").text(this.idx + 1);
        $("#heatmapMaxIdx").text(this.totalCnt);
    },
    startHeatmapSliding() {
        if (this.heatmapSliding) return; // 중복 방지

        this.heatmapSliding = setInterval(() => {
            this.next();
        }, this.heatmapSlidingSec*1000);
    },
    stopHeatmapSliding() {
        if (this.heatmapSliding) {
            clearInterval(this.heatmapSliding);
            this.heatmapSliding = null;
        }
    }
};
