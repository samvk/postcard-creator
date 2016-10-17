import Events from "pubsub";
import dropzoneAlert from "dropzone-ui";
import { MAX_FILESIZE } from "data";
/*************** </> Imports ******************/


const $gcardImage = $(".gcard-image");

function uploadFile(files) {
    const photoFile = files[0],
          reader = new FileReader();

    //VALIDATE
		//File Type
	if ( !photoFile || !photoFile.type.match("image.*") ) {
		dropzoneAlert("Oops, I can't seem to read this. Make sure you're uploading an image file.", "error");
		return;
	}
		//Max File Size
    if (photoFile.size > (MAX_FILESIZE*1024*1024) ) {
        dropzoneAlert(`Sorry, your photo is too large (max: ${MAX_FILESIZE} MBs)`, "error");
        return;
    }
	
	//LOADING SCREEN
	reader.onloadstart = function() {
		dropzoneAlert("Loading...", null, true);
	};
	reader.onloadend = function() {
		dropzoneAlert(""); //clear
	};

    //ERROR HANDLING
		//Failed upload
    reader.onerror = function() {
        dropzoneAlert("Something went wrong. Please try reuploading your phot Sorry about that.", "error");
    };

    	//successful upload
	reader.onload = function(e) {
		$gcardImage
			//set giftcard image
			.attr("src", e.target.result)
			//error if "image" file has bad data code
			.on("error", function() {
				dropzoneAlert("Sorry, I can't understand this image file.", "error");
		})
	//SUCCESS
		//wait till image is loaded
			.on("load", function() {
			Events.trigger("gcardSet", $gcardImage[0]);
		});
	}; 

	//UPLOAD FILE
    reader.readAsDataURL(photoFile);
}

Events.on("fileUpload", uploadFile);

/*************** File Upload listeners *****************/
$("body").on("drop", function(e) {
	let files = e.originalEvent.dataTransfer.files;
	Events.trigger("fileUpload", files);
});

$("#fileInput").change(function(e){
	let files = e.target.files;
	Events.trigger("fileUpload", files);
});