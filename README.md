# Greetings, World!


## Synopsis

*Greetings, World!* is a proof-of-concept postcard creator. It takes image input from the user and converts them to a digital 4 x 6 postcard.

I chose to build the Postcard Creator as it felt like the most fully-rounded of the options. It requires a bit of work in front-end, back-end, and design, and creates a finished product one could actually use. It also lets me play around with a lot of what HTML5 has to offer.

#### Developer Notes

*Greetings, World!* is written in ES6 syntax and compiled & polyfilled with Babel. It uses Webpack as its module bundler of choice.


## Steps

1. The user uploads a photo via drag & drop, file upload, or web camera.
2. The greeting card generator determines the shape up the uploaded image and orients itself landscape or portrait, cropping the image to a 4 x 6 postcard.
3. The user can then choose from a selection of designs with custom font type, color, and positioning. They're encouraged to add a custom header and message to their postcard.
4. When decided, they'll be asked to write an optional backside message, as well as some information about themselves, and the recipient.
5. Finally, the postcard is emailed, and the greeting card generator resets<sup>✝</sup>.

<sup>✝</sup> All information except recipient data is saved for easy repetition.


#### Notes

All choices are kept on reset besides the form. This means the user can quickly reuse or edit the previous message on the theme of their choice before entering a new recipient.

All error messages are displayed at the top of the dropzone area for the user.


## Events

The current list of PubSub Events *Greetings, World!* listens for are:

* drag			// a user drags a file into the window
* dragend		// a user stops dragging a file
* fileUpload	// a user chooses a file to upload
* gcardSet		// the image successfully uploads
* gcardSave		// the user finishes designing their postcard
* reset			// the app exits its current step
* resetOver		// the app returns to step one


## Tests

A small directory tests/ can be found with a few images to upload. It includes one good image and three different bad images (wrong file type, fake image, etc.)


## Libraries

#### Webcamjs
* 1.0.16
* A small Webcam library allowing for simple flash fallback
* The MIT License (MIT)
* https://pixlcore.com/read/WebcamJS

#### CanvasTextWrapper.js
* 0.9.3
* A modified version of the original. Allows for easy text alignment with HTML5 canvas
* The MIT License (MIT)
* http://namniak.github.io/canvas-text-wrapper

#### jQuery
* 3.1.1
* A feature-rich JavaScript allowing for simpler DOM manipulation chaining
* The MIT License (MIT)
* https://jquery.com

#### jQuery Flip
* 1.1.1
* A jQuery plugin which brings CSS3 backface-visibility features to IE through brute force
* The MIT License (MIT)
* https://nnattawat.github.io/flip

#### PHPMailer
* 5.2.16
* A PHP library that beautifies and simplifies email attachments
* GNU Lesser General Public License
* https://github.com/PHPMailer/PHPMailer


## Installation

*Greetings, World!* can be run locally (up until emailing) or previewed at https://greetingsworld.us.
**Note:** Chrome 47+ requires an SSL to access the webcam. View securely at https://greetingsworld.us, locally, or with Firefox.


## License

The MIT License (MIT)

Copyright (c) 2016 Sam Kauffman hello@samvk.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Contributors

*Greetings, World!* is built by Sam Kauffman. You can contact me anytime at **hello@samvk.com**. You can also view my full portfolio for other projects at **https://samvk.com**. Thanks for reading!