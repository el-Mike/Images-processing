var itemsModule = itemsModule || {};

itemsModule = (function () {
    /**
     * Function, that allows to open thumb in the new window
     *
     */
    function openInNewWindow(link) {
        var windowWidth = window.outerWidth;
        var windowHeight = window.outerHeight;

        return function () {
            window.open(link, 'thumb-preview', 'width=' + windowWidth + ',height=' + windowHeight);
        }
    }

    /**
     * Function, that creates list item with information about
     * uploaded images
     *
     * @param file
     * @returns {HTMLElement}
     */
    function createFilesListItem(file) {
        var filesListElement = document.createElement('li');

        filesListElement.setAttribute('class', 'list-item');
        filesListElement.innerHTML = '<strong>' + file.name + '</strong>';
        filesListElement.innerHTML += '('+ (file.type || 'unknown') + ') - ' + file.size + ' bytes, last modified: ';
        filesListElement.innerHTML += (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'unknown');

        return filesListElement;
    }

    /**
     * reader's onload function, which starts when
     * image is uploaded. Thumbs are being created,
     * and their click events are being set.
     *
     * @param gallery
     * @param thumbWidth
     * @param thumbHeight
     * @returns {Function}
     */
    function createThumb(gallery, thumbWidth, thumbHeight) {
        return function (e) {
            var spanElement = document.createElement('span');
            var linkElement = document.createElement('a');
            var canvasElement = document.createElement('canvas');
            var context = canvasElement.getContext('2d');
            var image = new Image();

            spanElement.setAttribute('class', 'thumb-wrapper');
            linkElement.setAttribute('class', 'thumb-link');

            canvasElement.width = thumbWidth;
            canvasElement.height = thumbHeight;

            image.src = this.result;
            if (image.width < image.height) {
                context.drawImage(image, 0, 0, thumbWidth, (image.height / (image.width / 150)));
            } else {
                context.drawImage(image, 0, 0, (image.width / (image.height / 150)), thumbHeight);
            }

            linkElement.appendChild(canvasElement);
            spanElement.appendChild(linkElement);
            gallery.appendChild(spanElement);

           linkElement.addEventListener('click', openInNewWindow(this.result), false);
        }
    }

    /**
     * itemsModule interface
     */
    return {
        createFilesListItem: createFilesListItem,
        createThumb: createThumb
    };
})();