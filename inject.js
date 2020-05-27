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

    $("a.issue-link").attr("target","_blank")
    $("a.issue-link").append("<button onclick=' window.prompt(`Copy to clipboard: Ctrl+C, Enter`, this.parentElement.innerText); return false;'>CP</button>")

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





