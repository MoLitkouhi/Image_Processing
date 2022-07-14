/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require('./IOhandler'),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

const checkImages = async () => {
  try {
    await IOhandler.unzip(zipFilePath, pathUnzipped);
    console.log('Extraction operation complete');
    const files = await IOhandler.readDir(pathUnzipped);
    files?.forEach(item => {
      if (item.includes('.png')) {
        IOhandler.grayScale(pathUnzipped, pathProcessed, item);
      }
    });
  } catch (e) {
    console.log('Error: ', e);
  }
};

checkImages();
