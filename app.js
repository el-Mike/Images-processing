(function (){
    var config = {
        galleryClass: '.thumbnails-gallery',
        fileSelectorClass: '.file-selector',
        dropAreaClass: '.drop-area',
        filesListClass: '.files-list',
        supportedFiles: ['jpeg', 'jpg', 'png'],
        thumbWidth: 150,
        thumbHeight: 150
    };

    /**
     * Let's start the magic!
     */
    galleryModule.Init(config);
})();