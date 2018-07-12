import Unsplash, { toJson } from "unsplash-js";
const Keys= require('./config/key');
const unsplash= new Unsplash(Keys);
require('es6-promise').polyfill();
require('isomorphic-fetch');

unsplash.photos.getPhoto("mtNweauBsMQ")
  .then(toJson)
  .then(json => {
    unsplash.photos.downloadPhoto(json);
  });