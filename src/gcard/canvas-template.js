//Developers Note: fonts but be preloaded to ensure brower is prepped for canvas
//preload custom fonts used for canvas
const fonts = ["Lobster Two", "Lato", "Berkshire Swash", "Pacifico", "Great Vibes"];
for (let font of fonts) {
	$(".font-loader").append(`<p style="font-family: ${font}">.</p>`);
}

//default style options for header & message
let defHOptions = {
	lineHeight: 0.85,
	shadow: "black",
	shadowOffsetX: 5,
	shadowOffsetY: 5,
	shadowBlur: 1,
	verticalAlign: "middle",
	textAlign: "center",
	sizeToFill: true,
	maxFontSizeToFill: 100
};

let defMOptions = {
	verticalAlign: "bottom",
	textAlign: "center",
};

let hOptions, mOptions, //set canvas options (for one or both)
	style = 0;

const TEMPLATE_COUNT = 4;

export default function canvasTemplate(switchStyle) {
	//boolean called to cycle template
	if (switchStyle) {
		style++;
		style = style % TEMPLATE_COUNT;
	}
	//canvas style templates
	switch (style) {
		case 0:
			hOptions = {
				font: "120px 'Lobster Two', cursive",
				color: "#EAB100",
			};
			mOptions = {
				font: "30px 'Homemade Apple', sans-serif",
				color: "#FCFCFC",
			};
			break;

		case 1:
			hOptions = {
				font: "100px 'Berkshire Swash', cursive",
				color: "#FF5733",
				textAlign: "left",
				verticalAlign: "top",
				paddingY: 40
			};
			mOptions = {
				font: "30px 'Lato', sans-serif",
				color: "#FCFCFC",
				textAlign: "right",
			};
			break;

		case 2:
			hOptions = {
				font: "100px 'Great Vibes', cursive",
				color: "#FCFCFC",
				shadowOffsetX: 3,
				shadowOffsetY: 3
			};
			mOptions = {
				font: "30px 'Lato', sans-serif",
				color: "#212121",
				shadow: "#FCFCFC",
				shadowOffsetX: 2,
				shadowOffsetY: 2,
				textAlign: "left",
				verticalAlign: "bottom",
				paddingY: 60
			};
			break;

		case 3:
			hOptions = {
				font: "100px 'Pacifico', cursive",
				color: "#FFA337",
				textAlign: "right",
				verticalAlign: "top",
				paddingX: 30,
				paddingY: 60
			};
			mOptions = {
				font: "30px 'Homemade Apple', sans-serif",
				color: "#FCFCFC",
				textAlign: "left",
				paddingX: 30,
				paddingY: 30
			};
			break;
	}

	//merge canvas options
	return {
		hOptions: Object.assign({}, defHOptions, hOptions),
		mOptions: Object.assign({}, defMOptions, mOptions)
	};
}