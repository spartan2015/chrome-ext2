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
                if (element.startsWith("P1")) {
                    let val = $(`tr:contains(${word})`, parent).css("background-color", 'green')
                    if (!val.length) {
                        log(word)
                        notFound = true
                    }
                } else {
                    let val = $(`td:contains(${word})`, parent).css("background-color", "green")
                    if (!val.length) {
                        log(word)
                        notFound = true
                    }

                }
            });
        })

    }

    function log(word) {
        let parent = document.querySelector("div.iqb-not-found")
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
        Rejection reason: mapped item not present in description: 
    </div>  
    <button class="iqb-cp" onclick="window.prompt('Copy to clipboard: Ctrl+C, Enter', document.querySelector('div.iqb-not-found').innerText); return false;">CP</button>
    <button class="iqb-reject">Reject</button>
    <button class="iqb-approve">Approve</button>
`);

    $("button.iqb-reject").click(function () {
        var key =  getJiraTicket();
        var xhr = new XMLHttpRequest;

        let sheets = $("span[title^=FSReview_] a");
        let sheetLink = $(sheets.get(sheets.length-1)).attr("href")

        xhr.addEventListener("error", function (error) {
            alert('Error executing: ' + JSON.stringify(xhr));
        });
        let message = `(x) [QE FQA Review|${sheetLink}]
        
        |FS title, description and other fields are coherent with feature story scope (defined by the mapping)\t|no|\t${document.querySelector('div.iqb-not-found').innerText}|
        `;
        console.log(message)
       /xhr.open('GET', 'http://localhost:3000/fs-reject?key=' + key +"&message="+encodeURIComponent(message), true);
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
