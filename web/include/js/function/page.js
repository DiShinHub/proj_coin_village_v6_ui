function loadPage(page, value) {
    
    $("#contentArea").load(`./pages/${page}.html`, function (response, status) {
        if (status === "error") {
            $("#contentArea").html("<p>페이지를 불러오지 못했습니다.</p>");
        }
        CvServiceState.clear();
        HeatmapState.clear();

        if (value == "0"){
            CvServiceState.load();
        }
        else if (value == "1"){
            HeatmapState.load();
        }
    });
}