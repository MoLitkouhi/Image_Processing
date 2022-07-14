/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require('unzipper'),
  fs = require('fs').promises,
  PNG = require('pngjs').PNG,
  path = require('path');

const { createReadStream, createWriteStream } = require('fs');
/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }))
    .promise();
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */

const readDir = async dir => {
  return fs.readdir(dir);
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut, fileName) => {
  createReadStream(`${pathIn}/${fileName}`)
    .pipe(
      new PNG({
        filterType: 4
      })
    )
    .on('parsed', function () {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;

          // invert color
          this.data[idx] = 255 - this.data[idx];
          this.data[idx + 1] = 255 - this.data[idx + 1];
          this.data[idx + 2] = 255 - this.data[idx + 2];

          // and reduce opacity
          this.data[idx + 3] = this.data[idx + 3] >> 1;
        }
      }

      this.pack().pipe(createWriteStream(`${pathOut}/${fileName}`));
    });
};

module.exports = {
  unzip,
  readDir,
  grayScale
};
