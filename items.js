var itemsModule = itemsModule || {};

itemsModule = (function () {
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
     * @param fileName
     * @param gallery
     * @returns {Function}
     */
    function createThumb(fileName, gallery) {
        return function (e) {
            var spanElement = document.createElement('span');
            var linkElement = document.createElement('a');

            spanElement.setAttribute('class', 'thumb-wrapper');
            linkElement.setAttribute('class', 'thumb-link');
            linkElement.innerHTML = '<img src="' + e.target.result + '" title="' + fileName + '" />';

            spanElement.appendChild(linkElement);
            gallery.appendChild(spanElement);

            linkElement.addEventListener('click', openInNewWindow, false);
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