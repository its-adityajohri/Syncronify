interface Coordinates {
    lat: number;
    long: number;
}
import axios, { AxiosResponse } from "axios";

export default async function getPath(start: Coordinates, end: Coordinates): Promise<any> {
    try {
        const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${start.long},${start.lat};${end.long},${end.lat}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
        // `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}`,
        // `https://api.mapbox.com/search/searchbox/v1/forward?q=${query}`,
        // {
        //     params: {
        //     access_token: import.meta.env.VITE_MAP_TOKEN,
        //     },
        // }
        );
        // console.log(response.data.routes[0].geometry.coordinates)
        return response.data.routes[0].geometry.coordinates;
        // return response.data.suggestions;
    } catch (error) {
        console.error("There was an error while fetching Path:", error);
    }
}