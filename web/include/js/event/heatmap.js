$(function () {
    
    // 히트맵 추가 팝업 열기
    $(document).on("click", "#btnAddHeatmap", function () {
        resetHeatmapAddModal();
        $("#heatmapAddModal").fadeIn(150);
    });

    // 닫기
    $(document).on("click", "#btnCloseHeatmapModal", function () {
        resetHeatmapAddModal();
        $("#heatmapAddModal").fadeOut(150);
    });

    // 저장
    $(document).on("click", "#btnSaveHeatmap", function () {
        const title = $("#heatmapTitle").val();
        const desc  = $("#heatmapDesc").val();
        const split = $("#heatmapSplit").val();

        if (!title) {
            alert("타이틀을 입력해주세요.");
            return;
        }

        eel.send({
            service_div: "05",   // 👉 히트맵 추가용
            title: title,
            desc: desc,
            split: split
        });
        $("#heatmapAddModal").fadeOut(150);

        loadHeatmapViewerService();
    });

    // 새로고침
    $(document).on("click", "#btnRefreshCvHeatmaps", function () {
        loadHeatmapViewerService();
    });

    // 이전 버튼
    $(document).on("click", "#btnHeatmapPrev", function () {
        HeatmapState.prev();
    });

    // 오토 슬라이더 
    $(document).on("click", "#btnHeatmapSlider", function () {

        if (HeatmapState.heatmapSlidingSec == null){
            $("#btnHeatmapSlider").text("5")
            HeatmapState.stopHeatmapSliding();
            HeatmapState.heatmapSlidingSec = 5
            HeatmapState.startHeatmapSliding();

        }else if(HeatmapState.heatmapSlidingSec == 5){
            $("#btnHeatmapSlider").text("10")
            HeatmapState.stopHeatmapSliding();
            HeatmapState.heatmapSlidingSec = 10
            HeatmapState.startHeatmapSliding();
        }else if(HeatmapState.heatmapSlidingSec == 10){
            $("#btnHeatmapSlider").text("30")
            HeatmapState.stopHeatmapSliding();
            HeatmapState.heatmapSlidingSec = 30
            HeatmapState.startHeatmapSliding();
        }else if(HeatmapState.heatmapSlidingSec == 30){
            $("#btnHeatmapSlider").text("60")
            HeatmapState.stopHeatmapSliding();
            HeatmapState.heatmapSlidingSec = 60
            HeatmapState.startHeatmapSliding();
        }else if(HeatmapState.heatmapSlidingSec == 60){
            $("#btnHeatmapSlider").text("5m")
            HeatmapState.stopHeatmapSliding();
            HeatmapState.heatmapSlidingSec = 300
            HeatmapState.startHeatmapSliding();
        }else if(HeatmapState.heatmapSlidingSec == 300){
            $("#btnHeatmapSlider").text("15m")
            HeatmapState.stopHeatmapSliding();
            HeatmapState.heatmapSlidingSec = 900
            HeatmapState.startHeatmapSliding();
        }else if(HeatmapState.heatmapSlidingSec == 900){
            $("#btnHeatmapSlider").text("30m")
            HeatmapState.stopHeatmapSliding();
            HeatmapState.heatmapSlidingSec = 1800
            HeatmapState.startHeatmapSliding();
        }else{
            $("#btnHeatmapSlider").text("0")
            HeatmapState.stopHeatmapSliding();
            HeatmapState.heatmapSlidingSec = null
        }
    });
    
    // 다음 버튼
    $(document).on("click", "#btnHeatmapNext", function () {
        HeatmapState.next();
    });

    // 입력창 토글
    let isHeatmapUrlVisible = true;
    $(document).on("click", "#btnToggleHeatmapUrl", function () {
        isHeatmapUrlVisible = !isHeatmapUrlVisible;
    
        $("#heatmapContainer").toggleClass(
            "hide-heatmap-url",
            !isHeatmapUrlVisible
        );
    
        $(this).text(
            isHeatmapUrlVisible ? "URL 입력 숨기기" : "URL 입력 보이기"
        );
    });

    // 보고있는 페이지 url 업데이트
    $(document).on("click", "#btnUpdateHeatmapUrl", function () {

        const $grid = $("#heatmapContainer .heatmap-view-grid");
        if ($grid.length === 0) return;
    
        const seq = Number($grid.data("seq"));
        const urls = [];
    
        $grid.find(".heatmap-url-input input").each(function () {
            const idx = Number($(this).data("index"));
            const val = $(this).val().trim();
            urls[idx] = val;
        });
    
        // // 빈 값 제거 
        // const cleanedUrls = urls.filter(v => v && v.length > 0);

        eel.send({
            service_div: "07",   
            seq,
            urls: urls
        });

        // 새로고침
        loadHeatmapViewerService();
    });

    // 보고있는 페이지 히트맵 삭제
    $(document).on("click", "#btnDelHeatmap", function () {

        const $grid = $("#heatmapContainer .heatmap-view-grid");
        if ($grid.length === 0) return;
    
        const seq = Number($grid.data("seq"));

        eel.send({
            service_div: "08",   
            seq
        });

        // 새로고침
        loadHeatmapViewerService();
    });
    
});
