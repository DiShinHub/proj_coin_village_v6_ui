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
})