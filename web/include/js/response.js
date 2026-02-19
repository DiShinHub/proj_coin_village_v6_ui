/* 리스폰스 핸들러*/
eel.expose(passage_js);
function passage_js(x) {
    try {
        /*cv services board*/
        if(x.request.service_div == "00"){
            CvServiceState.handleResponseLoad(x)
        }
        else if(x.request.service_div == "01"){
            CvServiceState.handleResponseLoad(x)
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
        /*heatmaps*/
        else if(x.request.service_div == "04"){
            HeatmapState.handleResponseLoad(x);
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