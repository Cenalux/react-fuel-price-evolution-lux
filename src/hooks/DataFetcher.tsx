// Api url https://lustat.statec.lu/rest/data/LU1,DF_A4504,1.0/.A?startPeriod=2015&endPeriod=2022&dimensionAtObservation=AllDimensions
// Data from api is XML
// parse xml

// "id": "TIME_PERIOD",
// "value": "2015-01-01"

// "id": "PETROL",
// "value": "C01"

import { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";

interface PetrolData {
    date: string;
    e95: string | null;
    e98: string | null;
}

export default function useDataFetcher() {
    const [data, setData] = useState<PetrolData[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://lustat.statec.lu/rest/data/LU1,DF_E5301,1.0/C02+C01.A?&dimensionAtObservation=AllDimensions"
                );
                const str = await response.text();
                const parser = new XMLParser({ ignoreAttributes: false });
                const result = parser.parse(str);

                const dataSet = result["message:GenericData"]?.["message:DataSet"]?.["generic:Obs"];
                if (!dataSet) {
                    console.error("Unexpected XML structure");
                    return;
                }

                const allData: PetrolData[] = dataSet.map((obs: any) => {
                    const obsKeyValues = Array.isArray(obs["generic:ObsKey"]["generic:Value"])
                        ? obs["generic:ObsKey"]["generic:Value"]
                        : [obs["generic:ObsKey"]["generic:Value"]];

                    const date = obsKeyValues.find((val: any) => val["@_id"] === "TIME_PERIOD")?.["@_value"];
                    const petrol = obsKeyValues.find((val: any) => val["@_id"] === "PETROL")?.["@_value"];
                    const obsValue = obs["generic:ObsValue"]?.["@_value"];

                    return {
                        date: date || '',
                        e95: petrol === "C01" ? obsValue : null,
                        e98: petrol === "C02" ? obsValue : null,
                    };
                });

                const mergedData: { [key: string]: PetrolData } = {};

                allData.forEach(item => {
                    if (!mergedData[item.date]) {
                        mergedData[item.date] = { date: item.date, e95: null, e98: null };
                    }
                    if (item.e95) mergedData[item.date].e95 = item.e95;
                    if (item.e98) mergedData[item.date].e98 = item.e98;
                });

                const sortedData = Object.values(mergedData).sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );

                setData(sortedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return { datePetrolData: data };
}
