$(function () {

    /*리스폰스 리스너*/
    eel.expose(passage_js);
    function passage_js(x) {
        if(x.request.service_div == "00"){
            renderServiceList(x);
        }
        else if(x.request.service_div == "01"){
            renderServiceList(x);
        }
        else if(x.request.service_div == "02"){
            if (x.response.result == true){
                alert("옵션 변경에 성공 하였습니다. ")
            }else{
                alert("옵션 변경에 실패 하였습니다. ")
            }
        }
    };

    /* 최초 서비스 렌더링 */
    loadRunnableService();

    // // n초 간격으로 리프레시
    // setInterval(function () {
    //     loadRunnableService();
    // }, 5000);
    
    // 새로고침 버튼
    $("#btnRefresh").on("click", function () {
        loadRunnableService();
    });

    // 엑티베이션 토글 
    $("#serviceList").on("click", ".toggle_badge", function () {
        const $badge = $(this);
        const seq = $badge.data("seq");
        const current = $badge.data("active");
        const nextActive = current === "Y" ? "N" : "Y";

        updateBadgeUI($badge, nextActive);
        toggleActivityRunnableService(seq, nextActive);

         
        // const $card = $badge.closest(".service_card");
        // const executionMethod = $card.find(".execute-type-select").val();
        
        setTimeout(() => {
            loadRunnableService();
        }, 1500);
    });

    // 옵션 토글
    $("#serviceList").on("click", ".options-toggle", function () {
        const $row = $(this).closest(".options-row");
        const $body = $row.find(".options-body");

        $body.slideToggle(150);
        $(this).toggleClass("open");
    });
    
    $("#serviceList").on("click", ".option-edit-btn", function () {

        const $card = $(this).closest(".service_card");

        // seq
        const seq = $card.find(".toggle_badge").data("seq");

        // execute type
        const executeType = $card.find(".execute-type-select").val();

        // options (textarea 기준)
        const serviceOption  = $card.find(".service-option").val();
        // const intervalOption = collectOptions($card, "interval");
        // const scheduleOption = collectOptions($card, "schedule");
        
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

        updateRunnableServiceOption(
            seq,
            executeType,
            serviceOption, // service_option 유지 시
            JSON.stringify(interval_options),
            JSON.stringify(schedule_options)
        );
    });
});

function loadRunnableService(){
    var input_json = {
        service_div: "00"
    };
    eel.send(input_json);
}

function toggleActivityRunnableService(seq, nextActive){
    var input_json = {
        service_div: "01",
        seq: seq,
        activate_yn: nextActive
    };
    eel.send(input_json);
}

function updateRunnableServiceOption(seq, execution_method, service_options, interval_options, schedule_options){
    var input_json = {
        service_div: "02",
        seq: seq,
        execution_method: execution_method,
        service_options: service_options,
        interval_options: interval_options,
        schedule_options: schedule_options
    
    };
    eel.send(input_json);
}

function collectOptions($card, optionType) {
    const result = {};

    $card.find(`.option-input[data-option-type="${optionType}"]`).each(function () {
        const key = $(this).data("key");
        let value = $(this).val();

        // 숫자 자동 변환
        if (!isNaN(value) && value !== "") {
            value = Number(value);
        }

        // boolean 처리
        if (value === "true") value = true;
        if (value === "false") value = false;

        result[key] = value;
    });

    return JSON.stringify(result);
}


/* 서비스 렌더링 */
function renderServiceList(x) {

    let html = "";
    x.response.data.runnable_services.forEach(item => {
        html += createCard(item);
    });
    $("#serviceList").html(html);
}


function createCard(item) {
    const isActive = item.activate_yn === "Y";
    card =  `
    <div class="service_card">
        <div class="card_header">
            <div class="product_name">${item.product_name}</div>
            <span 
                class="badge ${isActive ? 'on' : 'off'} toggle_badge"
                data-seq="${item.seq}"
                data-active="${item.activate_yn}">
                ${isActive ? 'ACTIVE' : 'INACTIVE'}
            </span>
        </div>
        <div class="card_body">
            <div class="row">
                <div class="label">Service No</div>
                <div class="value">${item.seq}</div>
            </div>
            <div class="row">
                <div class="label">Product Name</div>
                <div class="value">${item.product_name}</div>
            </div>
            <div class="row">
                <div class="label">Product Desc</div>
                <div class="value">${item.product_desc}</div>
            </div>
            <div class="row">
                <div class="label">Execute Type</div>
                <div class="value">
                    <select 
                        class="execute-type-select"
                        data-seq="${item.seq}">
                        <option value="run" ${item.execution_method === "run" ? "selected" : ""}>Run</option>
                        <option value="interval" ${item.execution_method === "interval" ? "selected" : ""}>Interval</option>
                        <option value="schedule" ${item.execution_method === "schedule" ? "selected" : ""}>Schedule</option>
                        <option value="socket" ${item.execution_method === "socket" ? "selected" : ""}>Socket</option>
                    </select>
                </div>
            </div>

            <!-- OPTIONS TOGGLE -->
            <div class="row options-row">
                <div class="label options-toggle">Options ▼</div>
                <div class="value options-body">
                    <div class="option-item">
                        <div class="option-title">Service Option</div>
                        <textarea 
                            class="json-textarea service-option"
                            data-type="service"
                            data-seq="${item.seq}"
                        >${prettyJSON(item.service_options)}</textarea>
                    </div>
                    <div class="option-item">
                        <div class="option-title">Interval Option</div>
                        <div class="option-fields">
                            ${renderOptionInputs(item.interval_options, "interval")}
                        </div>
                    </div>
                    <div class="option-item">
                        <div class="option-title">Schedule Option</div>
                        <div class="option-fields">
                            ${renderOptionInputs(item.schedule_options, "schedule")}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row action-row">
                <button class="btn option-edit-btn" data-seq="${item.seq}">
                    ⚙ 옵션 변경
                </button>
            </div>
        </div>
    </div>`;
    return card
}

function prettyJSON(data) {
    try {
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        return JSON.stringify(data, null, 2);
    } catch (e) {
        return data; // 그냥 문자열로 출력
    }
}

function renderOptionInputs(options, type) {
    let obj = {};

    // 문자열이면 파싱
    try {
        if (typeof options === "string" && options.trim() !== "") {
            obj = JSON.parse(options);
        } else if (typeof options === "object" && options !== null) {
            obj = options;
        }
    } catch (e) {
        obj = {};
    }

    let html = "";

    // ✅ 값이 하나라도 있으면 그대로 렌더
    if (Object.keys(obj).length > 0) {
        Object.keys(obj).forEach(key => {
            html += `
                <div class="option-field">
                    <label>${key}</label>
                    <input 
                        type="text"
                        class="option-input"
                        data-type="${type}"
                        data-key="${key}"
                        value="${obj[key]}"
                    />
                </div>
            `;
        });
        return html;
    }

    // ✅ 값이 없을 때 기본 입력 필드 강제 생성
    if (type === "interval") {
        html += `
            <div class="option-field">
                <label>interval_term</label>
                <input 
                    type="number"
                    class="option-input"
                    data-type="interval"
                    data-key="interval_term"
                    placeholder="ex) 5"
                />
            </div>
        `;
    }

    if (type === "schedule") {
        html += `
            <div class="option-field">
                <label>start_day</label>
                <input 
                    type="number"
                    class="option-input"
                    data-type="schedule"
                    data-key="start_day"
                    placeholder="1~31"
                />
            </div>
            <div class="option-field">
                <label>start_hour</label>
                <input 
                    type="number"
                    class="option-input"
                    data-type="schedule"
                    data-key="start_hour"
                    placeholder="0~23"
                />
            </div>
            <div class="option-field">
                <label>start_min</label>
                <input 
                    type="number"
                    class="option-input"
                    data-type="schedule"
                    data-key="start_min"
                    placeholder="0~59"
                />
            </div>
        `;
    }

    return html;
}


function updateBadgeUI($badge, activeYn) {
    $badge
        .data("active", activeYn)
        .toggleClass("on", activeYn === "Y")
        .toggleClass("off", activeYn === "N")
        .text(activeYn === "Y" ? "ACTIVE" : "INACTIVE");
}
