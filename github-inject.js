window.myjQuery = $;
$(document).ready(function () {
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



    let addIqbInput = function (e) {
        console.log(e.target);
        let obj = $(e.target);
        console.log($("div.inline-comment-form", obj));
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
        let textareaEl = myjQuery("textarea",
            $(event.target).parents("tr.js-inline-comments-container"));
        if (!textareaEl.length)
            textareaEl =  myjQuery("textarea",
                $(event.target).parents("div.TimelineItem"));

        textareaEl
            .val("[closed]")
        textareaEl.form.submit();
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
