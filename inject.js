console.log("LOADING IQB");

const authKey = "authorization";
const jiraUserKey = 'jiraUser';

function hasNoAuth() {
    return localStorage[authKey] === undefined
}

function getLocalStorageElement(key) {
    if (!localStorage[key]) {
        localStorage[key] = prompt(`provide ${key}`);
    }
    return localStorage[key];
}


$(document).ready(function () {

    console.log("IQB - LOADED");
    let log = function (data) {
        $('.requestsLog').append(`<div>${data}</div>`)
    }

    if (hasNoAuth()) {
        let user = prompt("username");
        let pass = prompt("pass");
        localStorage[authKey] = btoa(`${user}:${pass}`)
    }

    $.ajaxSetup({
        headers: {
            Accept: "application/json,text/html",
            Authorization: `Basic ${localStorage[authKey]}`
        }
    });


    /*
    https://docs.google.com/document/d/1VPA99yebFMqM1FLwn7GHuTXlpR7RqDVbmZM6035WzQI/edit#heading=h.i35a9q1rqui4
    */

    $('.aui-toolbar2-primary').append(`
        <div>
            <button id="assignMe">AssignMe</button>
            <button id="assignDiaz">AssignDiaz</button>
            <br/>
            <button id="crApprove">CR Approve</button>
            <br/>
            <button id="auApprove">AU Approve</button>
        </div>

      <div>My Checks:
        <button id="e2eCheck">E2E</button>
        <button id="qeCheckFQA">Check FQA</button>
        <button id="qeCheckAU">Check AU</button>
        <button id="qeCheckFSTC">Check FSTC</button>
        <button id="qeCheckCR">Check CR-Defect</button>
      </div>
            
      <div>FQA Review</div>
      <div>
         <button id="fqaApprove">Approve</button>
         <button id="fqaReject">Reject</button>
      </div>
                    
      <div>QE Review</div>
        <div>
            <button id="qeApprove">Approve</button>
            <button id="qeComment">Comment</button>
            <button id="qeReject">Reject</button>
        </div>

        <div>AU Review</div>
        <div>
            <button id="auApprove">Approve</button>            
            <button id="auReject">Reject</button>
        </div>

        <div>Epic Review</div>
        <div>
            <button id="epicApprove">Approve</button>
            <button id="epicReject">Reject</button>
        </div>
        
         <div>Extension</div>
         <div>
            <button id="resetAuth">ResetAuth</button>
            <div class="requestsLog"></div>
        </div>
`)
    /*
        $( document ).ajaxError(function(jqXHR, textStatus, errorThrown) {
            log(jqXHR.responseText);
            log('Error occurred: '+ jqXHR.statusText + ' ' + jqXHR.status);
            log(jqXHR.responseJSON)
        });*/
    $.postJSON = function (url, data, callback) {
        return jQuery.ajax({
            'type': 'POST',
            'url': url,
            'contentType': 'application/json',
            'data': JSON.stringify(data),
            'dataType': 'text',
            'success': callback
        });
    };

    document.getElementById("resetAuth").addEventListener('click', function () {
        delete localStorage[authKey];
    }, false);

    function attach(method, actionName, elementId, endpointPattern) {
        document.getElementById(elementId).addEventListener('click', function () {
            let key = $(".issue-link").attr("data-issue-key");
            endpointPattern = endpointPattern.replace("${key}", key)
            endpointPattern = endpointPattern.replace("${jiraUser}", getLocalStorageElement(jiraUserKey));
            log(actionName + ": " + key);
            let prefix = '';
            if (!endpointPattern.startsWith("http")) {
                prefix = 'https://pa-qe-jirawf-api-prod.private.central-eks.aureacentral.com';
            }

            if (method == 'GET') {
                $.get(`${prefix}${endpointPattern}`, function (data) {
                    log(data);
                }).fail(function (xhr) {
                    log("error");
                    console.log(xhr)
                })
            } else {
                $.postJSON(`${prefix}${endpointPattern}`, function (data) {
                    log(data);
                }).fail(function (xhr) {
                    log("error");
                    console.log(xhr)
                })
            }

        }, false);
    }

    function getBody(title, content)
    {
        test = content;    // to eliminate case sensitivity
        var x = test.indexOf("<pre class=\"syntaxhighlighter-pre\"");
        if(x == -1) return "";

        x = test.indexOf(">", x);
        if(x == -1) return "";

        var y = test.lastIndexOf(`</pre>
            </div></div>`);
        var y = test.lastIndexOf(`</pre>\n</div></div>`);
     /*   if (!y)
            y = test.lastIndexOf(`</pre>\n\r</div></div>`);*/

        if (!y) {
            console.log("COULD NOT FIND END OF DATA for: " + title);
        }

        return content.slice(x + 1, y);
    }

    document.getElementById("e2eCheck").addEventListener('click', function () {
        let key = $(".issue-link").attr("data-issue-key");
        //window.open(`http://private.central-eks.aureacentral.com/pca-qe/api/review/${key}`);
        let e2eCheckUrl = `https://private.central-eks.aureacentral.com/pca-qe/api/review/${key}`;
        $.getJSON(e2eCheckUrl).then(data=>{
            JSON.stringify(data).match("FAIL").forEach(g=>log("FAIL REVIEW: " + e));
        }).fail(
            (x,h,r)=>{
                log("ERROR E2E QE REVIEW ENDPOINT", x,h,r);
                console.log(x,h,r);
                log(e2eCheckUrl);
            }
        );

        let docs = [];
        let promises = [];
        jQuery("a[href*=confluence]")
            //.filter(":contains('Environment')")
            .each((index, link) => {
                let url = link.href;
                let encodedUrl = encodeURIComponent(url);
                let checkYamlUrl = `https://private.central-eks.aureacentral.com/pca-qe/api/ticketservice/envDs/yaml?url=${encodedUrl}`;
                //window.open(checkYamlUrl);

                promises.push(
                    $.get("https://localhost:443/get?url="+encodedUrl)
                    .then((data,s,x) => {
                    let div = document.createElement("div");
                    div.innerHTML = getBody(encodedUrl, data);

                    let code = div.innerText.replace(/↵/g,"\n");

                    try {
                        let doc = jsyaml.load(code);
                        docs.push(doc);
                    } catch (e) {
                        log("failed loading doc");
                        log(e);
                        log(data);
                    }
                }).catch(function (xhr) {
                    log("error loading xhr");
                    console.log(xhr)
                }));
            })

        Promise.all(promises).then(r => {
            analyzeReferences(docs);
            log("ANALYSIS DONE")
        })

    }, false);

    //attach('GET','check e2e', "e2eCheck", 'https://private.central-eks.aureacentral.com/pca-qe/api/review/${key}&jiraUser=${jiraUser}')

    function analyzeReferences(docs) {
        let map = {};
        jQuery("div#description-val").get(0).innerText.match(/"[^"]+"/g).forEach(e => map[e.replace(/"/g, "")] = "");
        let vars = Object.keys(map);
        let environment = null;
        vars.forEach(variable => {
            let found = false;
            docs.forEach(doc => {
                if (found){
                    return
                }
                if (!doc) return;
                //variable.split(".")
                let workVar = variable
                    .replace("$", "")
                    .replace("{", "")
                    .replace("}", "");
                if (workVar.startsWith("environment")) {
                    let path = workVar.split(".").slice(1);
                    if (exists(path, doc.environments)) {
                        found = true;
                        if (doc.environments){
                            doc.environments.forEach(env=>{
                                if (env.name == path[0]){
                                    environment = env;
                                }
                            })
                        }
                    }
                } else if (workVar.startsWith("endpoint")) {
                    let path = workVar.split(".")
                    if (!environment)
                    {
                        log("searching for " + workVar + " but no env set");
                    }
                    found = exists(path, environment);

                } else {
                    let path = workVar.split(".")
                    if (!found) found = exists(path, environment)
                    if (!found) found = exists(path, doc.variables)
                    if (!found) found = exists(path, doc.selectors)
                    if (!found) found = exists(path, doc)
                }

                if (doc && doc.selectors && !Array.isArray(doc.selectors)){
                    log("no group in selectors found but selectors found")
                }
            });
            if (!found) {
                log(`var not found: ${variable}`);
            }


        })
    }

    function exists(path, object) {
        if (!object) return false;
        if (Array.isArray(object)) {
            return object.some(item => {
                return (item['name'] == path[0].trim() || item['group'] == path[0].trim()
                ) && (path.length == 1 || exists(path.slice(1), item));
            })
        } else {
            return object.hasOwnProperty(path[0].trim()) && (path.length == 1 || exists(path.slice(1), object[path[0]]));
        }
    }

    attach('GET', 'assignMe', "assignMe", 'http://localhost:3000/assign?key=${key}')
    attach('GET', 'assignDiaz', "assignDiaz", 'http://localhost:3000/assign?key=${key}&toUser=dsaldiaz')
    attach('GET', 'crApprove', "crApprove", 'http://localhost:3000/cr-approve?key=${key}')
    attach('GET', 'auApprove', "auApprove", 'http://localhost:3000/au-approve?key=${key}')


    attach('GET', 'check fqa', "qeCheckFQA", '/check/aufeaturereview?issueKey=${key}&jiraUser=${jiraUser}')
    attach('GET', 'check au', "qeCheckAU", '/check/audocreview?issueKey=${key}&jiraUser=${jiraUser}')
    attach('GET', 'check fstc', "qeCheckFSTC", '/check/auepicreview?issueKey=${key}&jiraUser=${jiraUser}')
    attach('GET', 'check cr', "qeCheckCR", '/check/codereview?issueKey=${key}&jiraUser=${jiraUser}')

    attach('POST', 'approve cr', "qeApprove", '/comments?action=approve&issueKey=${key}&jiraUser=${jiraUser}')
    attach('POST', 'comment cr', "qeComment", '/comments?action=rejectComments&issueKey=${key}&jiraUser=${jiraUser}')
    attach('POST', 'reject cr', "qeReject", '/comments?action=reject&issueKey=${key}&jiraUser=${jiraUser}')

    attach('POST', 'fqa au', "fqaApprove", '/comments?action=approve&issueKey=${key}&jiraUser=${jiraUser}')
    attach('POST', 'fqa au', "fqaReject", '/comments?action=reject&issueKey=${key}&jiraUser=${jiraUser}')


    attach('POST', 'approve au', "auApprove", '/comments?action=approve&issueKey=${key}&jiraUser=${jiraUser}')
    attach('POST', 'reject au', "auReject", '/comments?action=reject&issueKey=${key}&jiraUser=${jiraUser}')

    attach('POST', 'approve epic', "epicApprove", '/comments?action=approve&issueKey=${key}&jiraUser=${jiraUser}')
    attach('POST', 'reject epic', "epicReject", '/comments?action=reject&issueKey=${key}&jiraUser=${jiraUser}')


})

