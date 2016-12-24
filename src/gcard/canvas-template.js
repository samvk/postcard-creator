/** Developer's Note:

*	How to add a new template:

* 1. Import font at sass>custom>fonts>font-variables.scss
* 2. Add font to preload("font", []) array argument below
* 3. Add another case to function canvasTemplate()
* 4. Increase const TEMPLATE_COUNT by 1.

* 	If a themed template...
* 5. Upload an svg with the theme name to img>themes
* 6. Add svg to preload("img", []) array argument below
* 7. Add the name of the theme to the theme variable in the case
**/


import preload from "gcard/preload";
/*************** </> Imports ******************/


//Developers Note: fonts & images must be preloaded to ensure browser is prepped for canvas
preload("font", ["Lobster Two", "Lato", "Oleo Script", "Pacifico", "Great Vibes", "Creepster", "Vast Shadow", "Berkshire Swash", "Mountains of Christmas"]);
preload("image", ["halloween", "thanksgiving", "christmas"]);

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

const TEMPLATE_COUNT = 7;

export default function canvasTemplate(switchStyle) {
	//special theme (if applicable)
	let theme = "";

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
				paddingY: 28
			};
			break;

		case 1:
			hOptions = {
				font: "100px 'Oleo Script', cursive",
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
				shadowOffsetX: 1,
				shadowOffsetY: 1,
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

		case 4:
			hOptions = {
				font: "100px 'Creepster', cursive",
				color: "#E87B18",
				verticalAlign: "top",
				paddingX: 30,
				paddingY: 60
			};
			mOptions = {
				font: "30px 'Lato', sans-serif",
				color: "#FCFCFC",
				paddingX: 30,
				paddingY: 30
			};
			theme = "halloween";
			break;

		case 5:
			hOptions = {
				font: "small-caps 100px 'Vast Shadow', cursive",
				color: "#883A16",
				shadowOffsetX: 1,
				shadowOffsetY: 1,
				verticalAlign: "top",
				paddingX: 30,
				paddingY: 70
			};
			mOptions = {
				font: "30px 'Homemade Apple', sans-serif",
				color: "#FCFCFC",
				paddingX: 30,
				paddingY: 40
			};
			theme = "thanksgiving";
			break;

		case 6:
			hOptions = {
				font: "90px 'Berkshire Swash', cursive",
				color: "#E93E35",
				shadowOffsetX: 3,
				shadowOffsetY: 3
			};
			mOptions = {
				font: "30px 'Mountains of Christmas', sans-serif",
				color: "#FCFCFC",
				textAlign: "right",
				paddingX: 30,
				paddingY: 30
			};
			theme = "christmas";
			break;
	}

	//merge canvas options
	return {
		hOptions: Object.assign({}, defHOptions, hOptions),
		mOptions: Object.assign({}, defMOptions, mOptions),
		theme: theme
	};
}