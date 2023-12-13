<style lang="less" scoped></style>

<template>
    <div class="wrapper">
        <div class="title">滑块</div>
        <div id="chartContent" style="width: 800px; height:500px;" />
    </div>
</template>

<script lang="ts" name="DataZoom" setup>
import { onMounted } from 'vue'
import { useCurrentInstance } from '@/utils/useCurrentInstance';

const { proxy } = useCurrentInstance()


onMounted(() => {
    console.log('[ 1 ] >', 1)
    getviewbystation()
})


function getviewbystation() {
    var myChart = proxy.$echarts.init(document.getElementById('chartContent'), null);//加载图形的div
    var colors = ['#2EC7C9', '#D6737A'];//两种状态的颜色
    var state = ['正常', '故障'];//两种状态

    // echart配置
    var option = {
        color: colors,
        tooltip: {//提示框
            formatter: function (params: any) {
                return params.name + ':' + params.value[1] + '~' + params.value[2];
            }//数据的值
        },
        legend: {//图例
            data: state,
            selectedMode: false, // 图例设为不可点击
            textStyle: {
                color: '#000'
            }
        },
        grid: {//绘图网格
            left: '3%',
            right: '3%',
            top: '1%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'time',
            interval: 3600 * 12 * 1000,
            axisLabel: { formatter: function (value: string | number | Date) { var date = new Date(value); return getzf(date.getHours()) + ':' + getzf(date.getMinutes()) + '\n' + date.getDate() + '/' + (date.getMonth() + 1) + ' '; function getzf(num: string | number) { if (parseInt(num as string) < 10) { num = '0' + num; } return num; } }, },
            axisLine: { show: true, symbol: ['none', 'arrow'] },
        },
        yAxis: {
            data: ['0', '1', '2'],
            show: false
        },
        series: [
            // // 用空bar来显示四个图例
            { name: state[0], type: 'bar', data: [] },
            { name: state[1], type: 'bar', data: [] },
            {
                type: 'custom', renderItem: function (params: { coordSys: { x: any; y: any; width: any; height: any; }; }, api: { value: (arg0: number) => any; coord: (arg0: any[]) => any; style: () => any; }) {//开发者自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
                    var categoryIndex = api.value(0);//这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
                    var start = api.coord([api.value(1), categoryIndex]); // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
                    var end = api.coord([api.value(2), categoryIndex]);
                    var height = 24;//柱体宽度

                    return {
                        type: 'rect',// 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
                        shape: proxy.$echarts.graphic.clipRectByRect({ // 矩形的位置和大小。
                            x: start[0],
                            y: start[1] - height / 2,
                            width: end[0] - start[0],
                            height: height
                        }, { // 当前坐标系的包围盒。
                            x: params.coordSys.x,
                            y: params.coordSys.y,
                            width: params.coordSys.width,
                            height: params.coordSys.height
                        }),
                        style: api.style()
                    };
                },
                encode: {
                    x: [1, 2], // data 中『维度1』和『维度2』对应到 X 轴
                    y: 0// data 中『维度0』对应到 Y 轴
                },
                data: [ // 维度0 维度1 维度2
                    {
                        itemStyle: { color: colors[0] },//条形颜色
                        name: '正常',
                        value: [1, '2009/6/1 2:00', '2009/6/1 24:00']//1,1,2代表y轴的索引，后两位代表x轴数据开始和结束
                    },
                    {
                        itemStyle: { color: colors[1] },
                        name: '故障',
                        value: [1, '2009/6/2 2:00', '2009/6/2 12:00']
                    },
                    {
                        itemStyle: { color: colors[0] },
                        name: '正常',
                        value: [1, '2009/6/2 13:10', '2009/6/2 20:13']
                    },
                    {
                        itemStyle: { color: colors[1] },
                        name: '故障',
                        value: [1, '2009/6/2 21:00', '2009/6/4 1:00']
                    },
                    {
                        itemStyle: { color: colors[0] },
                        name: '正常',
                        value: [1, '2009/6/4 2:00', '2009/6/5 4:00']
                    },
                    {
                        itemStyle: { color: colors[0] },
                        name: '正常',
                        value: [1, '2009/6/13 2:00', '2009/6/21 12:00']
                    }
                ]
            }
        ],
        dataZoom: [{
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            bottom: 10,
            labelFormatter: ''
        },
        {
            type: 'inside',
            filterMode: 'weakFilter'
        }]
    };
    myChart.setOption(option);//引用
}
</script>