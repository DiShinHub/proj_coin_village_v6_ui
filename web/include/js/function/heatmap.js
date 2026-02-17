
function loadHeatmapViewerService(){
    var input_json = {
        service_div: "04"
    };
    eel.send(input_json);
}

function renderContentCvHeatmaps(x) {

    const viewers = x.response.data.heatmaps_viewers || [];
    const cnt = x.response.data.heatmaps_viewers_cnt.count || 0;

    HeatmapState.init(cnt, viewers);

    if (viewers.length === 0) {
        $("#heatmapContainer").html("<p>등록된 히트맵이 없습니다.</p>");
        return;
    }
    HeatmapState.render(); 
}

function renderHeatmapContent(item) {
    const split = item.split;
    const urls = item.urls || [];
    const boxCount = getSplitBoxCount(split);

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
}

function getSplitBoxCount(split) {
    switch (split) {
        case "1":   return 1;
        case "4":   return 4;
        case "6":   return 6;
        case "8":   return 8;
        default:    return 1;
    }
}

function resetHeatmapAddModal() {
    $("#heatmapTitle").val("");
    $("#heatmapDesc").val("");
    $("#heatmapSplit").val("1"); // 기본값
}
