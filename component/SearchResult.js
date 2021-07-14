export default function SearchResult({receivedData}) {
    return (
        <div>
            {
                receivedData.map((d, i) => (
                    <div key={i}>{d.name}</div>
                ))
            }
        </div>
    )
}