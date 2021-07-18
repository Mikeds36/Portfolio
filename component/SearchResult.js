import styles from '../styles/Maps.module.css'

export default function SearchResult({receivedData, markers, map}) {

    function panToData(lat, lng, i) {
        let position = new naver.maps.LatLng(lat, lng)
        map.setZoom(15, true);
        map.panTo(position)

        setTimeout(function () {
            naver.maps.Event.trigger(markers[i], "click")
        }
        , 1000)
    }
    return (
        <div>
            {
                receivedData.map((d, i) => (
                    <div key={i}
                         className={styles["search-data"]}
                         onClick={() => {
                        panToData(d["latitude"], d["longitude"], i)
                    }}>{d.name}</div>
                ))
            }
        </div>
    )
}