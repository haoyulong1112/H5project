
((function (document, window) {
    let innerWidth = window.screen.width;
    let width = 1024;
    if(innerWidth<=414){
        width = 750;
    }
    const scale = innerWidth /width;
    let meta = document.querySelector('meta[name=viewport]');

    let content = `width=${width},init-scale=${scale}, user-scalable=no`;
    if(!meta){
        meta = document.createElement('meta');
        meta.setAttribute('name','viewport');
        document.head,appendChild(meta);
    }
    meta.setAttribute('content',content)
})(document, window))
