
((function (document, window) {
    // let innerWidth = window.innerWidth;
    let width = 1024;
    // if(innerWidth<=414){
    //     width = 750;
    // }
    const scale = window.innerWidth /width;
    let meta = document.querySelector('meta[name=viewport]');

    let content = `width=${width},init-scale=${scale}, user-scalable=no`;
    console.log(content)
    if(!meta){
        meta = document.createElement('meta');
        meta.setAttribute('name','viewport');
        document.head,appendChild(meta);
    }
    meta.setAttribute('content',content)
})(document, window))
