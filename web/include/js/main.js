/* 리퀘스트/리스폰스 핸들러*/
eel.expose(passage_js);
function passage_js(x) {
    try {
        if(x.request.service_div == "00"){
            rendercontentCvServices(x);
        }
        else if(x.request.service_div == "01"){
            rendercontentCvServices(x);
        }
        else if(x.request.service_div == "02"){
            if (x.response.result == true){
                alert("추가에 성공 하였습니다. ")
            }else{
                alert("추가에 실패 하였습니다. ")
            }
        }
        else if(x.request.service_div == "03"){
            if (x.response.result == true){
                alert("변경에 성공 하였습니다. ")
            }else{
                alert("변경에 실패 하였습니다. ")
            }
        }
        else if(x.request.service_div == "04"){
            renderContentCvHeatmaps(x);
        }
        else if(x.request.service_div == "05"){
            if (x.response.result == true){
                alert("추가에 성공 하였습니다. ")
            }else{
                alert(x.response.msg)
            }
        }
        else if(x.request.service_div == "07"){
            if (x.response.result == true){
                alert("변경에 성공 하였습니다. ")
            }else{
                alert(x.response.msg)
            }
        }
        else if(x.request.service_div == "08"){
            if (x.response.result == true){
                alert("삭제에 성공 하였습니다. ")
            }else{
                alert(x.response.msg)
            }
        }
        return true

    } catch(e){
        console.log(e)
        return false
    }
};

/* 기본 랜더링 */
$(function () {

    // -- 초기 로딩
    loadPage("cv_services", "0");

    // -- 페이징
    let page = null;
    let value = null;
    $(document).on("click", ".nav_btn", function () {
        page = $(this).data("page");
        value = $(this).data("value");
        loadPage(page, value);
        
        PageState.setPage(value);
    });
});
