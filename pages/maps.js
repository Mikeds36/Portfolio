import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/maps.module.css'
import {useEffect, useState} from "react";
import SearchResult from '../component/SearchResult'

let map = null;

let markers = [];
let searchData = [];

let MARKER_SPRITE_X_OFFSET = 29;
let MARKER_SPRITE_POSITION = {
    "A0": [0, 0],
    "B0": [MARKER_SPRITE_X_OFFSET, 0],
    "C0": [MARKER_SPRITE_X_OFFSET * 2, 0],
    "D0": [MARKER_SPRITE_X_OFFSET * 3, 0],
    "E0": [MARKER_SPRITE_X_OFFSET * 4, 0],
    "F0": [MARKER_SPRITE_X_OFFSET * 5, 0],
    "G0": [MARKER_SPRITE_X_OFFSET * 6, 0],
    "H0": [MARKER_SPRITE_X_OFFSET * 7, 0],
    "I0": [MARKER_SPRITE_X_OFFSET * 8, 0],
    "J0": [MARKER_SPRITE_X_OFFSET * 9, 0],
}

function Header() {
    return (
        <Head>
            <title>Mikeds&apos; Portfolio</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />

            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </Head>
    )
}

export default function Maps() {
    const [search, changeSearch] = useState(searchData);

    useEffect(() => {
        changeSearch(search)
    }, [search])

    function initMap() {
        map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 14, //지도의 초기 줌 레벨
            minZoom: 10, //지도의 최소 줌 레벨
            zoomControl: true, //줌 컨트롤의 표시 여부
            zoomControlOptions: { //줌 컨트롤의 옵션
                position: naver.maps.Position.TOP_RIGHT
            }
        });

        fetchMarkers();

        naver.maps.Event.addListener(map, 'idle', function() {
            updateMarkers();
            document.getElementById("fetcher").style.display = "block"
        });
    }

    function fetchMarkers() {
        for (let key in markers) {
            markers[key].setMap(null)
        }
        markers = []
        searchData = []

        fetch("/api/covid_screening?" +
            "north="+map.getBounds().getNE().lng()+
            "&south="+map.getBounds().getSW().lng()+
            "&east="+map.getBounds().getNE().lat()+
            "&west="+map.getBounds().getSW().lat(), {
            method: "GET",
        })
            .then((res) => res.json())
            .then(body => {
                for (let key in body) {
                    searchData.push(body[key])
                    if (key > 9) {
                        continue;
                    }
                    let objKey = Object.keys(MARKER_SPRITE_POSITION)[key]

                    let position = new naver.maps.LatLng(
                        body[key]["latitude"],
                        body[key]["longitude"]);

                    let marker = new naver.maps.Marker({
                        map: map,
                        position: position,
                        title: body[key]["name"],
                        icon: {
                            url: '/Maps/sp_pins_spot_v3.png',
                            size: new naver.maps.Size(24, 37),
                            anchor: new naver.maps.Point(12, 37),
                            origin: new naver.maps.Point(MARKER_SPRITE_POSITION[objKey][0], MARKER_SPRITE_POSITION[objKey][1])
                        },
                        zIndex: 100
                    });

                    let contentString = [
                        '<div style="padding: 2rem 1rem 0 1rem;">',
                        '   <h3>' + body[key]["name"] + '</h3>',
                        '   <p style="white-space: pre;">' + body[key]["addr"] + '<br />',
                        '       <br />',
                        '월 ~ 금 운영 시간: ' + body[key]["opertimew"] + '<br />',
                        '&#9;토 운영 시간: ' + body[key]["opertimet"] + '<br />',
                        '&#9;일 운영 시간: ' + body[key]["opertimes"] + '<br />',
                        '&#9;전화번호: ' + body[key]["tel"] + '<br />',
                        '   </p>',
                        '</div>'
                    ].join('')

                    let infowindow = new naver.maps.InfoWindow({
                        content: contentString
                    });

                    naver.maps.Event.addListener(marker, "click", function(e) {
                        if (infowindow.getMap()) {
                            infowindow.close();
                        } else {
                            infowindow.open(map, marker);
                        }
                    });
                    naver.maps.Event.addListener(map, "click", function(e) {
                        infowindow.close()
                    });

                    markers.push(marker)
                }
                changeSearch(searchData)
            })

        document.getElementById("fetcher").style.display = "none"
    }

    function updateMarkers() {
        let mapBounds = map.getBounds();
        let marker, position;

        for (let i = 0; i < markers.length; i++) {
            marker = markers[i]
            position = marker.getPosition();

            if (mapBounds.hasLatLng(position)) {
                showMarker(map, marker);
            } else {
                hideMarker(map, marker);
            }
        }
    }

    function showMarker(map, marker) {
        if (marker.getMap()) return;
        marker.setMap(map);
    }

    function hideMarker(map, marker) {
        if (!marker.getMap()) return;
        marker.setMap(null);
    }

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <Script type="text/javascript"
                        onLoad={initMap}
                        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=vq6cmhpbwu"/>
                <div id="map" className={styles.map} />
                <div className={styles['search-container']}>
                    <SearchResult receivedData={search} />
                </div>
                <button id={"fetcher"} className={styles["fetch-marker"]} onClick={fetchMarkers}/>
            </main>
        </div>
    )
}