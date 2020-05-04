console.log("LOADING IQB");

const authKey = "authorization";

function hasNoAuth() {
    return localStorage[authKey] === undefined
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
            Accept: "application/json",
            Authorization: `Basic ${localStorage[authKey]}`
        }
    });


    /*
    https://docs.google.com/document/d/1VPA99yebFMqM1FLwn7GHuTXlpR7RqDVbmZM6035WzQI/edit#heading=h.i35a9q1rqui4
    */

    $('.aui-toolbar2-primary').append(`
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
    $.postJSON = function(url, data, callback) {
        return jQuery.ajax({
            'type': 'POST',
            'url': url,
            'contentType': 'application/json',
            'data': $.toJSON(data),
            'dataType': 'json',
            'success': callback
        });
    };

    document.getElementById("resetAuth").addEventListener('click', function () {
      delete localStorage[authKey];
    }, false);

    function attach(method,actionName, elementId, endpointPattern) {
        document.getElementById(elementId).addEventListener('click', function () {
            let key = $(".issue-link").attr("data-issue-key");
            endpointPattern = endpointPattern.replace("${key}", key)
            log(actionName + ": " + key);
            let prefix = '';
            if (!endpointPattern.startsWith("http")) {
                prefix = 'https://pa-qe-jirawf-api-prod.private.central-eks.aureacentral.com';
            }

            if (method=='GET') {
                $.getJSON(`${prefix}${endpointPattern}`, function (data) {
                    log(data);
                }).fail(function (xhr) {
                    log("error");
                    console.log(xhr)
                })
            }else{
                $.postJSON(`${prefix}${endpointPattern}`, function (data) {
                    log(data);
                }).fail(function (xhr) {
                    log("error");
                    console.log(xhr)
                })
            }

        }, false);
    }
    document.getElementById("e2eCheck").addEventListener('click', function () {
        let key = $(".issue-link").attr("data-issue-key");
        window.open(`http://private.central-eks.aureacentral.com/pca-qe/api/review/${key}`);
        let url = jQuery("a[href*=confluence]").filter(":contains('Environment')").get(0) || alert("env doc link  not found");
        url = encodeURIComponent(url);
        window.open(`http://private.central-eks.aureacentral.com/pca-qe/api/ticketservice/envDs/yaml?url=${url}`);
    },false);
    //attach('GET','check e2e', "e2eCheck", 'https://private.central-eks.aureacentral.com/pca-qe/api/review/${key}')

    attach('GET','check fqa', "qeCheckFQA", '/check/aufeaturereview?issueKey=${key}')
    attach('GET','check au', "qeCheckAU", '/check/audocreview?issueKey=${key}')
    attach('GET','check fstc', "qeCheckFSTC", '/check/auepicreview?issueKey=${key}')
    attach('GET','check cr', "qeCheckCR", '/check/codereview?issueKey=${key}')

    attach('POST','approve cr', "qeApprove", '/comments?action=approve&issueKey=${key}')
    attach('POST','comment cr', "qeComment", '/comments?action=rejectComments&issueKey=${key}')
    attach('POST','reject cr', "qeReject", '/comments?action=reject&issueKey=${key}')

    attach('POST','fqa au', "fqaApprove", '/comments?action=approve&issueKey=${key}')
    attach('POST','fqa au', "fqaReject", '/comments?action=reject&issueKey=${key}')


    attach('POST','approve au', "auApprove", '/comments?action=approve&issueKey=${key}')
    attach('POST','reject au', "auReject", '/comments?action=reject&issueKey=${key}')

    attach('POST','approve epic', "epicApprove", '/comments?action=approve&issueKey=${key}')
    attach('POST','reject epic', "epicReject", '/comments?action=reject&issueKey=${key}')


})

