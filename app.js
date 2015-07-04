(function () {
    var dropArea = document.getElementById('drop-area');
    var fileSelector = document.getElementById('fileSelector');

    function createFilesListItem(file) {
        var itemHTML;

        itemHTML = '<li class="list-item"><strong>' + file.name + '</strong> ';
        itemHTML += '('+ (file.type || 'n/a') +') - ';
        itemHTML += file.size + ' bytes, last modified: ';
        itemHTML += (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '</li>';

        return itemHTML;
    }

    function isFileSupported(fileType) {
        return ((fileType.match(/image\/(jpeg)|(jpg)|(png)/)) ? true : false);
    }

    function fileUpload(e) {
        var files = e.target.files || e.dataTransfer.files;
        var list = document.getElementById('list');
        var thumbnailsGallery = document.getElementById('thumbnails-gallery');
        var listItemsWrapper = document.getElementById('list-items-wrapper');
        var reader;
        var i = 0;
        var file;

        e.preventDefault();
        e.stopPropagation();

        for (; file = files[i]; i += 1) {
            if (!isFileSupported(file.type)) {
                alert('Only .png and .jpg files are supported!');
                continue;
            }

            listItemsWrapper.innerHTML += createFilesListItem(file);

            reader = new FileReader();

            reader.onload = (function (file) {
                return function (e) {
                    var spanElement = '<span class="thumb-wrapper">';
                    spanElement += '<a href="' + e.target.result + '"><img src="' + e.target.result + '" title="' + file.name + '" /></a></span>';

                    thumbnailsGallery.innerHTML += spanElement;
                };
            })(file);

            reader.readAsDataURL(file);
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
    }



    fileSelector.addEventListener('change', fileUpload, false);

    dropArea.addEventListener('dragover', handleDragOver, false);
    dropArea.addEventListener('drop', fileUpload, false);

})();