<script setup lang="ts" name="Home">
import { useCurrentInstance } from '@/utils/useCurrentInstance';
import { onMounted, ref } from 'vue';
import { EChartsType } from 'echarts'
import { MENU_TYPE } from '@/utils/type.ts'
import { strToObj } from '@/utils/fun'

import { useRouter } from 'vue-router'

const router = useRouter()
const { proxy } = useCurrentInstance()

const modules = import.meta.glob('../views/**/*.vue')

// 当前存在的页面
const page = ref<MENU_TYPE[]>([])


for (const path in modules) {
    const dir = path.split('.vue')[0]
    page.value.push({
        name: strToObj(dir.split('/')[1]).name as string,
        index: strToObj(dir.split('/')[1]).index as number,
        path: dir
    })
}

onMounted(() => {
    const dom: HTMLElement = document.getElementById('chart') as HTMLElement
    const myChart = proxy.$echarts.init(dom, 'dark')
    initChart(myChart)
    myChart.on('click', clickChart)
    window.addEventListener('resize', () => {
        myChart.resize();
    })

})

function initChart(chart: EChartsType) {
    const option = {
        title: {
            text: 'learn-echarts'
        },
        xAxis: {
            type: 'category',
            data: page.value.map(item => {
                return item.name
            })
        },
        yAxis: {},
        dataset: {
            source: page.value.map(item => {
                return {
                    name: item.name,
                    data: [item.index]
                }
            })
        },
        series: [
            {
                type: 'bar'
            }
        ]
    }
    chart.setOption(option)
}

const clickChart = (params: any) => {
    const path = page.value.find(item => item.name === params.value.name)?.name
    // console.log('[ path ] >', path)
    router.push({
        path: path as string
    })
}

</script>

<template>
    <div class="wrapper">
        <div id="chart" style="width: 100%; height:100%;" />
    </div>
</template>

<style scoped>
.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
</style>
