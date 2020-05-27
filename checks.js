$(document).ready(function () {
    function highlight(el) {
        el.css("font-size", "18px");
        el.css("font-weight", "bolder");
        el.css("color", "red");
    }

    highlight($("dt[title='No PR Exception']"));
    highlight($("strong[title='E2E mandatory on code review']").siblings('div'));
    highlight($("strong[title='E2E mandatory on code review']"));

    if ($("strong[title='E2E mandatory on code review']").siblings('div') && $("strong[title='E2E mandatory on code review']").siblings('div').text().trim() == 'Yes'
        && !$("a.issue-link", $("dt[title='tested by']").siblings("dd")).length) {
        alert("no e2e found")
    }
})
