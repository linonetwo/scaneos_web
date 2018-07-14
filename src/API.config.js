// @flow

exports.API = 'https://scaneos.io/api';
exports.GRAPHQL_API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3002/graphql' : 'https://scaneos.io/gqapi/graphql';

exports.MAPBOX_TOKEN =
  'pk.eyJ1IjoibGlub25ldHdvMDEyIiwiYSI6ImNqaHhjcHhmcjBhZDkzcXBxejh3a3RrOGUifQ.EOAmFP8NJxRc_iLce8VCVw';
exports.CMS_TOKEN = 'aQVetMaDdbxSPORiloeWjNYBgkaIyggs';

const CMS_BASE = 'https://scaneos.io/cmsapi/'
exports.CMS_BASE = CMS_BASE;
exports.CMS_API = `${CMS_BASE}api/1.1/`;
