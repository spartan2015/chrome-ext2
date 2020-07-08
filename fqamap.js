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
        if (notFound) {
            alert("not found")
        }
    }

    function log(word) {
        let parent = document.querySelector("div#description-val")
        $(parent.parentElement).append(`<div style="background-color:red">${word}</div>`)
    }

    let matrixKey = 'iqb-matrix';
    console.error("fqamap link")

    $("textarea.iqb-matrix").val(localStorage[matrixKey])

    $("div#descriptionmodule").append(`
    <textarea class="iqb-matrix" />
    <button class="iqb-matrix-set">Set</button>  
    <button class="iqb-matrix-get">Get</button>  
`);


    $("button.iqb-matrix-set").click(function () {
        let value = $("textarea.iqb-matrix").val();
        localStorage[matrixKey] = value;
        let doc = jsyaml.load(value);
        if (doc) {
            let jiraTicket = location.href.substr(location.href.lastIndexOf("/")+1);
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

