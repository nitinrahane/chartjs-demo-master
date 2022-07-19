import mockData from "../utils/data";

const seriesColors = [
    "rgba(0, 120, 170, 0.5)",
    "rgba(58, 180, 242,0.5)",
    "rgba(242, 223, 58, 0.5)"
];

const seriesIndex:any = {
    "d1":0,
    "d2":1,
    "d3":2
};


const step = 0.083;
const months = Array.from({ length: 12 }, (item, i) => {
  return new Date(0, i).toLocaleString("en-US", { month: "short" });
});

const getMonthIndex = (value: number) => {
    let strValue = value.toString().split('.');
    return !!strValue && strValue.length > 1 ? Math.ceil(Number('0.' + strValue[1]) / step) : 0;
};

const getYear = (value: number) => {
    let strValue = value.toString().split('.');
    return Number(strValue[0]);
};

type params = {
    "minValueMonth":number,
    "minValueYear":number,
    "maxValueMonth":number,
    "maxValueYear":number,
    "seriesName":string,
    "type":string
}

export const GetDataForChart = (selectedMinValue: number, selectedMaxValue: number, type: string) => {
    let labels: string[] = [];
    const params: params = {
        "minValueMonth": 0,
        "minValueYear": 0,
        "maxValueMonth": 0,
        "maxValueYear": 0,
        "seriesName": "",
        "type": type
    };
    params.minValueMonth = getMonthIndex(selectedMinValue);
    params.minValueYear = getYear(selectedMinValue);
    params.maxValueMonth = getMonthIndex(selectedMaxValue);
    params.maxValueYear = getYear(selectedMaxValue);

    const series = Object.keys(seriesIndex);
    const seriesData: any = [];
    series.forEach((key, index) => {
        params.seriesName = key;
        let curSeriesInfo = GetDatasetForSeries(params);
        seriesData.push(curSeriesInfo.currentSeriesInfo);
        if (index == 0) {
            labels = curSeriesInfo.labels;
        }
    });
    return {
        labels,
        datasets: [...seriesData]
    }
}

export const GetDatasetForSeries = (params: params) => {   
    let dataWithSeriesAndYear = GetDataSetToProccesFromData(params);
    let labels:string[]=[];
    let series:number[]=[];
    if (!!dataWithSeriesAndYear && dataWithSeriesAndYear.length > 0) {
        for (let i = params.minValueYear; i <= params.maxValueYear; i++) {
           let currentYearSeries = GetDatasetForYear(params, i, dataWithSeriesAndYear);
           series = [...series, ...currentYearSeries.currentSeries];
           labels = [...labels, ...currentYearSeries.currentSeriesLabels];
        }
    }
    const currentSeriesInfo = GetDataObj(series, seriesIndex[params.seriesName], params.seriesName);
    return {currentSeriesInfo, labels};
}

export const GetDataSetToProccesFromData = (params: params) => {
    let dataWithSeriesAndYear: any[] = [];
    const demandTypeData = mockData.filter(x => x.demandType === params.seriesName);
    if (!!demandTypeData && demandTypeData.length > 0) {
        const currentTypeData = demandTypeData[0].data.filter(x => x.type == params.type);
        if (!!currentTypeData && currentTypeData.length > 0) {
            dataWithSeriesAndYear = currentTypeData[0].data;
        }
    }
    return dataWithSeriesAndYear;
}

export const GetDatasetForYear = (params: params, currentYear: number, dataSet: any[]) => {
    let currentSeries: number[] = [];
    let currentSeriesLabels: string[] = [];
    let currentYearDataset = dataSet.filter(x => x.year === currentYear);
    if (!!currentYearDataset && currentYearDataset.length > 0) {
        const currentYearSeries = currentYearDataset[0].data;
        switch (true) {
            case (currentYear === params.minValueYear && currentYear === params.maxValueYear): {
                currentSeries = currentYearSeries.slice(params.minValueMonth, params.maxValueMonth + 1);
                currentSeriesLabels = months.slice(params.minValueMonth, params.maxValueMonth + 1);
                break;
            }
            case (currentYear === params.minValueYear): {
                currentSeries = currentYearSeries.slice(params.minValueMonth);
                currentSeriesLabels = months.slice(params.minValueMonth);
                break;
            }
            case (currentYear === params.maxValueYear): {
                currentSeries = currentYearSeries.slice(0, params.maxValueMonth + 1);
                currentSeriesLabels = months.slice(0, params.maxValueMonth + 1);
                break;
            }
            case (currentYear > params.minValueYear && currentYear < params.maxValueYear): {
                currentSeries = currentYearSeries.slice();
                currentSeriesLabels = months.slice();
                break;
            }
            default:
                break;
        }
    }
    return {currentSeries, currentSeriesLabels};
}

export const GetDataLabelsForYear = (params:params) => {

}

export const GetDataObj = (series:number[], seriesIndex:number, seriesName:string) => {
    return {
        'fill': true,
        'label': seriesName,
        'data': series,
        'borderColor': seriesColors[seriesIndex],
        'backgroundColor': seriesColors[seriesIndex],
        'tension': 0.4,
        // 'pointRadius':0,
        // 'pointHiverRadius':0
    }
}