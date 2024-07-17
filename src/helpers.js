const init = (ids) => {
    window._hjSettings = { hjid: ids.hjId, hjsv: 6 };
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
        window.dataLayer.push(arguments)
    }
};

const acceptGa =  () => {
    window.dataLayer?.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });
};

const acceptHj = function () {
    window.hj = window.hj ||
        function() {
            (window.hj.q = window.hj.q || []).push(arguments);
        };
};


export {
    acceptGa,
    acceptHj,
    init
}
