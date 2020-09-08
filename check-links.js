const myjQuery = $;
$(document).ready(function () {


    $("nav.aui-header").prepend(`
        <button class="iqb-check-access" >Check Access</button>
    `);

    $("button.iqb-check-access").click(function () {

        console.error("check-access");

        if (window.location.href.indexOf("SPEC-") != -1) {
            //[0].innerText.match(/https?:\/\/[^\s,]+/gi)
            $("li#rowForcustomfield_48501 a, li#rowForcustomfield_48502 a").filter((i,e)=>e.href.indexOf(window.location.href)==-1)
                .each((i,e) => {
                    let url = e.href;
                    myjQuery.get(`http://localhost:3000/get-no-auth?url=${encodeURIComponent(url)}`)
                        .then(r => {
                            $(`a[href='${url}']`).append("<span>---OK</span>")
                        }).catch(e => {
                            $(`a[href='${url}']`).append("<span style='background-color:red'>---NOK</span>")
                    })
            })

        }
    });
})
