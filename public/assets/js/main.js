document.addEventListener("DOMContentLoaded", function() {
    let fronAndTo = document.location.pathname.split("/").pop();
        fronAndTo = fronAndTo.split("-");

    let from = AccountsObject[fronAndTo[0]];
    let to = AccountsObject[fronAndTo[1]];

    Object.defineProperty(window, "FROM", {
        get: function () {
            return from
        }
    })

    Object.defineProperty(window, "TO", {
        get: function () {
            return to
        }
    })
});

