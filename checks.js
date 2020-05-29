$(document).ready(function () {
    function highlight(el) {
        el.css("font-size", "18px");
        el.css("font-weight", "bolder");
        el.css("color", "red");
    }

    highlight($("dt[title='No PR Exception']"));
    highlight($("strong[title='E2E mandatory on code review']").siblings('div'));
    highlight($("strong[title='E2E mandatory on code review']"));

    let isNotFqa = $('span.jira-issue-status-lozenge').text().trim()!='QE FQA ReviewIn Review';
    let isE2EMandatory = $("strong[title='E2E mandatory on code review']").siblings('div') && $("strong[title='E2E mandatory on code review']").siblings('div').text().trim() == 'Yes';
    let noTestedByLink = !$("a.issue-link", $("dt[title='tested by']").siblings("dd")).length;

    console.error("checks here")
    if (isNotFqa && isE2EMandatory && noTestedByLink
    ) {
        console.error("Error here")
        alert("no e2e found")
    }
})
