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

const TEMPLATE_COUNT = 2;

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
			};
			mOptions = {
				font: "30px 'Lato', sans-serif",
				color: "#FCFCFC",
				textAlign: "right",
			};
			break;
	}

	//merge canvas options
	return {
		hOptions: Object.assign({}, defHOptions, hOptions),
		mOptions: Object.assign({}, defMOptions, mOptions)
	};
}