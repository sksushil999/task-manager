'use strict';

const qr = require('qr-image');
const caption = require('caption');
const fs = require('fs');

var Jimp = require("jimp");
// const data = require('./data.json')
const list = [{ "sr": "0", "name": "MANPREET KAUR", "sname": "ACADEMY" }] //data.list;
const waitFor = (ms) => new Promise(r => setTimeout(r, ms));



exports.printName = async() => {

    let print = async(student) => {

        return new Promise(async(resolve, reject) => {
            if (!student.sr || !student.name) {
                return resolve();
            }
            let text = `${student.sname}-${student.sr}`;
            let ws = `qrs/${text}.png`;
            console.log(`printing name - ${text}`);
            var fileName = ws;
            var imageCaption = `${student.sr}-${student.name}`;
            var loadedImage;

            if (student.sr == "90" && student.sname == "DAV CENT. PUBLIC SCHOOL NABHA") {
                console.log('printing name done')
            }

            Jimp.read(fileName)
                .then(async function(image) {
                    loadedImage = image;

                    return Jimp.loadFont(Jimp.FONT_SANS_8_BLACK);
                })
                .then(async function(font) {
                    loadedImage.print(font, 10, 10, imageCaption)
                        .write(fileName);
                    await waitFor(500);
                    return resolve();
                })
                .catch(async function(err) {
                    console.error(err);
                    await waitFor(500);
                    return resolve();
                });
            // return resolve();
        })
    }

    for (const student of list) {
        await print(student)
    }

}

exports.generateQr = async() => {

    let num = 0;
    let text = 'DANCE-KUMBH-';

    let generate = async(student) => {

        return new Promise(async(resolve, reject) => {
            if (!student.sr || !student.name) {
                return resolve();
            }
            let text = `${student.sname}-${student.sr}`;
            let ws = `qrs/${text}.png`;
            console.log(`printing qr - ${text}`);
            var qr_svg = qr.image(text, { type: 'png', margin: 8, ec_level: 'H' });
            qr_svg.pipe(fs.createWriteStream(ws));
            if (student.sr == "90" && student.sname == "DAV CENT. PUBLIC SCHOOL NABHA") {
                console.log('printing qr done');
                await waitFor(5000);
                exports.printName();
            }

            await waitFor(500);
            return resolve();
        })
    }

    for (const student of list) {
        await generate(student)
    }

}

exports._generateQr = async() => {

    let num = 0;
    let msg = 'DANCE-KUMBH';

    let _generate = async(student) => {

        return new Promise(async(resolve, reject) => {
            ++num;
            let text = `${msg}-${num}`;
            let ws = `qrs/${text}.png`;
            console.log(`printing qr - ${text}`);
            var qr_svg = qr.image(text, { type: 'png', margin: 8, ec_level: 'H' });
            qr_svg.pipe(fs.createWriteStream(ws));
            if (num == 500) {
                return console.log('printing qr done');

            }
            await waitFor(500);
            return _generate();
        })
    }

    _generate();

}