require("./app");

if (module.hot) {
    module.hot.accept(function (err) {
        if (err) {
            console.error("Cannot apply hot update", err);
        }
    });
}