function loadPage(page, value) {
    
    $("#contentArea").load(`./pages/${page}.html`, function (response, status) {
        if (status === "error") {
            $("#contentArea").html("<p>페이지를 불러오지 못했습니다.</p>");
        }

        if (value == "0"){
            loadRunnableService();
        }
        else if (value == "1"){
            loadHeatmapViewerService();
        }
    });
}

function loadRunnableService(){
    var input_json = {
        service_div: "00"
    };
    eel.send(input_json);
}

function OnOffRunnableService(seq, nextActive){
    var input_json = {
        service_div: "01",
        seq: seq,
        activate_yn: nextActive
    };
    eel.send(input_json);
}

function getEmptyServiceItem() {
    return {
        seq: null,
        activate_yn: "N",
        product_name: "",
        product_desc: "",
        execution_method: "run",
        service_options: {},
        interval_options: {},
        schedule_options: {}
    };
}

function createRunnableService(product_name, product_desc, execution_method, service_options, interval_options, schedule_options){

    var input_json = {
        service_div: "02",
        product_name: product_name,
        product_desc: product_desc,
        execution_method: execution_method,
        service_options: service_options,
        interval_options: interval_options,
        schedule_options: schedule_options
    };
    eel.send(input_json);
}

function updateRunnableService(seq, execution_method, service_options, interval_options, schedule_options){
    var input_json = {
        service_div: "03",
        seq: seq,
        execution_method: execution_method,
        service_options: service_options,
        interval_options: interval_options,
        schedule_options: schedule_options
    };
    eel.send(input_json);
}

/*  */
function updateBadgeUI($badge, activeYn) {
    $badge
        .data("active", activeYn)
        .toggleClass("on", activeYn === "Y")
        .toggleClass("off", activeYn === "N")
        .text(activeYn === "Y" ? "ACTIVE" : "INACTIVE");
}

function rendercontentCvServices(x) {

    let html = "";
    x.response.data.runnable_services.forEach(item => {
        html += createCard(item);
    });
    $("#contentCvServices").html(html);
}

function createCard(item) {

    const isNew = !item.seq;
    const isActive = item.activate_yn === "Y";
    card =  `
    <div class="service_card ${isNew ? "new-card" : ""}">
        <div class="card_header">
            <div class="product_name">
                ${isNew 
                    ? `<input class="new-input product-name-input" placeholder="Product Name" />`
                    : item.product_name
                }
            </div>
            <span 
                class="badge ${isActive ? 'on' : 'off'} toggle_badge"
                data-seq="${item.seq ?? ''}"
                data-active="${item.activate_yn}"
                ${isNew ? "style='pointer-events:none;opacity:0.4'" : ""}
            >
                ${isActive ? 'ACTIVE' : 'INACTIVE'}
            </span>
        </div>
        <div class="card_body">
            <div class="row">
                <div class="label">Service No</div>
                <div class="value">${isNew ? "NEW" : item.seq}</div>
            </div>

            <div class="row">
                <div class="label">Product Desc</div>
                <div class="value">
                    ${isNew
                        ? `<input class="new-input product-desc-input" placeholder="Description" />`
                        : item.product_desc
                    }
                </div>
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
                <button class="btn option-edit-btn">
                    ${isNew ? "➕ 서비스 생성" : "⚙ 옵션 변경"}
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

    if (type === "interval") {
        html += `
            <div class="option-field">
                <label>interval_term</label>
                <input 
                    type="number"
                    class="option-input"
                    data-type="interval"
                    data-key="interval_term"
                    value="${Object.hasOwn(obj, 'interval_term') ? obj.interval_term : ''}"
                    placeholder="ex) 5"
                />
            </div>
        `;
        return html;
        
    }else if (type === "schedule") {

        html += `
                <div class="option-field">
                    <label>start_day</label>
                    <input 
                        type="number"
                        class="option-input"
                        data-type="schedule"
                        data-key="start_day"
                        placeholder="1~31"
                        value="${Object.hasOwn(obj, 'start_day') ? obj.start_day : ''}"
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
                        value="${Object.hasOwn(obj, 'start_hour') ? obj.start_hour : ''}"
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
                        value="${Object.hasOwn(obj, 'start_min') ? obj.start_min : ''}"
                    />
                </div>
            `;
        return html;
    }
}

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
