$(document).ready(function () {

    function highlight(text) {
        console.error("highlight")
        let notFound = false;
        text.split("\n").forEach(e => {
            console.log("find ", e);
            let element = e.replace(/<[^>]+>/gi, '').trim();
            if (!element) {
                return
            }
            element.split("+++").forEach(i => {
                let word = i.trim();
                if (!word) {
                    return;
                }
                let parent = document.querySelector("div#description-val")
                if (element.startsWith("P")) {
                    let val = $(`tr:contains(${word})`, parent).css("background-color", 'green')
                    /*if (!val.length) {
                        logNotFoundInDescription(word)
                        notFound = true
                    }*/
                } else {
                    let val = $(`td:contains(${word})`, parent).css("background-color", "green")
                    if (!val.length) {
                        logNotFoundInDescription(word)
                        notFound = true
                    }

                }
            });
        })

    }

    function logNotFoundInDescription(word) {
        let parent = document.querySelector("div.iqb-not-found-in-description")
        $(parent).append(`<div style="background-color:red">${word}</div>`)
    }

    function logNotFoundInMapping(word) {
        let parent = document.querySelector("div.iqb-not-found-in-mapping")
        $(parent).append(`<div style="background-color:red">${word}</div>`)
    }

    let matrixKey = 'iqb-matrix';
    console.error("fqamap link")

    $("textarea.iqb-matrix").val(localStorage[matrixKey])

    $("div#descriptionmodule").append(`
    <textarea class="iqb-matrix" />
    <button class="iqb-matrix-set">Set</button>  
    <button class="iqb-matrix-get">Get</button>
    <div class="iqb-not-found">
        <div class="iqb-not-found-in-description">
        Rejection reason: mapped item not present in description:
        </div>
        <div class="iqb-not-found-in-mapping">
        Rejection reason: item present in description but not in mapping:
        </div>
    </div>  
    <button class="iqb-cp" onclick="window.prompt('Copy to clipboard: Ctrl+C, Enter', document.querySelector('div.iqb-not-found').innerText); return false;">CP</button>
    <button class="iqb-map">Map</button>
    <button class="iqb-reject">Reject</button>
    <button class="iqb-approve">Approve</button>
`);

    function getEpicKey() {
        let href= $("div#customfield_10002-val a").attr("href");
        return href.substr(href.lastIndexOf("/")+1);
    }

    $("button.iqb-map").click(function () {
        var key =  getJiraTicket();
        var xhr = new XMLHttpRequest;

        let sheets = $("span[title^=FSReview_] a");
        let sheetLink = $(sheets.get(sheets.length-1)).attr("href")

        xhr.addEventListener("error", function (error) {
            alert('Error executing: ' + JSON.stringify(xhr));
        });


        xhr.open('GET', 'http://localhost:3000/fs-mapping?key=' + key + "&epic=" + getEpicKey()  + (false ? "&full=true" : ""), true);

        xhr.addEventListener("load", function (e) {
            console.log("response text: ")
            console.log(xhr.responseText);


            try {
                var result = xhr.responseText.replace(/`/gm, "'");//.replace(/(\r\n|\n|\r)/gm, "<br/>");
                highlight(result)

                $("div#description-val table.confluenceTable tr td:first-child").each((i,e)=>{
                  let text = $(e).text();
                  let hasGreen = $(e).css("background-color") == "rgb(0, 128, 0)";
                  if (!hasGreen){
                      logNotFoundInMapping(text)
                  }
                });

            } catch (ex) {
                alert(ex);
            }


        }, false);


        xhr.send();

    });

    $("button.iqb-reject").click(function () {
        var key =  getJiraTicket();
        var xhr = new XMLHttpRequest;

        let sheets = $("span[title^=FSReview_] a");
        let sheetLink = $(sheets.get(sheets.length-1)).attr("href")

        xhr.addEventListener("error", function (error) {
            alert('Error executing: ' + JSON.stringify(xhr));
        });//(x) [QE FQA Review|${sheetLink}]
        let message = `        
        |FS title, description and other fields are coherent with feature story scope (defined by the mapping)\t|no|\t${document.querySelector('div.iqb-not-found').innerText}|
        `;
        console.log(message)
       xhr.open('GET', 'http://localhost:3000/fs-reject?key=' + key +"&message="+encodeURIComponent(message), true);
        xhr.send();

    });

    $("button.iqb-approve").click(function () {
        var key =  getJiraTicket();
        var xhr = new XMLHttpRequest;

        let sheets = $("span[title^=FSReview_] a");
        let sheetLink = $(sheets.get(sheets.length-1)).attr("href")

        xhr.addEventListener("error", function (error) {
            alert('Error executing: ' + JSON.stringify(xhr));
        });

        xhr.open('GET', 'http://localhost:3000/fs?key=' + key , true);
        xhr.send();

    });

    function getJiraTicket() {
        return location.href.substr(location.href.lastIndexOf("/") + 1);
    }

    $("button.iqb-matrix-set").click(function () {
        let value = $("textarea.iqb-matrix").val();
        localStorage[matrixKey] = value;
        let doc = jsyaml.load(value);
        if (doc) {
            let jiraTicket = getJiraTicket();
            console.log(jiraTicket);
            let fsFilter = doc.capabilities["feature-stories"].filter(e => e.jira.ticket == jiraTicket);
            if (!fsFilter.length == 1) {
                console.log(doc.capabilities.epic["feature-stories"])
                console.log(fsFilter);
            }
            let fs = fsFilter[0];

            let text = fs["tdd-references"].concat(fs["functional-requirement-references"]).join("\n")
            console.log(text);
            highlight(text);

        }
    })

    $("button.iqb-matrix-get").click(function () {
        $("textarea.iqb-matrix").val(localStorage[matrixKey])
    })

    $("textarea.iqb-matrix").val(localStorage[matrixKey])
});

