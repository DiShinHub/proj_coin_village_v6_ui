$(function () {
    
    //* 서비스 컨트롤 보드
    // 새로고침 버튼
    $(document).on("click", "#btnRefreshCvServices", function () {
        loadRunnableService();
    });

    // 서비스 추가용 카드 생성
    $(document).on("click", "#btnAddCvService", function () {

        if ($("#contentCvServices .service_card.new-card").length > 0) {
            alert("이미 추가 중인 서비스가 있습니다.");
            return;
        }
    
        const item = getEmptyServiceItem();
        const html = createCard(item);
    
        $("#contentCvServices").prepend(html);
    });
    
    // 엑티베이션 토글 
    $(document).on("click", "#contentCvServices .toggle_badge", function () {
        const $badge = $(this);
        const seq = $badge.data("seq");
        const current = $badge.data("active");
        const nextActive = current === "Y" ? "N" : "Y";

        updateBadgeUI($badge, nextActive);
        OnOffRunnableService(seq, nextActive);
        
        setTimeout(() => {
            loadRunnableService();
        }, 1500);
    });

    // 옵션 토글
    $(document).on("click", "#contentCvServices .options-toggle", function () {
        const $row = $(this).closest(".options-row");
        const $body = $row.find(".options-body");

        $body.slideToggle(150);
        $(this).toggleClass("open");
    });
    
    // 옵션 수정
    $(document).on("click", "#contentCvServices .option-edit-btn", function () {

        const $card = $(this).closest(".service_card");

        // seq
        const seq = $card.find(".toggle_badge").data("seq");

        // execute type
        const executionMethod = $card.find(".execute-type-select").val();

        // options
        const serviceOption  = $card.find(".service-option").val();
        let interval_options = {};
        let schedule_options = {};

        $card.find(".option-input").each(function () {
            const type = $(this).data("type");
            const key = $(this).data("key");
            const value = $(this).val();

            if (value === "") return;

            if (type === "interval") {
                interval_options[key] = Number(value);
            }
            if (type === "schedule") {
                schedule_options[key] = Number(value);
            }
        });

        if (!seq) {
            // 신규 추가
            const productName = $card.find(".product-name-input").val();
            const productDesc = $card.find(".product-desc-input").val();
    
            createRunnableService(
                productName,
                productDesc,
                executionMethod,
                serviceOption,
                JSON.stringify(interval_options),
                JSON.stringify(schedule_options)
            );
    
        } else {
            // 기존 업데이트
            updateRunnableService(
                seq,
                executionMethod,
                serviceOption,
                JSON.stringify(interval_options),
                JSON.stringify(schedule_options)
            );
        }
    });

    // * heatmap

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

    // 이전
    $(document).on("click", "#btnHeatmapPrev", function () {
        HeatmapState.prev();
    });

    // 다음
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
