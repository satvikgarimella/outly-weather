const OPENTRIPMAP_API_KEY = '5ae2e3f221c38a28845f05b611c6b7fa'; // Demo key, replace with your own for production

export const fetchPlaces = async (lat, lon, limit = 10) => {
  try {
    // Get list of places
    const resp = await fetch(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&limit=${limit}&apikey=${OPENTRIPMAP_API_KEY}`
    );
    const data = await resp.json();
    if (!data.features) return [];

    // Get details for each place
    const places = await Promise.all(
      data.features.map(async (feature) => {
        const xid = feature.properties.xid;
        const detailResp = await fetch(
          `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${OPENTRIPMAP_API_KEY}`
        );
        const detail = await detailResp.json();
        return {
          id: xid,
          type: detail.kinds ? detail.kinds.split(',')[0] : 'place',
          title: detail.name || 'Unknown Place',
          description: detail.wikipedia_extracts?.text || detail.info?.descr || 'No description available.',
          duration: '1-2 hours',
          location: detail.address?.city || detail.address?.town || detail.address?.village || '',
        };
      })
    );
    return places;
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
}; 