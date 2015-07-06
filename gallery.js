var galleryModule = galleryModule || {};

galleryModule = (function (itemsModule) {
    /**
     * Function, that checks if file is supported
     *
     * @param supportedTypes
     * @param fileType
     * @returns {*}
     */
    function isFileSupported(supportedTypes, fileType) {
        return supportedTypes.reduce(function (isSupported, type) {
            var regExp = new RegExp('image\/' + type, 'gi');

            return (isSupported && ((fileType.match(regExp)) ? true : false));
        }, true);
    }

    /**
     * Function, that prevents browser to execute default actions,
     * and setting dropEffect on 'copy'
     *
     * @param e
     */
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
    }

    function fileUploadHandler(galleryConfig) {
        /**
         * getting gallery and files list
         *
         * @type {HTMLElement|string}
         */
        var galleryElement = document.querySelector(galleryConfig.galleryClass) || '.thumbnails-gallery';
        var filesListElement = document.querySelector(galleryConfig.filesListClass) || '.files-list';

        return function (e) {
            /**
             * getting FileList object, filled with uploaded files
             *
             * @type {FileList}
             */
            var files = e.target.files || e.dataTransfer.files;

            /**
             * variables for storing FileReader object and loop values
             */
            var reader;
            var i = 0;
            var file;


            /**
             * preventing browser to execute default actions
             */
            e.preventDefault();
            e.stopPropagation();

            /**
             * Loop - it iterates over every uploaded images
             * and creates list items and thumbs
             */
            for (; file = files[i]; i += 1) {
                if (isFileSupported(galleryConfig.supportedFiles, file.type)) {
                    alert('You have uploaded unsupported file!');
                    continue;
                }

                filesListElement.appendChild(itemsModule.createFilesListItem(file));

                reader = new FileReader();
                reader.onload = itemsModule.createThumb(file.name, galleryElement);


                /**
                 * Fires reader's onload function, fills result property with
                 * file data encoded as a data URL
                 */
                reader.readAsDataURL(file);
            }
        }
    }

    /**
     * Function, that sets up every single gallery on the page
     * @param galleries
     * @constructor
     */
    function Init(galleries) {
        galleries.forEach(function (galleryConfig) {
            /**
             * getting file select button and drop area
             *
             * @type {HTMLElement|string}
             */
            var fileSelectorElement = document.querySelector(galleryConfig.fileSelectorClass) || '.file-selector';
            var dropAreaElement = document.querySelector(galleryConfig.dropAreaClass) || '.drop-area';

            /**
             * attaching functions
             */
            fileSelectorElement.addEventListener('change', fileUploadHandler(galleryConfig), false);
            dropAreaElement.addEventListener('dragover', handleDragOver, false);
            dropAreaElement.addEventListener('drop', fileUploadHandler(galleryConfig), false);
        });
    }

    /**
     * galleryModule interface
     */
    return {
        Init: Init
    };
})(itemsModule);