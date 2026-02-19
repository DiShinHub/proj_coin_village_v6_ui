
window.CvServiceState = {

    init() {
    },
    set() {
    },
    clear(){
    },
    /*reqeust & response for load*/
    loadCvServices(){
        var input_json = {
            service_div: "00"
        };
        eel.send(input_json);
    },
    handleResponseLoad(x){
        let html = "";
        x.response.data.runnable_services.forEach(item => {
            html += renderCard(item);
        });
        $("#contentCvServices").html(html);
    },
    renderCard(item){
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
    },
    renderOptionInputs(options, type){

        let obj = {};

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
}