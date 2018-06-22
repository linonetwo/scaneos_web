const DirectusRemote = require('directus-sdk-javascript/remote');
const wrapFetch = require('socks5-node-fetch');
const _ = require('lodash');
const fs = require('fs');

const eosBPProfilePath = '/Users/dongwu/Desktop/repo/eos-bp-profile';

const client = new DirectusRemote({
  url: 'http://23.239.22.165:6688',
  accessToken: 'Xkq1omGlsXxyvXfIY87TahqIcyQyhdxY',
});

// delete images
// for (let id = 10; id <= 91; id += 1) {
//   client.deleteFile(id).then(obj => console.log(obj)).catch(console.error);
// }

const fetch = wrapFetch({
  socksHost: 'localhost',
  socksPort: '1080',
});

Promise.all(
  _
    .tail(fs.readdirSync(`${eosBPProfilePath}/bp`))
    .map(fileName => JSON.parse(fs.readFileSync(`${eosBPProfilePath}/bp/${fileName}`, { encoding: 'utf8' })))
    .map(async ({ title, tagline, introduce, account_name: account, public_key: key, org, nodes }) => {
      let image = null;
      let logo = null;
      let locationZh = null;
      let latitude = null;
      let longitude = null;
      try {
        const rawImage = Buffer.from(fs.readFileSync(`${eosBPProfilePath}/images/cover-${account}.png`)).toString('base64');
        const {
          data: { id },
        } = await client.createFile({
          name: `${account}-cover.png`,
          data: rawImage,
        });
        image = id;
      } catch (error) {}
      try {
        const rawLogo = Buffer.from(fs.readFileSync(`${eosBPProfilePath}/images/logo-${account}.png`)).toString('base64');
        const {
          data: { id },
        } = await client.createFile({
          name: `${account}-logo.png`,
          data: rawLogo,
        });
        logo = id;
      } catch (error) {}

      const googleMapAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${
        org.location
      }&key=AIzaSyCNd7lrqJTbSL4Kt-4A3g3NR0t0baK08KM`;
      try {
        const { results } = await fetch(googleMapAPI).then(res => res.json());
        locationZh = results[0].formatted_address;
        latitude = results[0].geometry.location.lat;
        longitude = results[0].geometry.location.lng;
      } catch (error) {
        console.log('error', title, 'location', googleMapAPI);
      }
      const dataForDB = {
        name: title,
        homepage: org.website,
        slogan: tagline.en,
        slogan_zh: tagline.zh,
        introduction: introduce.en,
        introduction_zh: introduce.zh,
        location: org.location,
        location_zh: locationZh,
        latitude,
        longitude,
        contact: `${_
          .toPairs(org.social_network)
          .map(([field, value]) => (value ? `${field}: ${value}\n` : ''))
          .join('')}email: ${org.email}`,
        account,
        key,
        image,
        logo,
        organization: org.name,
        nodes: JSON.stringify(nodes, null, '  '),
      };
      return dataForDB;
    }),
).then(resultArray => client.createBulk('bp', resultArray)).then(console.log).catch(console.error);
