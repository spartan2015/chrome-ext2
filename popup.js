console.log("LOADING IQB");
const authKey = "authorization";

function hasNoAuth() {
    return localStorage[authKey] === undefined
}

$(document).ready(function () {

    if (hasNoAuth()) {
        let user = prompt("username");
        let pass = prompt("pass");
        localStorage[authKey] = btoa(`${user}:${pass}`)
    }

    $.ajaxSetup({
        headers: {
            Authorization: `Basic ${localStorage[authKey]}`
        }
    });

    console.log("IQB - LOADED");
    let log = function (data) {
        $('.requestsLog').append(`<div>${data}</div>`)
    }
    document.getElementById('qeApprove').addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            var key = tab.url.substr(tab.url.lastIndexOf('/') + 1);

            log("QE approve " + key)
            $.post("http://pa-qe-jirawf-api-prod.private.central-eks.aureacentral.com/comments?action=approve&issueKey=" + key, function (data) {
                log(data);
            }).fail(function(error) {
                log( "error" );
              log( JSON.stringify( error) )
            })
        });
    }, false);

    document.getElementById('qeComment').addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            var key = tab.url.substr(tab.url.lastIndexOf('/') + 1);

            log("QE Comment " + key)
            $.post("http://pa-qe-jirawf-api-prod.private.central-eks.aureacentral.com/comments?action=rejectComments&issueKey=" + key, function (data) {
                log(data);
            }).fail(function(error) {
                log( "error" );
              log( JSON.stringify( error) )
            })
        });
    }, false);

    document.getElementById('qeReject').addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            var key = tab.url.substr(tab.url.lastIndexOf('/') + 1);

            log("QE Reject " + key)
            $.post("http://pa-qe-jirawf-api-prod.private.central-eks.aureacentral.com/comments?action=reject&issueKey=" + key, function (data) {
                log(data);
            }).fail(function(error) {
                log( "error" );
              log( JSON.stringify( error) )
            })
        });
    }, false);
});