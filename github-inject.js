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
            "Magic values are not used. https://confluence.devfactory.com/pages/viewpage.action?pageId=328474827"
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
        "5k-sococo": [
            "Merge the code when done"
        ],
        "devfactory-codeserver-framework": [
            "LOTS OF PCA REJECTIONS - CHECK checklist PCA rules always!",
            "method visibility order",
            "one SECRET per qa env"
        ],
        "aurea-jivecloud-jivedaily-reactnative": [
            "Allows dangling comma"
        ],
        "jive-cloud-application": [
            `Amazon AWS service wrappers - Configure an AWS service The AWS Service wrapper client Using the service client Re-configure at runtime Close the client if feature disabled`,
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
        ],
        "jive-mobile-graphql": [
            `Rules for code: https://docs.google.com/document/d/1kWcAAst8Ith7gldyo-IyL_wXbG9WQeOcxvMIFWIEaLQ/edit#heading=h.4rfapmbadyt`,
            `one handler per file - same file name as handler name and handler[type.field]`,
            `request resolver: type.field.request.vtl`,
            `response resolver: type.field.response.vtl`,
            `tf: resolver.type.field.tf`,
            `all non root query handlers must be batch resolvers`,
            `Type.graphql`,
            `every non primitive field must have normalizer but you can use a generic normalizer (addGenericNormalizers(){ addGenericNormalizer(entityTyoes.Blog.graphqlName,...)}`,
            `normalizers in utils/fieldNormalizers`,
            `normalizer should have Type.js naming convention`,
            `normalizer should call parent normalizer`,
            `@Depprecated fields are excluded`,
            `implement handle in single function - do not extract: common.addHandler(__filename, async requestContext=>{ ....})`,
        ]
    }

    let parts = window.location.href.match("https://github.com/([^/]+)/([^/]+)/pull/([^/]+)(/files)?")
    let user = parts[1]
    let repoName = parts[2]
    let no = parseInt(parts[3])

    function isJive() {
        return repoName == "jive-cloud-application";
    }

    function isCodeServer() {
        return repoName == "devfactory-codeserver-framework";
    }

    function isJiveMobile() {
        return repoName == "jive-mobile-graphql";
    }

    let rulesString = lookoutFor[repoName] ? lookoutFor[repoName].map(e => `<li>${e}</li>`).join("") : ""
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


    function applyCloseButtons() {

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
                    "Accept": "application/vnd.github.v3+json",
                    "Authorization": "Basic " + btoa(getLocalStorageElement("gpu") + ":" + getLocalStorageElement("gpa")),
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({body: `${comment} [closed]`}),
                dataType: "json",
                contentType: "application/json",
                success: function (data, textStatus, jQxhr) {
                    myjQuery(e.target).append("Done")
                    commentElement.append("<div>[Closed]</div>")
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    $.ajax({
                        url: `https://api.github.com/repos/${user}/${repoName}/pulls/${no}/comments/${commentId}/replies`,
                        type: "POST",
                        headers: {
                            "Accept": "application/vnd.github.v3+json",
                            "Authorization": "Basic " + btoa(getLocalStorageElement("gpu") + ":" + getLocalStorageElement("gpa")),
                            "Content-Type": "application/json"
                        },
                        data: `{"body": "${comment} [closed]"}`,
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data, textStatus, jQxhr) {
                            myjQuery(e.target).append("Done")
                            commentElement.append("<div>[Closed]</div>")
                        },
                        error: function (jqXhr, textStatus, errorThrown) {
                            myjQuery(e.target).append("Error")
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
            type: "POST",
            headers: {
                "Accept": "application/vnd.github.v3+json",
                "Authorization": btoa(getLocalStorageElement("gpu") + ":" + getLocalStorageElement("gpa"))
            },
            data: {body: `${comment} [closed]`},
            dataType: "json"
        })

    })

    $("div.pr-toolbar").append("<button class='iqb-find-public'>Find Public Test</button>")

    $("div.pr-toolbar").append("<button class='iqb-find-public'>AppendCloseButtons</button>")
    $("button.iqb-find-public").click(function (e) {
        applyCloseButtons();
    })

    function wildCardsInPackageJson() {
        myjQuery("div.file div.file-header[data-path*='package.json']").parents("div.file").find("span.blob-code-inner[data-code-marker='+']")
            .each((i, e) => {
                let targetElement = myjQuery(e);
                let wildCard = e.innerText.match(/[\^~*]+/);
                if (wildCard) {
                    targetElement.css("background-color", "lightpink")
                    targetElement.append("<div class='iqb-error'>[28] Flexible dependency versions are not used (except JVCLD projects - minor allowed).</div>")
                    targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
                }
            })
    }

    function checkCommitName() {
        let targetElement = $("span.js-issue-title");
        let match = targetElement.text().match("[A-Z0-9]+-[0-9]+.+");
        if (!match) {
            targetElement.css("background-color", "lightpink")
            targetElement.append("<div class='iqb-error'>[43] PR title must match JIRA-KEY description</div>")
        }
    }

    function isJsOrJava(e) {
        let targetElement = myjQuery(e);
        let where = targetElement.parents("div.file").find("div.file-header").attr("data-path");
        let file = where ? where.substr(where.lastIndexOf("/") + 1) : where;
        return ["js,ts,java"].find(s => file && file.endsWith(s));
    }

    function magicNumbers(e) {
        if (!isJsOrJava(e)) {
            return;
        }
        let targetElement = myjQuery(e);
        let wildCard = !e.innerText.match(/let|const|require|\.log|\.debug|\.warn|throw Error\(|\} from|@Lambda|import \{/) && (e.innerText.match(`'.+'`) || e.innerText.match(`".+"`))
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[33] Magic values are not used. https://confluence.devfactory.com/pages/viewpage.action?pageId=328474827</div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function noConsoleOnFrontend(e) {
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.match(/console\.log|console\.error/) && !isLambdaFile(e);
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[47]\tNo console logs are found on javascript-based code, that are visible/available to end users</div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function oneSecret(e) {
        if (!isCodeServer()) return;
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.match(/secret/gi);
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[43] add one secret per env (dev,qa,etc)</div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function noLogWarnOrDebug(e) {
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.indexOf("log.warn") >= 0 || e.innerText.indexOf("log.debug") >= 0
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[43] log warn or debugged only if absolutely necessary</div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function alertMethodInProduction(e) {
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.indexOf("alert(") >= 0
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[18] avoid using alert method in production</div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function emptyString(e) {
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.indexOf('==""') >= 0
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[43] empty string or null use StringUtils.defaultString</div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    //EqualsVerifier.forClass() is used, it is configured with .suppress(Warning.ALL_FIELDS_SHOULD_BE_USED)
    function equalsVerifierWithSuppress(e) {
        if (isJive()) {
            let targetElement = myjQuery(e);
            let wildCard = e.innerText.indexOf("EqualsVerifier.forClass") != -1;
            if (wildCard) {
                targetElement.append("<div class='iqb-error'>[43] CHECK manually that EqualsVerifier.forClass() is used, it is configured with .suppress(Warning.ALL_FIELDS_SHOULD_BE_USED)</div>")
                targetElement.css("background-color", "lightpink")
                targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            }
        }
    }

    function emptyCollection(e) {
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.indexOf('.size()\s*==\s*0') >= 0 || e.innerText.indexOf('.length\s*==\s*0') >= 0
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[43] empty collection ListUtils.emptyIfNull ||  CollectionUtils.emptyIfNull ||  ArrayUtils.nullToEmpty </div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function extendingJiveExceptions(e) {
        if (isJive()) {
            let targetElement = myjQuery(e);
            let wildCard = e.innerText.match("class.+Exception")
            if (wildCard) {
                targetElement.append("<div class='iqb-error'>[43] Whenever possible create your exception based on the existing JiveException (checked) and JiveRuntimeException (unchecked).</div>")
                targetElement.css("background-color", "lightpink")
                targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            }
        }
    }

    function commentedCode(e) {
        if (isJive()) {
            let targetElement = myjQuery(e);
            let wildCard = e.innerText.indexOf("//") >= 0 &&
                !(
                    e.innerText.indexOf("Assert") >= 0
                    || e.innerText.indexOf("Act") >= 0
                    || e.innerText.indexOf("Arrange") >= 0
                )
            if (wildCard) {
                targetElement.append("<div class='iqb-error'>[35] There is no commented code</div>")
                targetElement.css("background-color", "lightpink")
                targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            }
        }
    }

    function loggerJive(e) {
        if (isJive()) {
            let targetElement = myjQuery(e);
            let wildCard = e.innerText.match("Logger")
            if (wildCard) {
                targetElement.append("<div class='iqb-error'>[43] Whenever you create a new class, always choose SLF4J. We prefer to use \"log\" instead of \"logger\", \"LOGGER\" or \"LOG\". Please do the same. From time to time you might want that the logger is not \"private static\", in that case please drop a comment on it explaining why.</div>")
                targetElement.css("background-color", "lightpink")
                targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            }
        }
    }

    function parameterizedLogging(e) {
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.match("log\..+\\+.+")
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[43] Use parameterized logging only. no string concat</div>")
            targetElement.css("background-color", "lightpink")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
        }
    }


    function rethrowExceptions(e) {
        if (isJive()) {
            let targetElement = myjQuery(e);
            let wildCard = e.innerText.match("throw .+")
            if (wildCard) {
                targetElement.append("<div class='iqb-error'>[43] When rethrowing exceptions, if appropriate wrap them with JiveException or JiveRuntimeException.</div>")
                targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
                targetElement.css("background-color", "lightpink")
            }
        }
    }

    function rethrowExceptions(e) {
        if (isJive()) {
            let targetElement = myjQuery(e);
            let wildCard = e.innerText.match("throw .+")
            if (wildCard) {
                targetElement.append("<div class='iqb-error'>[43] When rethrowing exceptions, if appropriate wrap them with JiveException or JiveRuntimeException.</div>")
                targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
                targetElement.css("background-color", "lightpink")
            }
        }
    }

    function interruptedException(e) {
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.indexOf("InterruptedException") >= 0
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[43] Interrupted exception - InterruptedException .. due to a thread is interrupted while waiting, sleeping or otherwise occupied thread .. you should always restore the interrupted status of the thread " +
                "        if (interrupted) {\n" +
                "            Thread.currentThread().interrupt();\n" +
                "        }</div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function noWhitebox(e) {
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.indexOf("Whitebox") >= 0 || e.innerText.indexOf("PowerMock") >= 0
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[43] no whitebox/powermock testing. cannot use Mockito's Whitebox to get and set the internal state of a static field, for that we created the com.jivesoftware.test.reflect.Whitebox </div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function noImportant(e) {
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.indexOf("!important") >= 0
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[18] avoid using !important </div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function reverseNull(e) {
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.match(/==\s*null/)
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[18] reverse null comparison</div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function useChar(e) {
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.match(/".{1,1}"/) || e.innerText.match(/"\\n"/) || e.innerText.match(/"\\r"/)
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[18] single char - use char with '' instead of string with \"\"</div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function reverseConstantComparison(e) {
        let targetElement = myjQuery(e);
        let wildCard = e.innerText.match(/==\s*\d+/) || e.innerText.match(/==\s*"/) || e.innerText.match(/!=\s*'/)
            || e.innerText.match(/!=\s*\d+/) || e.innerText.match(/!=\s*"/) || e.innerText.match(/==\s*'/)
        if (wildCard) {
            targetElement.append("<div class='iqb-error'>[18] reverse comparison with constant/literal</div>")
            targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
            targetElement.css("background-color", "lightpink")
        }
    }

    function noNewLineAtEnd() {
        let targetElement = myjQuery("svg.octicon-no-entry");
        if (targetElement) {
            let parent = targetElement.parents("td.blob-code");
            parent.append("<div class='iqb-error'>[18] add new line at end of file </div>")
            parent.append("<button class='iqb-report-error'>Report</button>")
            parent.css("background-color", "lightpink")
        }
    }

    function hasEqualsVerifier(e) {
        let targetElement = myjQuery(e);
        let wildCard = targetElement.text().match(/public boolean (equals)/) || e.innerText.match(/public int (hashCode)/)
        if (wildCard) {
            let methodName = wildCard[1];

            let where = targetElement.parents("div.file").find("div.file-header").attr("data-path");
            let file = where.substr(where.lastIndexOf("/") + 1);
            let test = isJs ?
                myjQuery(`div#files div.file div.file-header[data-path*='${fileNoExt}\.spec\.ts']`)
                : myjQuery(`div#files div.file div.file-header[data-path*='${fileNoExt}Test']`)
            let testLine = test.siblings(`div.js-file-content`).find(`span.blob-code-inner:contains(${methodName})`);
            if (testLine.length > 0) {
                testLine.append(`<a class="iqb-a" name='${fileNoExt}-line'>H</a>`)
                targetElement.append(`<a href='#${fileNoExt}-line'>[GoToLine]</a>`)
            } else {
                targetElement.append("<div class='iqb-error'>[43] must be tested with EqualsVerifier </div>")
                targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
                targetElement.css("background-color", "lightpink")
            }
        }
    }

    function jiveMobileVerify() {
        if (isJiveMobile()) {
            let request = myjQuery("div.file div.file-header[data-path*='request.vtl']");
            (existsElement(request) && matches(request,/[^\.]+\.[^\.]+\.request\.vtl/,"Must match: type.field.request.vtl")) || log("[43] did not found request.vtl file")

            let response = myjQuery("div.file div.file-header[data-path*='response.vtl']");
            existsElement((response) && matches(response,/[^\.]+\.[^\.]+\.response\.vtl/,"Must match: type.field.response.vtl")) || log("[43] did not found response.vtl file")
            existsElement(myjQuery("div.file div.file-header[data-path*='.tf']")) || log("[43] did not found terraform file")

            let resolver = myjQuery("div.file div.file-header[data-path*='resolver.']");
            (existsElement(resolver) &&
                (resolver.attr("data-path").match(/resolver\.[^\.]+\.[^\.]+\.tf/) || log(`[43] resolver tf file does not match resolver.type.field.tf: : ${resolver.attr("data-path")}`))
            ) || log(`[43] did not found resolver tf (resolver.[type].[field].tf))`)

            existsElement(myjQuery("div.file div.file-header[data-path*='.graphql']")) || log("[43] did not found graphql file")
            // TODO normalizer rule -
            // normalizers in utils/fieldNormalizers
            // normalizer should have Type.js naming convention
            // normalizer should call parent normalizer
            existsElement($("span.blob-code-inner:contains('common.addHandler')"))
            || existsElement($("span.blob-code-inner:contains('implements Handler')"))
            || log("[43] did find the handler implementation")

        }
    }
function matches(fileSelector, expression, messageError){
    if (!fileSelector || fileSelector.length ==0) return false;
    return fileSelector.attr("data-path").match(expression) || log(`[43] ${messageError}: ${fileSelector.attr("data-path")}`)
}
    function getFile(e){
        let where = $(e).parents("div.file").find("div.file-header").attr("data-path");
        let file = where.substr(where.lastIndexOf("/") + 1);
        return file;
    }

    function isLambdaFile(e){
        return getFile().indexOf("lambda")!=-1 && getFile().indexOf("backend")!=-1;
    }

    /**
     *
     * @param eq jquery selector
     * @returns {boolean|boolean}
     */
    function existsElement(eq) {
        return eq != null && eq.length >= 1
    }

    function log(m) {
        $("div.tabnav").append(`<div>${m}</div>`);
    }


    $("button.iqb-find-public").click(function (e) {

        noNewLineAtEnd();

        jiveMobileVerify()

        addIqbReportForAnalyzer();

        wildCardsInPackageJson();

        checkCommitName();

        let codeLine = myjQuery("span.blob-code-inner");//[data-code-marker='+']
        let messaged = {};

        codeLine.each((i, e) => {
            let where = $(e).parents("div.file").find("div.file-header").attr("data-path");
            let file = where.substr(where.lastIndexOf("/") + 1);

            let extension = file.substr(file.lastIndexOf(".") + 1);
            if (["java", "ts", "css", "js", "scss", "html"].indexOf(extension) == -1) {
                return;
            }
            let isJava = file.endsWith(".java");

            if (["ts", "js"].indexOf(extension) >= 0) {
                alertMethodInProduction(e);
                noConsoleOnFrontend(e);
            }
            if (["css", "scss", "html"].indexOf(extension) >= 0) {
                noImportant(e);
            }

            magicNumbers(e);
            useChar(e);
            oneSecret(e);
            reverseNull(e);
            reverseConstantComparison(e);
            commentedCode(e);
            noLogWarnOrDebug(e)
            hasEqualsVerifier(e);
            interruptedException(e)
            extendingJiveExceptions(e);
            rethrowExceptions(e);
            emptyCollection(e);
            emptyString(e);
            loggerJive(e);
            parameterizedLogging(e);

            // Test
            equalsVerifierWithSuppress(e);
            noWhitebox(e)

            let targetElement = myjQuery(e);
            let foundPublicMethod = isJava ? e.innerText.match(/public[^(]+\s(.+)\(.*/) : e.innerText.match(/public\s(.+)\(.*/);
            if (foundPublicMethod) {
                processPublicMethod(foundPublicMethod, targetElement, messaged);
            }
        })
    })

    function isTest(file) {
        return file.substring(0, file.lastIndexOf("."))
                .endsWith("Test")
            || file.endsWith(".spec.ts")
            || file.endsWith(".test.ts");
    }

    function processPublicMethod(foundPublicMethod, targetElement, messaged) {
        let methodName = foundPublicMethod[1];

        let where = targetElement.parents("div.file").find("div.file-header").attr("data-path");
        let file = where.substr(where.lastIndexOf("/") + 1);
        let isJs = file.endsWith(".ts");
        let fileNoExt = file.substring(0, file.lastIndexOf("."))
        if (isTest(file)) {
            return;
        }

        let test = isJs ?
            myjQuery(`div#files div.file div.file-header[data-path*='\.spec\.ts']`)
            : myjQuery(`div#files div.file div.file-header[data-path*='Test.java'],div#files div.file div.file-header[data-path*='IT']`)
        let testLine = test.siblings(`div.js-file-content`).find(`span.blob-code-inner:contains('.${methodName}(')`);

        let expectedTestClass = isJs ? `${fileNoExt}.spec.ts` : `${fileNoExt}Test.java`;

        if (testLine.length > 0) {
            testLine.each((i, e) => {
                let targetElement = $(e);
                let whereFound = targetElement.parents("div.file").find("div.file-header").attr("data-path");
                let fileTestClass = whereFound.substr(whereFound.lastIndexOf("/") + 1);
                if (fileTestClass == expectedTestClass) {
                    testLine = targetElement;
                }
            })
        }

        targetElement.append(`<a name='iqb-method-${methodName}'></a>`);
        targetElement.append(`<span>Has test: ${test.length > 0} method found: ${testLine.length > 0}</span>`);
        if (test.length > 0) {

            if ($("a.iqb-a", test).length == 0) {
                test.append(`<a class="iqb-a" name='${fileNoExt}'>H</a>`)
            }
            targetElement.append(`<a target="_blank" class="iqb-open-test" href="${test.attr('data-path')}">[OpenTest]</a>`);
            targetElement.append(`<a href='#${fileNoExt}'>[GoToTest]</a>`)
            let expectedTestClass = isJs ? `${fileNoExt}.spec.ts` : `${fileNoExt}Test.java`;
            if (testLine.length > 0) {
                testLine.append(`<a class="iqb-a" name='${fileNoExt}-line'>H</a>`)
                targetElement.append(`<a href='#${fileNoExt}-line'>[GoToLine]</a>`)

                let whereFound = $(testLine).parents("div.file").find("div.file-header").attr("data-path");
                let fileTestClass = whereFound.substr(whereFound.lastIndexOf("/") + 1);

                if (fileTestClass != expectedTestClass) {
                    targetElement.append(`<div class='iqb-error'>[18] Test Found in another class: ${fileTestClass} than expected: ${expectedTestClass}</div>`);
                    targetElement.append("<button class='iqb-report-error'>ReportIqbError</button>")
                }
            } else {
                targetElement.append(`<div class='iqb-error'>[37] no new UT found for method ${methodName} while searching in ${expectedTestClass}</div>`);
                targetElement.append("<button class='iqb-report-missing-ut'>ReportMissingTest</button>")
                $("div.tabnav").append(`<div><a href="#iqb-method-${methodName}">[37]  no new UT added related to ${methodName} from ${fileNoExt} found while looking in ${fileNoExt}${isJs ? ".spec.ts" : "Test"}</a></div>`)
            }
        } else {
            let expectedTestClass = isJs ? `${fileNoExt}.spec.ts` : `${fileNoExt}Test.java`;
            targetElement.append(`<div class='iqb-error'>[37] no new UT found for method ${methodName} while searching in ${expectedTestClass}</div>`);
            targetElement.append("<button class='iqb-report-missing-ut'>Report</button>")

            if (!messaged[fileNoExt]) {
                targetElement.css("background-color", "lightpink");
                $("div.tabnav").append(`<div><a href="#iqb-method-${methodName}">[37] no unit test for ${fileNoExt} found while looking for a UT for ${methodName} of ${file}</a></div>`)
                messaged[fileNoExt] = true;
            }
        }
    }

    function addIqbReportForAnalyzer() {
        var els = $(`img[src="https://github.githubassets.com/images/icons/emoji/unicode/26a0.png"], img[src="https://github.githubassets.com/images/icons/emoji/unicode/1f6ab.png"], img[src="https://github.githubassets.com/images/icons/emoji/unicode/2757.png"]`)
        els.each((i, e) => {
            let targetElement = $(e);
            let message = targetElement.attr('title');
            let code = 51;
            //ignore some - for which we have better
            if (message.indexOf("asdasd") >= 0) {
                return;
            }

            if (message.indexOf("JS: Console.Log() in Production") >= 0) {
                code = 47;
            }

            if (message.indexOf("JS: Redundant parentheses/ braces") >= 0
                || message.indexOf("Unnecessary Braces Surrounding Annotation Parameter") >= 0
                || message.indexOf("JS: Equal Margin/ Padding using 4 values") >= 0
                || message.indexOf("JS: Object Literal Shorthand Syntax") >= 0
                || message.indexOf("Unneeded toString() Invocation") >= 0
                || message.indexOf("Redundant  \"value\" Attribute of Annotation") >= 0
                || message.indexOf("JS: Redundant async keyword") >= 0
                || message.indexOf("JS: Use Object Method Shorthand") >= 0
                || message.indexOf("Superfluous `this.`") >= 0
                || message.indexOf("Unnecessary Comparison in Boolean Expression") >= 0
                || message.indexOf("Redundant Call to \"super()\" in Constructor") >= 0
                || message.indexOf("Unnecessary Fully Qualified Name (") >= 0
            ) {
                code = 23;
            }
            if (message.indexOf("JS: Avoid loose equality/inequality") >= 0
                || message.indexOf("JS: String declaration with double quotes") >= 0
                || message.indexOf("JS: Prefer `Const` Instead of `Let` or `Var` (ES/TS/JS)") >= 0
                || message.indexOf("JS: Missing semicolon") >= 0
                || message.indexOf("JS: Formatting Spacing - ES/TS/JS: There should be no space after") >= 0
                || message.indexOf("JS: Double Quotes in @import Statements") >= 0
                || message.indexOf("JS: String concatenation to build a string") >= 0
                || message.indexOf("JS: Missing Blank Line") >= 0
                || message.indexOf("JS: Formatting Spacing - ES/TS/JS: Operator") >= 0
                || message.indexOf("JS: Formatting Spacing") >= 0
                || message.indexOf("Inconsistent Indentation and") >= 0
                || message.indexOf("Too Long Line of Code") >= 0
                || message.indexOf("Use \"L\", \"F (f)\", \"D (d)\" Suffix For \"long, float, double\"") >= 0
                || message.indexOf("JS: Redundant Blank Line") >= 0
                || message.indexOf("LOGGER / LOG / Logger / Log - Capitalized Names") >= 0
                || message.indexOf("Avoid Wildcards (*) in Imports") >= 0
                || message.indexOf("Random Blank Lines") >= 0
                || message.indexOf("Not Separated Static and Class Instance Fields") >= 0
                || message.indexOf("JS: Non Standard Naming Conventions") >= 0
                || message.indexOf("JS: Groups of imports are not delineated by blank liness") >= 0
                || message.indexOf("JS: Use Object Method Shorthand") >= 0
                || message.indexOf("JS: Avoid Nested Ternary Expressions") >= 0
            ) {
                code = 18;
            }

            if (
                message.indexOf("Unused Imports") >= 0
            ) {
                code = 22;
            }

            $(e).parents("tr").find("span.blob-code-inner").append(`<div class='iqb-error'>[${code}] ${message} https://confluence.devfactory.com/dosearchsite.action?queryString=${encodeURIComponent(message)}</div><button class='iqb-report-missing-ut'>Report</button>`);

            $(e).parents("td")
                .append(`<input id='iqb-ui-val' value='${code}' size='2' /><a class='iqb-ui-add'>Add</a>`)
                .append(`[<a class="iqb-ui-view">V</a>]`)

        });

    }

    myjQuery('body').on("click", "a.iqb-ui-view", function (e) {
        let targetElement = $(e.target);
        let message = targetElement.siblings("img").attr('title');
        let code = targetElement.siblings("input").val()

        window.open(`https://confluence.devfactory.com/dosearchsite.action?queryString=${encodeURIComponent(message)}`)
    });

    myjQuery('body').on("click", "a.iqb-ui-add", function (e) {
        let targetElement = $(e.target);
        let message = targetElement.siblings("img").attr('title');
        let code = targetElement.siblings("input").val()

        let comment = `[${code}] ${message}`;

        let lineNo = targetElement.parents("tr").find("td.blob-num.js-linkable-line-number:last").attr("data-line-number");
        let position = targetElement.find("td.blob-code").find("button.js-add-line-comment").attr("data-position");
        let path = targetElement.parents("div.file").find("div.file-header").attr("data-path");
        let href = targetElement.parents("div.file").find("details-menu.dropdown-menu-sw a:first").attr("href");
        let firstPos = href.indexOf("blob/") + 5;
        let commit_id = href.substr(firstPos, href.indexOf("/", firstPos + 1) - firstPos);

        $.ajax({
            url: `https://api.github.com/repos/${user}/${repoName}/pulls/${no}/comments`,
            type: "POST",
            headers: {
                "Accept": "application/vnd.github.comfort-fade-preview+json",
                "Authorization": "Basic " + btoa(getLocalStorageElement("gpu") + ":" + getLocalStorageElement("gpa")),
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                body: `${comment}`,
                commit_id,
                path,
                line: parseInt(lineNo),
                side: "RIGHT",
                //position: position,
                //"start_side": "RIGHT",
                //start_line: lineNo

            }),
            dataType: "json",
            contentType: "application/json",
            success: function (data, textStatus, jQxhr) {
                targetElement.append("<div>[ADDED]</div>")
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("failed to post")
            }
        })

    })

    myjQuery('body').on("click", "button.iqb-report-error", function (e) {
        let targetElement = $(e.target);

        let comment = targetElement.siblings("div.iqb-error").text();

        let lineNo = targetElement.parents("tr").find("td.blob-num.js-linkable-line-number:last").attr("data-line-number");
        let position = targetElement.parents("td.blob-code").find("button.js-add-line-comment").attr("data-position");
        let path = targetElement.parents("div.file").find("div.file-header").attr("data-path");
        let href = targetElement.parents("div.file").find("details-menu.dropdown-menu-sw a:first").attr("href");
        let firstPos = href.indexOf("blob/") + 5;
        let commit_id = href.substr(firstPos, href.indexOf("/", firstPos + 1) - firstPos);

        $.ajax({
            url: `https://api.github.com/repos/${user}/${repoName}/pulls/${no}/comments`,
            type: "POST",
            headers: {
                "Accept": "application/vnd.github.comfort-fade-preview+json",
                "Authorization": "Basic " + btoa(getLocalStorageElement("gpu") + ":" + getLocalStorageElement("gpa")),
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                body: `${comment}`,
                commit_id,
                path,
                line: parseInt(lineNo),
                side: "RIGHT",
                //position: position,
                //"start_side": "RIGHT",
                //start_line: lineNo

            }),
            dataType: "json",
            contentType: "application/json",
            success: function (data, textStatus, jQxhr) {
                targetElement.append("<div>[ADDED UT MISSING]</div>")
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("failed to post")
            }
        })

    })

    myjQuery('body').on("click", "button.iqb-report-missing-ut", function (e) {
        let targetElement = $(e.target);
        let lineNo = targetElement.parents("tr").find("td.blob-num.js-linkable-line-number:last").attr("data-line-number");
        let position = targetElement.parents("td.blob-code").find("button.js-add-line-comment").attr("data-position");
        let path = targetElement.parents("div.file").find("div.file-header").attr("data-path");
        let href = targetElement.parents("div.file").find("details-menu.dropdown-menu-sw a:first").attr("href");
        let firstPos = href.indexOf("blob/") + 5;
        let commit_id = href.substr(firstPos, href.indexOf("/", firstPos + 1) - firstPos);

        let comment = targetElement.siblings("div.iqb-error").text();

        $.ajax({
            url: `https://api.github.com/repos/${user}/${repoName}/pulls/${no}/comments`,
            type: "POST",
            headers: {
                "Accept": "application/vnd.github.comfort-fade-preview+json",
                "Authorization": "Basic " + btoa(getLocalStorageElement("gpu") + ":" + getLocalStorageElement("gpa")),
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                body: `${comment}`,
                commit_id,
                path,
                line: parseInt(lineNo),
                side: "RIGHT",
                //position: position,
                //"start_side": "RIGHT",
                //start_line: lineNo

            }),
            dataType: "json",
            contentType: "application/json",
            success: function (data, textStatus, jQxhr) {
                targetElement.append("<div>[ADDED UT MISSING]</div>")
            },
            error: function (jqXhr, textStatus, errorThrown) {
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
            textareaEl = myjQuery("textarea",
                $(event.target).parents("div.TimelineItem"));

        textareaEl
            .val(textareaEl
                .val() + " [closed]")
        textareaEl.form.submit();
    })

    myjQuery('body').on("click", "button.js-comment-edit-button", function (e) {
        let obj = $(e.target).parents("tr.js-inline-comments-container");
        if (!obj.length) {
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
        if (!obj.length) {
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

