$(document).ready(function () {
if (hasNoAuth()) {
    let user = prompt("username");
    let pass = prompt("pass");
    localStorage['jiraUser']=user
    localStorage['jiraPass']=pass
    localStorage[authKey] = btoa(`${user}:${pass}`)
}
$("a[href*=mp4]").attr('href',`https://${localStorage['jiraUser']}:${localStorage['jiraPass']}@jira.devfactory.com`+$("a[href*=mp4]").attr('href'))
})
