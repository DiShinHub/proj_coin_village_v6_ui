$(function () {
    
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
});
