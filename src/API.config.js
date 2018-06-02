import camelize from 'camelize';

export const API = 'http://scaneos.io:8000';
export default path =>
  fetch(`${API}${path}`)
    .then(res => res.json())
    .then(camelize);
