
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
        // this.heatmapSliding = null;
        // this.heatmapSlidingSec = null;
        this.updateCntUI();
        this.stopHeatmapSliding();
    },
    load(){
        loadHeatmapViewerService();
    },
    clear(){
        this.stopHeatmapSliding();

        this.totalCnt = 0
        this.idx = 0
        this.viewers = []
        this.heatmapSliding = null
        this.heatmapSlidingSec = null
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

        const $container = $("#heatmapContainer");

        // 애니메이션 중이면 무시 (연타 방지)
        if ($container.is(":animated")) return;

        $container.fadeOut(120, () => {
            $container.empty();
            renderHeatmapContent(viewer);
            this.updateCntUI();
            $container.fadeIn(180);
        });
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
            this.heatmapSlidingSec = null;
        }
    }
};
