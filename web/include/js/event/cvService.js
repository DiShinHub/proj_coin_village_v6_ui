$(function () {
    
    // 새로고침 버튼
    $(document).on("click", "#btnRefreshCvServices", function () {
        CvServiceState.loadCvServices();
    });

    // 서비스 추가용 카드 생성
    $(document).on("click", "#btnAddCvService", function () {

        if ($("#contentCvServices .service_card.new-card").length > 0) {
            alert("이미 추가 중인 서비스가 있습니다.");
            return;
        }

        const item = {
            seq: null,
            activate_yn: "N",
            product_name: "",
            product_desc: "",
            execution_method: "run",
            service_options: {},
            interval_options: {},
            schedule_options: {}
        };

        const html = CvServiceState.renderCard(item);
    
        $("#contentCvServices").prepend(html);
    });
    
    // 엑티베이션 토글 
    $(document).on("click", "#contentCvServices .toggle_badge", function () {
        const $badge = $(this);
        const seq = $badge.data("seq");
        const current = $badge.data("active");
        const nextActive = current === "Y" ? "N" : "Y";

        $badge
            .data("active", activeYn)
            .toggleClass("on", activeYn === "Y")
            .toggleClass("off", activeYn === "N")
            .text(activeYn === "Y" ? "ACTIVE" : "INACTIVE");
            
        //
        var input_json = {
            service_div: "01",
            seq: seq,
            activate_yn: nextActive
        };
        eel.send(input_json);
        
        setTimeout(() => {
            CvServiceState.loadCvServices();
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
    
            var input_json = {
                service_div: "02",
                product_name: productName,
                product_desc: productDesc,
                execution_method: executionMethod,
                service_options: serviceOption,
                interval_options: JSON.stringify(interval_options),
                schedule_options: JSON.stringify(schedule_options)
            };
            eel.send(input_json);

        } else {
            // 업데이트
            var input_json = {
                service_div: "03",
                seq: seq,
                execution_method: executionMethod,
                service_options: serviceOption,
                interval_options: JSON.stringify(interval_options),
                schedule_options: JSON.stringify(schedule_options)
            };
            eel.send(input_json);

        }
    });
});
