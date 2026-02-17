window.HeatmapState = {
    totalCnt: 0,
    idx: 0,
    viewers: [],

    init(cnt, viewers) {
        this.totalCnt = cnt;
        this.idx = 0;
        this.viewers = viewers || [];
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
    
        // const layout = this.createLayout(viewer.split);
        // container.appendChild(layout);
        
        renderHeatmapContent(viewer);
        this.updateCntUI();
    },
    updateCntUI() {
        $("#heatmapCurrentIdx").text(this.idx + 1);
        $("#heatmapMaxIdx").text(this.totalCnt);
    },
};
