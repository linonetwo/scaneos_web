// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { translate } from 'react-i18next';
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';

import { MAPBOX_TOKEN } from '../../../API.config';

const MapContainer = styled(Flex)`
  width: 100%;
`;
const MapNav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
`;

type Props = {
  width?: number,
  height?: number,
  t: Function,
  points: Object[],
};

class BlockProducersMap extends Component<Props, *> {
  state = {
    viewport: {
      latitude: 37.785164,
      longitude: 100,
      zoom: 1.1,
      bearing: 0,
      pitch: 0,
      width: 500,
      height: 500,
    },
    popupInfo: null,
  };
  static getDerivedStateFromProps(nextProps: Props, prevState) {
    if (nextProps.points.length > 0) {
      return {
        ...prevState,
        viewport: {
          ...prevState.viewport,
          latitude: nextProps.points[0].latitude,
          longitude: nextProps.points[0].longitude,
        },
      };
    }
    return null;
  }
  /* eslint-disable no-undef */
  componentDidMount() {
    if (typeof window !== 'undefined') window.addEventListener('resize', this.onResize);
    this.onResize();
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined') window.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    let width = 0;
    let height = 400;
    if (typeof window !== 'undefined') {
      width = window.innerWidth >= 1200 ? (1200 - 24) / 2 - 20 * 2 : window.innerWidth * 0.9;
      height = window.innerHeight * 0.9 - 180;
    }
    /* eslint-disable no-undef */
    this.setState({
      viewport: {
        ...this.state.viewport,
        width,
        height,
      },
    });
  };

  ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
  iconSize = 20;
  renderCityMarker = (city, index) => (
    <Marker key={`marker-${index}`} longitude={city.longitude} latitude={city.latitude}>
      <svg
        height={this.iconSize}
        viewBox="0 0 24 24"
        style={{
          cursor: 'pointer',
          fill: '#1aa2db',
          stroke: '#fff',
          transform: `translate(${-this.iconSize / 2}px,${-this.iconSize}px)`,
        }}
        onClick={() => this.setState({ popupInfo: city })}
      >
        <path d={this.ICON} />
      </svg>
    </Marker>
  );

  getPopUpInfo = info => (
    <Flex column>
      <div>{info.name}</div>
      <div>
        {this.props.t('location')}: {info.location || ''}
      </div>
      {info.image && <img width={240} src={info.image} alt={info.name} />}
    </Flex>
  );

  renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => this.setState({ popupInfo: null })}
        >
          {this.getPopUpInfo(popupInfo)}
        </Popup>
      )
    );
  }
  render() {
    return (
      <MapContainer center>
        <MapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v9"
          onViewportChange={viewport => this.setState({ viewport })}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          {Object.values(this.props.points).map(this.renderCityMarker)}
          {this.renderPopup()}
          <MapNav className="nav">
            <NavigationControl onViewportChange={viewport => this.setState({ viewport })} />
          </MapNav>
        </MapGL>
      </MapContainer>
    );
  }
}

export default translate()(BlockProducersMap);
