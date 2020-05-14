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


function getHtmlLink(href, name){
    return `<a target="_blank" href="${href}">${name}</a>`;
}
    document.getElementById("e2eCheck").addEventListener('click', function ()    {
        let key = $(".issue-link").attr("data-issue-key");
        //window.open(`http://private.central-eks.aureacentral.com/pca-qe/api/review/${key}`);
        let e2eCheckUrl = `https://localhost/get?url=https://private.central-eks.aureacentral.com/pca-qe/api/review/${key}`;
        log(getHtmlLink(e2eCheckUrl,'E2E'))

        let e2ePromise = new Promise((resolve,reject)=>{
            $.get(e2eCheckUrl).then(data => {
                log("got data for e2e")
                console.log(data);
                try {
                    data = JSON.parse(data);
                    data.result.forEach(group => {
                        group.assertions.forEach(assertion => {
                            if (assertion.result == "FAIL") {
                                log(`failed assertion: ${assertion.description}`);
                            }
                        })
                    })
                    log("1. done E2E analysis");
                    resolve();
                }catch(e){
                    reject()
                    log("failed parsing: ", JSON.stringify(e))
                    console.log(e);
                    log(getHtmlLink(e2eCheckUrl,'E2E'));
                }
            }).fail(
                (x, h, r) => {
                    reject()
                    log("ERROR E2E QE REVIEW ENDPOINT", x, h, r);
                    console.log(x, h, r);
                    log(getHtmlLink(e2eCheckUrl,'E2E'));
                }
            );
        });


        let docs = [];
        let promises = [];
        promises.push(e2ePromise);

        jQuery("a[href*=confluence]")
            //.filter(":contains('Environment')")
            .each((index, link) => {
                let url = link.href;
                let encodedUrl = encodeURIComponent(url);
                let checkYamlUrl = `https://private.central-eks.aureacentral.com/pca-qe/api/ticketservice/envDs/yaml?url=${encodedUrl}`;
                //window.open(checkYamlUrl);
                log(getHtmlLink(checkYamlUrl,'Yaml'))
                promises.push(
                    $.get(checkYamlUrl)
                        .then((data) => {
                            try {
                                let doc = jsyaml.load(data);
                                docs.push(doc);
                            } catch (e) {
                                log("failed loading doc, check console " + getHtmlLink(checkYamlUrl,'Yaml'));
                                log(e);
                                console.log(checkYamlUrl)
                            }
                        })
                       .catch(function (e) {
                           log("error loading yaml" + getHtmlLink(checkYamlUrl,'Yaml'));
                           console.log(e);
                       })
                );
                /*promises.push(
                    $.get("https://localhost:443/get?url=" + encodedUrl)
                        .then((data, s, x) => {
                            getBody(encodedUrl, data).then(body=>{
                                let div = document.createElement("div");
                                div.innerHTML = body;
                                let code = div.innerText.replace(/↵/g, "\n");

                                try {
                                    let doc = jsyaml.load(code);
                                    docs.push(doc);
                                } catch (e) {
                                    log("failed loading doc, check console");
                                    log(e);
                                    console.log(body)
                                }
                            });
                        }).catch(function (xhr) {
                        log("error loading xhr");
                        console.log(xhr)
                    }));*/
            })

        Promise.all(promises).then(r => {
            analyzeReferences(docs);
            log("2. ANALYSIS DONE")
        })

    }, false);

    //attach('GET','check e2e', "e2eCheck", 'https://private.central-eks.aureacentral.com/pca-qe/api/review/${key}&jiraUser=${jiraUser}')

    function getBody(title, content) {
        test = content;    // to eliminate case sensitivity
        let x = test.indexOf("<pre class=\"syntaxhighlighter-pre\"");
        let y = -1;
        let p = new Promise((resolve,reject)=>{
            if (x == -1) {
                let encodedUrl = title;
                let checkYamlUrl = `https://private.central-eks.aureacentral.com/pca-qe/api/ticketservice/envDs/yaml?url=${encodedUrl}`;
                $.get(checkYamlUrl).then(d=>resolve(d)).fail(e=>log(e));
                /* let startBlock = `<div id="main-content" class="wiki-content">`;
                 x = test.indexOf(startBlock);
                 if (x < 0) {
                     log(`Could not find page start codeblock for ${title}. Aborting`);
                     return "";
                 }
                 x = x + startBlock.length;
                 y = test.indexOf("</div>↵↵        <!--↵<rdf")
                 return content.slice(x + 1, y);*/
            } else {
                /*var y = test.lastIndexOf(`</pre>
                    </div></div>`);*/
                y = test.lastIndexOf(`</pre>\n</div></div>`);
                /*   if (!y)
                       y = test.lastIndexOf(`</pre>\n\r</div></div>`);*/
                if (!y) {
                    log("COULD NOT FIND END OF DATA for: " + title);
                    return ""
                }
                resolve(content.slice(x, y));
            }
        });

        return p;
    }

    function analyzeReferences(docs) {
        let map = {};
        let e2eStepsText = jQuery("div#description-val").get(0).innerText;
        e2eStepsText.match(/"[^"]+"/g).forEach(e => map[e.replace(/"/g, "")] = "");
        let vars = Object.keys(map);
        let environment;
        docs.forEach(
            doc=>{
                if (doc.environments) {
                    environment = doc.environments[0];
                }
        });
        let credential;
        docs.forEach(
            doc=>{
                if (doc.environments && doc.environments.endpoints){
                    let endpoints = doc.environments.endpoints;
                    if (!Array.isArray(endpoints) || !endpoints[0].name || !endpoints[0].type){
                        log(`invalid endpoints definition. Must be:
                         <pre>{noformat}endpoints:
\t- name: # variable name for the endpoint
\t  description: # optional, what is the purpose of the endpoint
\t  type: # http, RDP, VNC, ssh, selenium, mysql, sqlserver, postgresql, derby, oracle, db2, tcp, other
{noformat}</pre>
                        `);
                    }
                }

                if (doc.credentials) {
                    if (!Array.isArray(doc.credentials) || doc.credentials.some(c=> !c.name || !c.type)){

                        log(`invalid env ds structure definition for credentials. Recommended format is: 
                        <pre>{noformat}credentials:
\t- name: # credentials id (name)
\t  type: # token, basic, sshkey, awscreds, other
\t  # if (type == basic)
\t  username: # username
\t  password: # password
\t  # endif (type == basic){noformat}</pre>
`)
                    }
                    log("What we found is " +JSON.stringify(doc.credentials));
                    credential = doc.credentials[0];
                }


                if (doc.variables){
                    if (Array.isArray(doc.variables)){
                        log("invalid env ds structure for variables definition. should be: " + `<pre>{noformat}variables:
                        \t# key-value pairs which define product-wide data{noformat}</pre>
`
                        )
                    }
                }

                if (doc.selectors){
                    if (Array.isArray(doc.selectors)){
                         if (!doc.selectors[0].group || !doc.selectors[0].selectors){
                             log("invalid env ds structure for selectors definition. should be: " + `<pre>{noformat}selectors:
\t- group: # group name, recommended to split selectors based on web page or application window
\t\t   # at least one group should be defined
\t  selectors:
# key-value pairs which define product-wide XPath selectors
</pre>
`)
                             log("What we found is " +JSON.stringify(doc.selectors[0]));
                         }
                    }
                }
            });



        vars.forEach(variable => {
            let found = false;
            docs.forEach(doc => {
                if (found) {
                    return
                }
                if (!doc) return;
                //variable.split(".")

                let workVar = "";
                let match = variable.match(/{([^}]+)}/);
                if (!match)
                    workVar = variable
                else{
                    workVar = match[1];
                }


                //environment.<endpoint-name>.URL
                if (workVar.startsWith("environment")) {
                    let path = workVar.split(".").slice(1);

                    if (!environment && doc.environments) {

                       /* doc.environments.forEach(env => {
                            if (env.name == path[0]) { // not true
                                environment = env;
                            }
                        })*/

                       if (environment){
                           if (!found) found = exists(path,environment.endpoints);
                       }else{
                           if (doc.environments) {
                               doc.environments.forEach(env => {
                                   if (!found) {
                                       found = exists(path, env.endpoints);
                                   }
                               })
                           }
                       }
                    }

                } else if (workVar.startsWith("credential")) {
                    let path = workVar.split(".").slice(1);
                    if (!found) found = exists(path,credential)
                    if (!found) found = exists(workVar, doc);
                } else if (workVar.startsWith("endpoint")) {
                    let path = workVar.split(".")
                    if (!environment) {
                        log("searching for " + workVar + " but no env set");
                    }
                    if (!found) found = exists(path, environment);
                } else {
                    let path = workVar.split(".")
                    if (!found) found = exists(path, environment)
                    if (!found) found = exists(path, doc.variables)
                    if ((!found) && Array.isArray(doc.selectors )){
                        doc.selectors.forEach(selector=>{
                            found = exists(path, selector.selectors)
                        })
                    }
                    if (!found) found = exists(path, doc.selectors)
                    if (!found) found = exists(path, doc)
                }

            });

            if (!found)
                found = e2eStepsText.match(new RegExp(`"${variable}" as "`,'gi')  );
            // Given "<variable>" value is "<value>"
            if (!found)
                found = e2eStepsText.match(new RegExp(`"${variable}" value is "`),'gi');

            //I set header "<header>" to "<value>" [in "<http driver instance id>"]
            if (!found)
                found = e2eStepsText.match(new RegExp(`set.+"${variable}" to +"`,'gi'));

            if (!found)
                found = e2eStepsText.match(new RegExp(`"${variable}" should be +"`,'gi'));

            if (!found) {
                log(`not found in yaml definitions: ${variable}`);
            }


        })
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





