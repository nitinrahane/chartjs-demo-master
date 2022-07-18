

// export const data = {
//     labels,
//     datasets: [
//       {
//         fill: true,
//         label: "Dataset 3",
//         data: [1, 5, 5, 8, 15, 20, 1],
//         borderColor: "rgba(242, 223, 58, 0.5)",
//         backgroundColor:  "rgba(242, 223, 58, 0.5)",
//         tension: 0.4,
//       },
      
//       {
//         fill: true,
//         label: "Dataset 2",
//         data: [80, 5, 70, 10, 78, 100, 45],
//         borderColor: "rgba(58, 180, 242,0.5)",
//         backgroundColor:  "rgba(58, 180, 242,0.5)",
//         tension: 0.4,
//       },
//       {
//         fill: true,
//         label: "Dataset 1",
//         data: [12, 15, 70, 56, 78, 89, 67],
//         borderColor: "rgba(0, 120, 170, 0.5)",
//         backgroundColor: "rgba(0, 120, 170, 0.5)",
//         tension: 0.4,
//       },
     
//     ],
//   };


const seriesColors = [
    "rgba(0, 120, 170, 0.5)",
    "rgba(58, 180, 242,0.5)",
    "rgba(242, 223, 58, 0.5)"
];

let labels:string[] = [];
export const GetDataSetForYear = (startMonthIndex:number, endMonthIndex:number, year:number) => {

}

export const GetDataLabelsForYear = (startMonthIndex:number, endMonthIndex:number, year:number) => {

}

export const GetDataObj = (series:number[], seriesIndex:number) => {
    return {
        'fill': true,
        'label': "Dataset 3",
        'data': series,
        'borderColor': seriesColors[seriesIndex],
        'backgroundColor': seriesColors[seriesIndex],
        'tension': 0.4,
    }
}

export const GetLabels = (newlabels:string[]) => {
    labels = [...labels, ...newlabels];
    return labels;
}