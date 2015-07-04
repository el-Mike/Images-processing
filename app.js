(function () {
    /**
     * Attaching HTML elements to variables
     *
     * @type {HTMLElement}
     */
    var dropArea = document.getElementById('drop-area');
    var fileSelector = document.getElementById('fileSelector');

    /**
     * Function, that creates list item with information about
     * uploaded images
     *
     * @param file
     * @returns {string}
     */
    function createFilesListItem(file) {
        var itemHTML;

        itemHTML = '<li class="list-item"><strong>' + file.name + '</strong> ';
        itemHTML += '('+ (file.type || 'unknown') +') - ';
        itemHTML += file.size + ' bytes, last modified: ';
        itemHTML += (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'unknown') + '</li>';

        return itemHTML;
    }


    /**
     * Function, that checks if file is supported
     *
     * @param fileType
     * @returns {boolean}
     */
    function isFileSupported(fileType) {
        return ((fileType.match(/image\/(jpeg)|(jpg)|(png)/)) ? true : false);
    }

    /**
     * Function, that handles file uploading, creating list items and thumbs
     *
     * @param e
     */

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

    /**
     * Function, that allows to open thumb in the new window
     *
     */
    function openInNewWindow() {
        var windowWidth = window.outerWidth;
        var windowHeight =  window.outerHeight;
        var link = this.childNodes[0].getAttribute('src');
        var title = this.childNodes[0].getAttribute('title');

        window.open(link, title,'width=' + windowWidth + ',height=' + windowHeight);
    }
    
    function fileUpload(e) {
        /**
         * getting FileList object, filled with uploaded files
         *
         * @type {FileList}
         */
        var files = e.target.files || e.dataTransfer.files;
        /**
         * Attaching necessary HTML elements to variables
         *
         * @type {HTMLElement}
         */
        var list = document.getElementById('list');
        var thumbnailsGallery = document.getElementById('thumbnails-gallery');
        var listItemsWrapper = document.getElementById('list-items-wrapper');

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
            if (!isFileSupported(file.type)) {
                alert('Only .png and .jpg files are supported!');
                continue;
            }

            listItemsWrapper.innerHTML += createFilesListItem(file);

            reader = new FileReader();

            /**
             * reader's onload function, which starts when
             * image is uploaded. Thumbs are being created,
             * and their click events are being set.
             */
            reader.onload = (function (file) {
                return function (e) {
                    var spanElement = document.createElement('span');
                    var linkElement = document.createElement('a');

                    spanElement.setAttribute('class', 'thumb-wrapper');
                    linkElement.setAttribute('class', 'thumb-link');
                    linkElement.innerHTML = '<img src="' + e.target.result + '" title="' + file.name + '" />';

                    spanElement.appendChild(linkElement);
                    thumbnailsGallery.appendChild(spanElement);

                    linkElement.addEventListener('click', openInNewWindow, false);
                };
            })(file);

            /**
             * Fires reader's onload function, fills result property with
             * file data encoded as a data URL
             */
            reader.readAsDataURL(file);
        }
    }

    /**
     * adding functions to events
     */
    fileSelector.addEventListener('change', fileUpload, false);
    dropArea.addEventListener('dragover', handleDragOver, false);
    dropArea.addEventListener('drop', fileUpload, false);
})();