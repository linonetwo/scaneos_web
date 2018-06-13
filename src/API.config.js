// @flow
import camelize from 'camelize';

export const API = 'https://scaneos.io/api';
export const EOS_API = 'https://scaneos.io/eosapi';
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
