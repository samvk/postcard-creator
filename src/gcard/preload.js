export default function preload(type, arr) {
	if (type === "font") {
		for (let font of arr) {
			$(".font-loader").append(`<p style="font-family: ${font}">.</p>`);
		}
	} else if (type === "image") {
		let images = [];
		for (let image of arr) {
			images.push( new Image() );
			images[images.length-1].src = `img/themes/${image}.svg`;
		}
	} else {
		throw new TypeError(`${type} is not an accepted preload type.`);
	}
}