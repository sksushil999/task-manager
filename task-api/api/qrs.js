'use strict';

const qr = require('qr-image');
const caption = require('caption');
const fs = require('fs');

var Jimp = require("jimp");

exports.create = async(req, res) => {

    const data = require('../data.json')

    try {
        // var qr_svg = qr.image('SHRI KULWANT RAI SARVHITKARI VIDYA MANDIR 43-B CHANDIGARH', { type: 'png', margin: 8, ec_level: 'H' });
        // await qr_svg.pipe(require('fs').createWriteStream('qrs/i_love_qr.png'));

        // var fileName = 'qrs/i_love_qr.png';
        // var imageCaption = 'Image caption';
        // var loadedImage;

        // Jimp.read(fileName)
        //     .then(function(image) {
        //         loadedImage = image;

        //         return Jimp.loadFont(Jimp.FONT_SANS_8_BLACK);
        //     })
        //     .then(function(font) {
        //         loadedImage.print(font, 10, 10, imageCaption)
        //             .write(fileName);
        //     })
        //     .catch(function(err) {
        //         console.error(err);
        //     });
    } catch (e) {
        console.log(e)
    }


}
exports.get = async(req, res) => { return res.data('success') }
exports.update = async(req, res) => { return res.data('success') }
exports.delete = async(req, res) => { return res.data('success') }
exports.search = async(req, res) => { return res.data('success') }