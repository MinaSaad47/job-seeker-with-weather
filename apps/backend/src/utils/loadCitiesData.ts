interface City {
  name: string;
  lon: number;
  lat: number;
}

interface CityDataObject {
  [country: string]: City[];
}

export default function loadCitiesData(data: any[]): CityDataObject {
  const parsedData: CityDataObject = {};

  data.forEach((item) => {
    const country = item.country;
    if (!parsedData[country]) {
      parsedData[country] = [];
    }
    parsedData[country].push({
      name: item.name,
      lon: item.coord.lon,
      lat: item.coord.lat,
    });
  });

  for (const country in parsedData) {
    parsedData[country].sort((a, b) => a.name.localeCompare(b.name));
  }

  return parsedData;
}
