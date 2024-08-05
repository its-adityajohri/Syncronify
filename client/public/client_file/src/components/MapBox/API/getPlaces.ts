import axios from "axios";

export default async function getPlaces(query:any) {
    try {
        const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
        // `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}`,
        // `https://api.mapbox.com/search/searchbox/v1/forward?q=${query}`,
        {
            params: {
            access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            session_token: 'bgnj',
            },
        }
        );
        console.log(response)
        return response.data.features;
        // return response.data.suggestions;
    } catch (error) {
        console.error("There was an error while fetching places:", error);
    }
}