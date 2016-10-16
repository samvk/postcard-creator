//Import side-effect (non-binding) modules
import "gcard-ui";
import "dropzone-ui";
import "steps-ui";
import "webcamera";
import "contact";
import "gcard/gcard-upload";
import "gcard/render-canvas";

//Imports
import Events from "pubsub";

/*************** Drag and Drop listeners *****************/
//prevent default browser file drop behaviour
$("body").on("drag dragstart dragend dragover dragenter dragleave drop", function(e) {
    e.preventDefault();
    e.stopPropagation();
}).on("dragover dragenter", function() {
    Events.trigger("drag");
}).on("dragleave dragend drop", function() {
    Events.trigger("dragend");
});

/*************** File Upload listeners *****************/
$("body").on("drop", function(e) {
    let files = e.originalEvent.dataTransfer.files;
    Events.trigger("fileUpload", files);
});

$("#fileInput").change(function(e){
    let files = e.target.files;
    Events.trigger("fileUpload", files);
});