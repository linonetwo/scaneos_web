// @flow
import camelize from 'camelize';

export const API = 'http://167.99.174.154:8000';
export const EOS_API = 'http://138.68.31.191:8888';
export default (path: string) =>
  fetch(`${API}${path}`)
    .then(res => res.json())
    .then(camelize);

export const postEOS = (path: string, body: Object) =>
  fetch(`${EOS_API}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(camelize);

export const MAPBOX_TOKEN =
  'pk.eyJ1IjoibGlub25ldHdvMDEyIiwiYSI6ImNqaHhjcHhmcjBhZDkzcXBxejh3a3RrOGUifQ.EOAmFP8NJxRc_iLce8VCVw';
