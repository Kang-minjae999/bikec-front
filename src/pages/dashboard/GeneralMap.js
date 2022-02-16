import { Map, MapMarker, MarkerClusterer, useMap } from 'react-kakao-maps-sdk';
import { ClusterPositiondata } from './GeneralMapposition';

const { Container } = require('@mui/material');
const { useState, useEffect } = require('react');

export default function GeneralMap() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setPositions(ClusterPositiondata.positions);
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const ClusterContainer = ({ positions }) => {
    // hook를 이용하여 map 객체 참조 합니다.
    const map = useMap();

    const onClusterclick = (_target, cluster) => {
      console.log('hello');
      // 현재 지도 레벨에서 1레벨 확대한 레벨
      const level = map.getLevel() - 1;

      // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
      map.setLevel(level, { anchor: cluster.getCenter() });
      map.panTo(cluster.getCenter());
    };

    return (
      <MarkerClusterer
        averageCenter="true" // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={10} // 클러스터 할 최소 지도 레벨
        disableClickZoom="true" // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
        // 마커 클러스터러에 클릭이벤트를 등록합니다
        // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
        // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
        onClusterclick={onClusterclick}
      >
        {positions.map((pos) => (
          <MapMarker
            key={`${pos.lat}-${pos.lng}`}
            position={{
              lat: pos.lat,
              lng: pos.lng,
            }}
            onClick={(marker) => map.panTo(marker.getPosition()) + setIsVisible(true) + console.log(isVisible)}
          />
        ))}
      </MarkerClusterer>
    );
  };

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 36.2683,
        lng: 127.6358,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '70vh',
      }}
      level={13} // 지도의 확대 레벨
      onClick={() => setIsVisible(false)}
    >
      <ClusterContainer positions={positions} />
    </Map>
  );
}
