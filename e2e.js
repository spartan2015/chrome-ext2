$(document).ready(function () {

    console.error("e2e link")

    let log = function (data) {
        $('.requestsLog').append(`<div>${data}</div>`)
    }

    function getHtmlLink(href, name) {
        return `<a target="_blank" href="${href}">${name}</a>`;
    }


    $( document ).on( "click", "#e2eCheck", {}, function () {
        let key = $(".issue-link").attr("data-issue-key");
        //window.open(`http://private.central-eks.aureacentral.com/pca-qe/api/review/${key}`);
        let e2eCheckUrl = `https://localhost:8443/get?url=https://private.central-eks.aureacentral.com/pca-qe/api/review/${key}`;
        log(getHtmlLink(e2eCheckUrl, 'E2E'))

        let e2ePromise = new Promise((resolve, reject) => {
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
                } catch (e) {
                    reject()
                    log("failed parsing: ", JSON.stringify(e))
                    console.log(e);
                    log(getHtmlLink(e2eCheckUrl, 'E2E'));
                }
            }).fail(
                (x, h, r) => {
                    reject()
                    log("ERROR E2E QE REVIEW ENDPOINT", x, h, r);
                    console.log(x, h, r);
                    log(getHtmlLink(e2eCheckUrl, 'E2E'));
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
                log(getHtmlLink(checkYamlUrl, 'Yaml'))
                promises.push(
                    $.get(checkYamlUrl)
                        .then((data) => {
                            try {
                                let doc = jsyaml.load(data);
                                docs.push(doc);
                            } catch (e) {
                                log("failed loading doc, check console " + getHtmlLink(checkYamlUrl, 'Yaml'));
                                log(e);
                                console.log(checkYamlUrl)
                            }
                        })
                        .catch(function (e) {
                            log("error loading yaml" + getHtmlLink(checkYamlUrl, 'Yaml'));
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
        let p = new Promise((resolve, reject) => {
            if (x == -1) {
                let encodedUrl = title;
                let checkYamlUrl = `https://private.central-eks.aureacentral.com/pca-qe/api/ticketservice/envDs/yaml?url=${encodedUrl}`;
                $.get(checkYamlUrl).then(d => resolve(d)).fail(e => log(e));
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
        /*docs.forEach(
            doc=>{
                if (doc.environments) {
                    environment = doc.environments[0];
                }
        });*/
        let credential;
        docs.forEach(
            doc => {
                if (doc.environments && doc.environments.endpoints) {
                    let endpoints = doc.environments.endpoints;
                    if (!Array.isArray(endpoints) || !endpoints[0].name || !endpoints[0].type) {
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
                    if (!Array.isArray(doc.credentials) || doc.credentials.some(c => !c.name || !c.type)) {

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
                    log("What we found is " + JSON.stringify(doc.credentials));
                    credential = doc.credentials[0];
                }


                if (doc.variables) {
                    if (Array.isArray(doc.variables)) {
                        log("invalid env ds structure for variables definition. should be: " + `<pre>{noformat}variables:
                        \t# key-value pairs which define product-wide data{noformat}</pre>
`
                        )
                    }
                }

                if (doc.selectors) {
                    if (Array.isArray(doc.selectors)) {
                        if (!doc.selectors[0].group || !doc.selectors[0].selectors) {
                            log("invalid env ds structure for selectors definition. should be: " + `<pre>{noformat}selectors:
\t- group: # group name, recommended to split selectors based on web page or application window
\t\t   # at least one group should be defined
\t  selectors:
# key-value pairs which define product-wide XPath selectors{noformat}
</pre>
`)
                            log("What we found is " + JSON.stringify(doc.selectors[0]));
                        }
                    }
                }
            });

        let envFound;
        vars.forEach(variable => {
            let found = false;
            let workVar = "";
            let match = variable.match(/{([^}]+)}/);
            if (!match)
                workVar = variable
            else {
                workVar = match[1];
            }


            docs.forEach(doc => {
                if (found) {
                    return
                }
                if (!doc) return;
                //variable.split(".")

                //environment.<endpoint-name>.URL
                if (workVar.startsWith("environment")) {
                    let path = workVar.split(".").slice(1);

                    if (environment) {
                        if (!found)
                            found = exists(path, environment);
                        if (!found)
                            found = exists(path, environment.endpoints);

                        if (found) {
                            if (envFound && envFound != environment) {
                                log(`crossreference of: ${envFound.name} and ${env.name} for ${variable}`)
                            }
                            envFound = environment;
                        }

                    } else {
                        if (doc.environments) {
                            for (let env of doc.environments) {
                                if (!found) {
                                    found = exists(path, env.endpoints);
                                }
                                if (!found)
                                    found = exists(path, env);
                                if (found) {
                                    if (envFound && envFound != env) {
                                        log(`crossreference of: ${envFound.name} and ${env.name} for ${variable}`)
                                    }
                                    envFound = env;
                                    break;
                                }
                            }
                        }
                    }
                } else if (workVar.startsWith("credential")) {
                    let path = workVar.split(".").slice(1);
                    if (!found)
                        found = exists(path, credential)
                    if (!found)
                        found = exists(path, doc.credentials);
                } else if (workVar.startsWith("endpoint")) {
                    let path = workVar.split(".")
                    if (!environment) {
                        log("searching for " + workVar + " but no env set");
                    }
                    if (!found) found = exists(path, environment);
                } else {
                    let path = workVar.split(".")
                    if (!found)
                        found = exists(path, environment)
                    if (!found)
                        found = exists(path, doc.variables)
                    if ((!found) && Array.isArray(doc.selectors)) {
                        doc.selectors.forEach(selector => {
                            if (!found)
                                found = exists(path, selector.selectors)
                        })
                    }
                    if (!found)
                        found = exists(path, doc.selectors)
                    if (!found)
                        found = exists(path, doc)
                }

            });

            if (!found)
                found = e2eStepsText.match(new RegExp(`"${workVar}" as ["']`, 'gi'));
            // Given "<variable>" value is "<value>"
            if (!found)
                found = e2eStepsText.match(new RegExp(`"${workVar}" value is ["']`), 'gi');

            //I set header "<header>" to "<value>" [in "<http driver instance id>"]
            if (!found)
                found = e2eStepsText.match(new RegExp(`set.+["']${workVar}["'] to[ \n]+["']`, 'gi'));

            if (!found)
                found = e2eStepsText.match(new RegExp(`"${workVar}" should be +["']`, 'gi'));

            //Given "<destination_variable>" is a jsonpath selected value "<expression>" from "<source_variable>"
            if (!found)
                found = e2eStepsText.match(new RegExp(`"{?updCalculatedNodesCount}?" +is a jsonpath selected value +["']`, 'gi'))
            // jsonpath selected value "$.data.case.ixBug"
            if (!found)
                found = e2eStepsText.match(new RegExp(`"is a jsonpath selected value +["']${workVar}["']`, 'gi'))
            if (!found)
                found = e2eStepsText.match(new RegExp(`Then I put the response into +["']{?gremlinResponse}?["']`, 'gi'))

            if (!found) {
                log(`not found in yaml definitions: ${variable}`);
            }


        })
    }

})
