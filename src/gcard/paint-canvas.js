import canvasText from "canvas-text-wrapper/canvas-text-wrapper";
import canvasTemplate from "gcard/canvas-template";


export default function paintCanvas(header,	message, style) {
	//Dev note: Do not set these as default parameters to avoid ignoring empty strings
	header = header || "Congratulations!";
	//soft-hyphen(­) to "fix" ignored new-line issue on some browsers
	message = message.replace(/\n{2,}/g, "\n ­ \n") || "Sending warm wishes on this festive occassion.";
	message += " ­";

	const canvas = $("#gcard")[0],
		  //initialize canvas
		  ctx = canvas.getContext("2d");
	
	let { hOptions, mOptions } = canvasTemplate(style);

	//set :inputs to template font
	$(".gcard__header").css({
		font: hOptions.font,
		fontSize: "1em" //override font-size
	});
	$(".gcard__message").css({
		font: mOptions.font,
		fontSize: "1em" //override font-size
	});

	//paint text onto canvas
	canvasText(canvas, header, hOptions);
	canvasText(canvas, message, mOptions);
}