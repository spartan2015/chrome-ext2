var myjQuery = $;
$(document).ready(function () {
    window.vasQ = $;
    let rules = {
        "2":
            "If the unit PR couples several other units (exception), then there is on the child units, demos for the e2es linked, and they will be reviewed upfront with the unit getting reviewed (which can lead to rejections on the parent unit)."
        ,
        "3":
            "FS does not have PR from other tickets"
        ,
        "4":
            "1 FS -> 1 PR (per necessary repo) - except if the Feature Story expected outcome, is not a PR that will be integrated with the base branch"
        ,
        "5":
            "PR is visible on the feature story on the \"PR Link (s)\" field.\nIf multiple Pr's, add all of them to the \"PR Link (s)\" field comma separated"
        ,
        "6":
            "PR implements exactly all aspects of the scope of the Feature Story it belongs to."
        ,
        "7":
            "PR has a successful build."
        ,
        "8":
            "PR is up to date with base branch"
        ,
        "9":
            "PR Name follows project conventions"
        ,
        "11":
            "Code follows SOLID principles"
        ,
        "13":
            "There are no duplicated code blocks introduced by this PR"
        ,
        "17":
            "No secrets or credentials are found on PR"
        ,
        "18":
            "Code follow style and naming conventions (standard for programming/markup/query language)"
        ,
        "19":
            "A class can not have more than 500 lines"
        ,
        "20":
            "Code does not introduce vulnerabilities (XSS, CSRF, Injections, Broken Auth/Session management) or exploits"
        ,
        "21":
            "Code does not introduce performance and resource consumption or memory leaks concerns"
        ,
        "22":
            "There are no unused references, methods or variables"
        ,
        "23":
            "There are no code simplification to be done"
        ,
        "24":
            "No task/thread/parallelism is removed, resulting in UI or process locking"
        ,
        "25":
            "Classes with gets that have computed values per get request, are not a multithread or timming lyability (as output might vary with time)"
        ,
        "26":
            "Call back hell is not found on PR"
        ,
        "27":
            "Mutable properties (reference types) are implemented in a way that it's not prone to NullPointerExceptions."
        ,
        "28":
            "Flexible dependency versions are not used."
        ,
        "29":
            "IF statements with +2 operands and nested calls are forbidden.\nShould be extracted to a bool method for readability."
        ,
        "30":
            "IF statements with nested calls with arguments being passed are forbidden.\nShould be extracted to a variable and asserted on the id."
        ,
        "31":
            "A method can not have more than 100 lines"
        ,
        "32":
            "Null is not returned by any new method to prevent NPE"
        ,
        "33":
            "Magic values are not used."
        ,
        "34":
            "API interface is immutable, unless explicitly requested by spec"
        ,
        "35":
            "There is no commented code"
        ,
        "36":
            "Mocked data is not used in production code"
        ,
        "37":
            "Unit tests (tests a single unit - no indirect testing) are part of the PR and cover all added or updated methods"
        ,
        "38":
            "None of the existing test are deleted"
        ,
        "39":
            "There are no unnecessary classes created for testing purposes, that could be avoided by mocking the concrete implementation methods"
        ,
        "41":
            "All PCA's open comments on PR are followed and closed"
        ,
        "42":
            "Package/Libraries adition/replacement is agreed with ProdTeam"
        ,
        "43":
            "Product specific checks are validated"
        ,
        "44":
            "Cross cutting frameworks are consistent through out the PR and product."
        ,
        "46":
            "String comparison is done in a case insensitive way and uses when available equality methods instead of =="
        ,
        "47":
            "No console logs are found on javascript-based code, that are visible/available to end users"
        ,
        "48":
            "Unit tests contain only automatic assertions, and at least one."
        ,
        "49":
            "PR addresses all components identified on the Feature Story scope.\nIf components are wrongly identified, or missing, a clear comment about it exists explaining why per component (missing or wrongly included)."
        ,
        "50":
            "PR delivers exactly all components and TDD's in scope of the unit"
        ,
        "51":
            "There are no Core Read \"red\" (severe or red) findings on the PR"
        ,
        "52":
            "There is at least 1 E2E demo, from a linked E2E with the link type \"Tested by\", where all steps are executed successfully"
        ,
        "53":
            "There are no visible unexpected error messages in the demo"
        ,
        "54":
            "There are no inconsistent messages visible in the demo"
        ,
        "55":
            "The demo executes exactly all the steps described on the E2E and their assertion (executing pre condition E2E's is not required to be demoed)"
        ,
        "56":
            "The demo is attached to the ticket (Feature Story or Feature Defect) by a web link that is shared with anyone within the Aurea group, with the E2E name as the Link text"
        ,
        "57":
            "E2E successfully passes all checks here: GET http://private.central-eks.aureacentral.com/pca-qe/api/review/<ticket_key>"
        ,
        "58":
            "E2E status is at least in E2E Definition."
        ,
        "59":
            "E2E does not contradict the E2E Gherkin Playbook: https://docs.google.com/document/d/1Ur8On0zG3afRllVnWxgSibnUxrW-4fcDHUTVhB2qTuA/edit#"
        ,
        "60":
            "E2E passes the E2E QB: https://docs.google.com/spreadsheets/d/1gpKkkXNHnOYSNCPonyqfKS6zOPjrMUzSBm2MTqYc6xU/edit#gid=0"
        ,
        "61":
            "E2E covers at least one complete use case of the unit functional scope"
        ,
        "62":
            "If the unit PR couples several other units (exception), then there is on the child units, demo(s) for the e2e(s) linked, and they will be reviewed upfront with the unit getting reviewed."
        ,
        "63":
            "Steps adhere to the specification described here, using the correct syntax: https://docs.google.com/document/d/1bNdbXymBHDIp0MtvGM_xqeN7569qVT9d1izrOkJIov4/edit"
        ,
        "64":
            "Summary and Business Goal are related"
        ,
        "65":
            "TestSuite Category is defined as Regression"
        ,
        "66":
            "An attribute is related to the E2E goal."
        ,
        "67":
            "Attribute belong to the project the unit that the E2E is linked, belongs to."
        ,
        "68":
            "Functional Areas are related to the E2E affected components.\nIf the unit is Feature Story, there must be at least 1 E2E component overlapping with the ones mapped to the Feature Story."
        ,
        "69":
            "Functional Areas belong to the project the unit that the E2E is linked, belongs to."
        ,
        "70":
            "There is a Business Goal described in a Gherkin format."
        ,
        "71":
            "E2E.QB Version equals the version described on https://docs.google.com/spreadsheets/d/1gpKkkXNHnOYSNCPonyqfKS6zOPjrMUzSBm2MTqYc6xU/edit#gid=0"
        ,
        "72":
            "Environments page exists on the reference links on the preconditions section"
        ,
        "73":
            "All selectors exist on the environments page."
        ,
        "75":
            "There are no selectors defined on the steps (steps reference selectors by name)"
        ,
        "76":
            "Attribute Rationale exists, and describes all attributes used on the E2E without exception acurately"
        ,
        "77":
            "‘User Credentials’ row fill credentials of users you’re going to use in your E2E on the preconditions section"
        ,
        "78":
            "E2E passes the Test Writing Input QB: https://confluence.devfactory.com/pages/viewpage.action?spaceKey=QMT&title=Test+Writing+Input+Quality+Bar"
        ,
        "79":
            "All global variables exist on the environments page"
        ,
        "80":
            "There are no variables or selectors present on the E2E precondition section"
        ,
        "81":
            "There are no empty blocks (i.e.: if's, exceptions, switch, etc), except if there is an explicit comment exists with the rationale that justifies it"
        ,
        "82":
            "No arguments are passed to base class outside of constructor"
        ,
        "83":
            "There are no raw/high-level exceptions thrown, caught or used (unless they can't be replaced by specific ones)"
        ,
        "85":
            "Serializations are handled in a safe way, not prone to exceptions"
        ,
        "86": "Comparison overrides are handled in a safe way, not prone to exceptions",
        "55": "The demo executes exactly all the steps described on the E2E and their assertion (executing pre condition E2E's is not required to be demoed)",
        "87": "If a demo is of an automated E2E, PR where it executed and E2E it refers to, is visible.",
        "88": "There is a demo timestamp, and it is of the same day, as the PR last commit."
    }
    /*

    * */
    /*$('body').append(`
                <div style="max-width:500px; max-height:500px;position:fixed; left: 0; top: 300px; overflow: auto">
                <input style="width:100px;" type="text" id="iqb-searchBox"/>
                <div id="iqb-searchBoxResults"></div>
        </div
`);

     */

    let lookoutFor = {
        "5k-sococo" : [
            "Merge the code when done"
        ],
        "devfactory-codeserver-framework":[
            "LOTS OF PCA REJECTIONS - CHECK checklist PCA rules always!",
            "method visibility order"
        ],
        "aurea-jivecloud-jivedaily-reactnative" : [
            "Allows dangling comma"
        ],
        "jive-cloud-application": [
            `Generic classes are explicit when used: public class EventInterceptor implements EventListener VS  public class EventInterceptor implements EventListener<BaseJiveEvent>`,
            `There is no method overriding unless business logic differs from the base class`,
            `Listeners, Interceptors, handlers etc are covered by IT tests`,
            `Code complies to Product coding guildeline: https://aurea.jiveon.com/docs/DOC-196119`,
            `If PR touches cache, it does not introduce changes on the behavior, unless clear on the FS scope.`,
            `If EqualsVerifier.forClass() is used, it is configured with .suppress(Warning.ALL_FIELDS_SHOULD_BE_USED)`,
            `"PR adheres to the following design: Jive Core > internal bus > event interceptor > SNS bus`,
            `(There is no skipping of the internal bus is wrong - except in partial or full reindexing)`,
            `There is no whitebox testing`,
            `ExpectedExceptions rule is used`,
            `There is no log.debug and warning (except if tracking a real issue)`,
        ]
    }

    let parts = window.location.href.match("https://github.com/([^/]+)/([^/]+)/pull/([^/]+)(/files)?")
    let user = parts[1]
    let repoName = parts[2]
    let no = parseInt(parts[3])

    let rulesString = lookoutFor[repoName].map(e=>`<li>${e}</li>`).join("")
    $("div.gh-header").append(`       
        <div style="background-color:lightpink">Repo: ${repoName} 
            <ul>
                ${rulesString}
            </ul>
        </div>    
    `)


    function getLocalStorageElement(key) {
        if (!localStorage[key]) {
            localStorage[key] = prompt(`provide ${key}`);
        }
        return localStorage[key];
    }

    function applyCloseButtons(){

        $(".timeline-comment-actions").append("<button class='iqb-comment-close'>Close</button>");
        myjQuery('body').on("click", "button.iqb-comment-close", function (e) {
            let commentElement = myjQuery(e.target).parents(".js-comments-holder").find(".comment-body:first");
            let comment = commentElement.text().trim();

            let commentId = myjQuery(e.target).parents(".js-comments-holder").find(".review-comment").attr('id').substr(1);

            $.ajax({
                //PATCH /repos/:owner/:repo/pulls/comments/:comment_id: https://developer.github.com/v3/pulls/comments/#create-a-reply-for-a-review-comment
                //
                url: `https://api.github.com/repos/${user}/${repoName}/pulls/comments/${commentId}`,
                type: "PATCH",
                headers: {
                    "Accept" : "application/vnd.github.v3+json",
                    "Authorization": "Basic " + btoa(getLocalStorageElement("gpu")+":"+ getLocalStorageElement("gpa")),
                    "Content-Type" : "application/json"
                },
                data: JSON.stringify({ body : `${comment} [closed]` }),
                dataType:"json",
                contentType: "application/json",
                success: function( data, textStatus, jQxhr ){
                    commentElement.append("<div>[Closed]</div>")
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    $.ajax({
                        url: `https://api.github.com/repos/${user}/${repoName}/pulls/${no}/comments/${commentId}/replies`,
                        type: "POST",
                        headers: {
                            "Accept": "application/vnd.github.v3+json",
                            "Authorization": "Basic " + btoa(getLocalStorageElement("gpu") + ":" + getLocalStorageElement("gpa")),
                            "Content-Type": "application/json"
                        },
                        data:`{"body": "${comment} [closed]"}`,
                        dataType: "json",
                        contentType: "application/json",
                        success: function( data, textStatus, jQxhr ){
                            commentElement.append("<div>[Closed]</div>")
                        },
                        error: function( jqXhr, textStatus, errorThrown ){
                            commentElement.append("<div>Could not close comment</div>")
                        }
                    });
                }
            })

        })

    }

    $(".timeline-comment-header").append("<button class='iqb-timelinecomment-close'>Close</button>");
    myjQuery('body').on("click", "button.iqb-timelinecomment-close", function (e) {
        let comment = myjQuery(e.target).parents(".timeline-comment-group").find(".edit-comment-hide").text().trim();

        $.ajax({
            url: `/repos/${user}/${repoName}/pulls/${no}/comments`,
            type:"POST",
            headers: {
                "Accept" : "application/vnd.github.v3+json",
                "Authorization": btoa(getLocalStorageElement("gpu")+":"+ getLocalStorageElement("gpa"))
            },
            data:{ body : `${comment} [closed]` },
            dataType:"json"
        })

    })


    $("div.pr-toolbar").append("<button class='iqb-find-public'>Find Public Test</button>")

    $("div.pr-toolbar").append("<button class='iqb-find-public'>AppendCloseButtons</button>")
    $("button.iqb-find-public").click(function(e){
       applyCloseButtons();
    })

    function wildCardsInPackageJson() {
        myjQuery("div.file div.file-header[data-path*='package.json']").parents("div.file").find("span.blob-code-inner[data-code-marker='+']")
            .each((i, e) => {
                let targetElement = myjQuery(e);
                let wildCard = e.innerText.match(/[\^~*]+/);
                if (wildCard) {
                    targetElement.css("background-color", "lightpink")
                }
            })
    }

    function noLogWarnOrDebug(e){
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.indexOf("log.warn") > 0 || e.innerText.indexOf("log.debug") > 0
        if (wildCard) {
            targetElement.append("<div>[43] log warn or debugged only if absolutely necessary</div>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function noWhitebox(e){
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.indexOf("Whitebox") > 0
        if (wildCard) {
            targetElement.append("<div>[43] no whitebox testing </div>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function hasEqualsVerifier(e){
        let targetElement = myjQuery(e);
        let wildCard = targetElement.text().match(/public boolean (equals)/) || e.innerText.match(/public int (hashCode)/)
        if (wildCard) {
            let methodName = wildCard[1];

            let where = targetElement.parents("div.file").find("div.file-header").attr("data-path");
            let file = where.substr(where.lastIndexOf("/") + 1);
            let test = isJs ?
                myjQuery(`div#files div.file div.file-header[data-path*='${fileNoExt}\.spec\.ts']`)
                : myjQuery(`div#files div.file div.file-header[data-path*=${fileNoExt}Test]`)
            let testLine = test.siblings(`div.js-file-content`).find(`span.blob-code-inner:contains(${methodName})`);
            if (testLine.length > 0){
                testLine.append(`<a class="iqb-a" name='${fileNoExt}-line'>H</a>`)
                targetElement.append(`<a href='#${fileNoExt}-line'>[GoToLine]</a>`)
            }else{
                targetElement.append("<div>[43] must be tested with EqualsVerifier </div>")
                targetElement.css("background-color", "lightpink")
            }
        }
    }

    $("button.iqb-find-public").click(function(e){
        wildCardsInPackageJson();

        let codeLine = myjQuery("span.blob-code-inner");//[data-code-marker='+']
        let messaged = {};
        codeLine.each((i,e)=>{

            noLogWarnOrDebug(e)
            noWhitebox(e)
            hasEqualsVerifier(e);

            let targetElement = myjQuery(e);
            let foundPublicMethod = e.innerText.match(/public[^(]*\s(.+)\(.*/);
            if ( foundPublicMethod ){
                processPublicMethod(foundPublicMethod, targetElement, messaged);
            }
        })
    })

    function processPublicMethod(foundPublicMethod, targetElement, messaged) {
        let methodName = foundPublicMethod[1];

        let where = targetElement.parents("div.file").find("div.file-header").attr("data-path");
        let file = where.substr(where.lastIndexOf("/") + 1);
        let isTest =
                file.substring(0, file.lastIndexOf("."))
                    .endsWith("Test")
                ||
                file.endsWith(".spec.ts");

        let isJs = file.endsWith(".ts");
        let fileNoExt = file.substring(0, file.lastIndexOf("."))
        if (isTest) {
            return;
        }

        let test = isJs ?
            myjQuery(`div#files div.file div.file-header[data-path*='${fileNoExt}\.spec\.ts']`)
            : myjQuery(`div#files div.file div.file-header[data-path*=${fileNoExt}Test]`)
        let testLine = test.siblings(`div.js-file-content`).find(`span.blob-code-inner:contains(${methodName})`);

        targetElement.append(`<a name='iqb-method-${methodName}'></a>`);
        targetElement.append(`<span>Has test: ${test.length > 0} method found: ${testLine.length > 0}</span>`);
        if (test.length > 0) {
            if ($("a.iqb-a", test).length == 0) {
                test.append(`<a class="iqb-a" name='${fileNoExt}'>H</a>`)
            }
            targetElement.append(`<a class="iqb-open-test" href="${test.attr('data-path')}">[OpenTest]</a>`);
            targetElement.append(`<a href='#${fileNoExt}'>[GoToTest]</a>`)
            if (testLine.length > 0) {
                testLine.append(`<a class="iqb-a" name='${fileNoExt}-line'>H</a>`)
            } else {
                $("div.tabnav").append(`<div><a href="#iqb-method-${methodName}">[37]  no new UT added related to ${methodName} from ${fileNoExt} found while looking in ${fileNoExt}${isJs ? ".spec.ts" : "Test"}</a></div>`)
            }
            targetElement.append(`<a href='#${fileNoExt}-line'>[GoToLine]</a>`)
        } else {
            targetElement.append("<button class='iqb-report-missing-ut'>ReportMissingTest</button>")

            if (!messaged[fileNoExt]) {
                targetElement.css("background-color", "lightpink");
                $("div.tabnav").append(`<div><a href="#iqb-method-${methodName}">[37] no unit test for ${fileNoExt} found while looking for a UT for ${methodName} of ${file}</a></div>`)
                messaged[fileNoExt] = true;
            }
        }
    }

    myjQuery('body').on("click", "button.iqb-report-missing-ut", function (e) {
        let targetElement = $(e.target);
        let lineNo = targetElement.parents("tr").find("td.blob-num.js-linkable-line-number").attr("data-line-number");
        let position = targetElement.parents("td.blob-code").find("button.js-add-line-comment").attr("data-position");
        let path = targetElement.parents("div.file").find("div.file-header").attr("data-path");
        let href = targetElement.parents("div.file").find("details-menu.dropdown-menu-sw a:first").attr("href");
        let firstPos = href.indexOf("blob/")+5;
        let commit_id = href.substr(firstPos,href.indexOf("/",firstPos+1)-firstPos);

        let comment = "[37] No direct unit test found for this method while search the corresponding .spec.ts"

        $.ajax({
            url: `https://api.github.com/repos/${user}/${repoName}/pulls/${no}/comments`,
            type: "POST",
            headers: {
                "Accept" : "application/vnd.github.comfort-fade-preview+json",
                "Authorization": "Basic " + btoa(getLocalStorageElement("gpu")+":"+ getLocalStorageElement("gpa")),
                "Content-Type" : "application/json"
            },
            data: JSON.stringify({
                body : `${comment}`,
                commit_id,
                path,
                line : parseInt(lineNo),
                side : "RIGHT",
                //position: position,
                //"start_side": "RIGHT",
                //start_line: lineNo

            }),
            dataType:"json",
            contentType: "application/json",
            success: function( data, textStatus, jQxhr ){
                targetElement.append("<div>[ADDED UT MISSING]</div>")
            },
            error: function( jqXhr, textStatus, errorThrown ){
                alert("failed to post")
            }
        })

    })


    let addIqbInput = function (e) {
        //console.log(e.target);
        let obj = $(e.target);
        //console.log($("div.inline-comment-form", obj));
        $("div.inline-comment-form", obj).append(`
                     <div>
                            <input style="width:100px;" type="text" class="iqb-searchBox"/>
                            <div id="iqb-searchBoxResults"></div>
                    </div>
                `)
    };
    myjQuery('body').on('DOMNodeInserted', 'div.TimelineItem', addIqbInput);
    myjQuery('body').on('DOMNodeInserted', 'tr.js-inline-comments-container', addIqbInput);


    // ==================== EVENTS


    myjQuery('body').on("click", "button.iqb-close", function () {
        let textareaEl = myjQuery("textarea.comment-form-textarea",
            $(event.target).parents("tr.js-inline-comments-container"));
        if (!textareaEl.length)
            textareaEl =  myjQuery("textarea",
                $(event.target).parents("div.TimelineItem"));

        textareaEl
            .val(textareaEl
                .val() + " [closed]")
        textareaEl.form.submit();
    })

    myjQuery('body').on("click", "button.js-comment-edit-button", function (e) {
        let obj = $(e.target).parents("tr.js-inline-comments-container");
        if (!obj.length){
            obj = $(e.target).parents("div.TimelineItem");
        }
        console.log($("div.inline-comment-form", obj));

        $("div.previewable-edit", obj).append(`
                     <div>
                            <input style="width:100px;" type="text" class="iqb-searchBox"/>
                            <div id="iqb-searchBoxResults"></div>
                            <button class="iqb-close">[Closed]</button>
                    </div>
                `)
    })



    myjQuery('body').on("click", "button.review-thread-reply-button", function (e) {
        let obj = $(e.target).parents("tr.js-inline-comments-container");
        if (!obj.length){
            obj = $(e.target).parents("div.TimelineItem");
        }
        console.log($("div.inline-comment-form", obj));
        $("div.inline-comment-form", obj).append(`
                     <div>
                            <input style="width:100px;" type="text" class="iqb-searchBox"/>
                            <div id="iqb-searchBoxResults"></div>
                            <button class="iqb-close">[Closed]</button>
                    </div>
                `)
    })


    console.error("github-checks")
    myjQuery("body").on("keypress", "input.iqb-searchBox", (event) => {
        if (event.charCode == 13) {
            let searchValue = event.currentTarget.value;
            console.log(event);
            console.log("search for " + searchValue);
            let result = [];
            Object.keys(rules).forEach(k => {
                if (rules[k].match(new RegExp(searchValue, "gi"))) {
                    result.push(`[${k}] ${rules[k]}`);
                }
            });

            /* myjQuery("body").on("click","button.CP",e=>{
                 window.prompt('Ctrl+C, Enter', e.target.nextElementSibling.innerText); return false;
             })*/

            let response = result.join("<br/>");
            myjQuery("textarea", $(event.target.parentElement.parentElement)).val(response)

            console.log(response)
            /*myjQuery("#iqb-searchBoxResults", $(this.parent)).html(
                "<button class='CP'>CP</button>"
                + "<div>" + response + "</div>");*/

            console.log($("#searchBoxResults").innerHTML)
            console.log($("#searchBoxResults"))
        }
    });

});

