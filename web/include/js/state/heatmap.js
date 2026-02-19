
window.HeatmapState = {
    totalCnt: 0,
    idx: 0,
    viewers: [],
    heatmapSliding: null,
    heatmapSlidingSec: null,

    init(totalCnt, viewers, idx) {
        this.totalCnt = totalCnt;
        this.viewers = viewers || [];
        this.idx = idx;
        this.heatmapSliding = null;
        this.heatmapSlidingSec = null;
    },
    set(totalCnt=null, viewers=null, idx=null){
        if(totalCnt != null){
            this.totalCnt = totalCnt;
        }
        if(viewers != null){
            this.viewers = viewers || [];
        }
        if(idx != null){
            this.idx = idx;
        }
    },
    clear(){
        this.stopAutoSliding();
        this.totalCnt = 0
        this.idx = 0
        this.viewers = []
        this.heatmapSliding = null
        this.heatmapSlidingSec = null
    },
    /*reqeust & response for load*/
    loadHeatmaps(){
        var input_json = {
            service_div: "04"
        };
        eel.send(input_json);
    },
    handleResponseLoad(x){
        const viewers = x.response.data.heatmaps_viewers || [];
        const totalCnt = x.response.data.heatmaps_viewers_cnt.count || 0;
        const idx = 0;

        if (viewers.length === 0) {
            $("#heatmapContainer").html("<p>등록된 히트맵이 없습니다.</p>");
            return;
        }
        
        this.clear();
        this.set(totalCnt, viewers, idx);
        this.render(); 
    },
    /*rendering views*/
    render() {
        const viewer = this.viewers[this.idx];
        if (!viewer) return;

        const $container = $("#heatmapContainer");

        // 애니메이션 중이면 무시 (연타 방지)
        if ($container.is(":animated")) return;

        $container.fadeOut(120, () => {
            $container.empty();
            this.renderHeatmapContent(viewer);
            this.renderCnt();
            $container.fadeIn(180);
        });
    },
    renderHeatmapContent(item){
        const split = item.split;
        const urls = item.urls || [];
        const boxCount = this.getSplitBoxCount(split);

        let html = `<div class="heatmap-view-grid split-${split}" data-seq="${item.seq}" data-split="${split}" >`;

        for (let i = 0; i < boxCount; i++) {
            const url = urls[i] || "";

            html += `
                <div class="heatmap-box">
                ${url ? `
                    <img 
                        class="heatmap-img"
                        src="${url}"
                    />
                ` : ''}
                    <div class="heatmap-url-input">
                        <input 
                            type="text"
                            value="${url}"
                            placeholder="URL 입력"
                            data-index="${i}"
                        />
                    </div>
                </div>
            `;
        }

        html += `</div>`;
        $("#heatmapContainer").html(html);
    },
    getSplitBoxCount(split){
        switch (split) {
            case "1":   return 1;
            case "4":   return 4;
            case "6":   return 6;
            case "8":   return 8;
            default:    return 1;
        }
    },
    renderCnt() {
        $("#heatmapCurrentIdx").text(this.idx + 1);
        $("#heatmapMaxIdx").text(this.totalCnt);
    },
    /*sliding pages*/
    nextSlide() {
        this.idx = (this.idx + 1) % this.totalCnt;
        this.render();
    },
    prevSlide() {
        this.idx = (this.idx - 1 + this.totalCnt) % this.totalCnt;
        this.render();
    },
    startAutoSliding() {
        if (this.heatmapSliding) return; // 중복 방지

        this.heatmapSliding = setInterval(() => {
            this.nextSlide();
        }, this.heatmapSlidingSec*1000);
    },
    stopAutoSliding() {
        if (this.heatmapSliding) {
            clearInterval(this.heatmapSliding);
            this.heatmapSliding = null;
            this.heatmapSlidingSec = null;
        }
    },
    /* ui events */
    setHeatmapAddModal(heatmapTitle="", heatmapDesc="", heatmapSplit="1") {
        $("#heatmapTitle").val(heatmapTitle);
        $("#heatmapDesc").val(heatmapDesc);
        $("#heatmapSplit").val(heatmapSplit); 
    },
};
