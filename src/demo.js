
const chart = require('./local-modules/terminal-charts')
const { bar, scatter, bg, fg, heatmap } = chart;

const EDemo = {
    SCATTER: 1,
    BAR: 2,
}

class Demo {
    // A class for showing off demos
    chartDemo(eChartDemo = EDemo.SCATTER) {

        switch (eChartDemo) {
            case EDemo.SCATTER:
                this.scatterDemo();
                break;
            case EDemo.BAR:
                this.barDemo();
                break;
        }

    }

    scatterDemo() {


        // Scatter
        const scatterData = []

        for (let i = 1; i < 17; i++) {
            i < 6 ? scatterData.push({ key: 'A', value: [i, i], style: fg('red', '*') })
                : scatterData.push({ key: 'A', value: [i, 6], style: fg('red', '*') })
        }

        scatterData.push({ key: 'B', value: [2, 6], style: fg('blue', '# '), sides: [2, 2] })
        scatterData.push({ key: 'C', value: [6, 9], style: bg('cyan', 2) })

        console.log(scatter(scatterData, { legendGap: 18, width: 15 }) + '\n')
    }

    barDemo() {
        const barData = [
            { key: 'A', value: 5, style: '*' },
            { key: 'B', value: 3, style: '+' },
            { key: 'C', value: 11 },
            { key: 'D', value: 1, style: bg('red') },
            { key: 'E', value: 5, style: bg('green') },
            { key: 'F', value: 7, style: bg('blue'), padding: 10 },
            { key: 'G', value: 0, style: bg('yellow') }
        ]

        console.log(bar(barData))
    }

    heatmap() {


        const heatmap_plots = [];
        const SIZE_SQUARE = 2
        const WEEKS = 15
        for (let i = 1; i < 13; i++) {
            i < 6 ? heatmap_plots.push({ key: '1+', value: [i, i], style: bg('red', SIZE_SQUARE) })
                : heatmap_plots.push({ key: '1+', value: [i, 6], style: bg('red', SIZE_SQUARE) })
        }

        heatmap_plots.push({ key: '3+', value: [2, 6], style: bg('blue', SIZE_SQUARE) })
        heatmap_plots.push({ key: '3+', value: [0, 6], style: bg('blue', SIZE_SQUARE) })
        heatmap_plots.push({ key: '3+', value: [14, 1], style: bg('blue', SIZE_SQUARE) })
        heatmap_plots.push({ key: '3+', value: [0, 2], style: bg('blue', SIZE_SQUARE) }) //This appears. but below 2 not.
        heatmap_plots.push({ key: '3+', value: [0, 1], style: bg('blue', SIZE_SQUARE) })
        heatmap_plots.push({ key: '3+', value: [0, 0], style: bg('blue', SIZE_SQUARE) })

        heatmap_plots.push({ key: '5+', value: [6, 0], style: bg('cyan', SIZE_SQUARE) })

        console.log(heatmap(heatmap_plots, { width: WEEKS, hName: "", vName: "", startsHAxis: 0, left: 4 }) + '\n')

    }



}


module.exports = { Demo, EDemo };

