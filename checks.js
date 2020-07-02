$(document).ready(function () {
    function highlight(el) {
        el.css("font-size", "18px");
        el.css("font-weight", "bolder");
        el.css("color", "red");
    }

    function log(e){
        $("strong[title='E2E mandatory on code review']").append(e);
    }
    highlight($("dt[title='No PR Exception']"));
    highlight($("strong[title='E2E mandatory on code review']").siblings('div'));
    highlight($("strong[title='E2E mandatory on code review']"));

    let isNotFqa = $('span.jira-issue-status-lozenge').text().trim()!='QE FQA ReviewIn Review';
    let isE2EMandatory = $("strong[title='E2E mandatory on code review']").siblings('div') && $("strong[title='E2E mandatory on code review']").siblings('div').text().trim() == 'Yes';
    let testedBy = $("a.issue-link", $("dt[title='tested by']").siblings("dd"));

    let hasOpenStatus = testedBy.filter(e=>{ $("span.jira-issue-status-lozenge",e).text()=='OPEN'});
    let hasRejectedE2Es = testedBy.filter(e=>{ $("span.jira-issue-status-lozenge",e).text()=='FAILED E2E REVIEW'}).length;

    let noTestedByLink = !testedBy.length;

    testedBy.filter(e=>{ $("span.jira-issue-status-lozenge",e).text()=='E2E Definition'})
        .each((index,e2eDef)=>{
            let e2eDefName = $("a.issue-link",e2eDef).attr("data-issue-key");
            let noDemoLinkWithSameName = !$("a.issue-link", $("dt[title='links to']").siblings("dd"))
                .filter(e=>{ $(`a[data-issue-key=${e2eDefName}]`,e)});
            if (noDemoLinkWithSameName.length == 0){
                log(`demo not found for ${e2eDefName}`)
            }
    })

    console.error("checks here")
    if (isNotFqa && isE2EMandatory && noTestedByLink
    ) {
        console.error("Error here")
        log("no e2e found")
    }
    if (hasOpenStatus.length){
        log("open e2e linked must be at least in E2E Definition: " + '' +
            hasOpenStatus.map((index,e)=>$("a.issue-link",e).attr("data-issue-key")))
    }
    if (hasRejectedE2Es.length){
        log("rejected E2E linked"
            + hasRejectedE2Es.map((index,e)=>$("a.issue-link",e).attr("data-issue-key")))
    }
})
