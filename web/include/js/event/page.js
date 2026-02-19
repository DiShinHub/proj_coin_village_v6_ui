$(function () {
    
    // -- 페이징
    let page = null;
    let value = null;
    $(document).on("click", ".nav_btn", function () {
        page = $(this).data("page");
        value = $(this).data("value");
        PageState.loadPage(page, value);
    });
})