<style lang="less" scoped>
.wrapper {
    display: flex;
}
</style>
<template>
    <div>
        <div class="title">图表大小</div>
        <div class="wrapper">
            <div id="chart1" style="width: 300px; height: 300px;" />
            <div id="chart2" />
        </div>

    </div>
</template>

<script setup name="Init" lang="ts">
import { useCurrentInstance } from '@/utils/useCurrentInstance';
import { ECharts } from 'echarts';
import { onMounted, onUnmounted, ref } from 'vue';


const { proxy } = useCurrentInstance()
const myChart1 = ref<null | ECharts>(null),
    myChart12 = ref<null | ECharts>(null)

onMounted(() => {
    myChart1.value = proxy.$echarts.init(document.getElementById('chart1') as HTMLDivElement, 'dark')
    initChart(myChart1.value, '父元素设置宽高')

    myChart12.value = proxy.$echarts.init(document.getElementById('chart2') as HTMLDivElement, 'dark', { width: 300, height: 300 })
    initChart(myChart12.value, '在初始化设置宽高')
})

onUnmounted(() => {
    myChart1.value?.dispose()
    myChart12.value?.dispose()
})

const initChart = (chart: any, title: string) => {
    chart?.setOption({
        title: {
            text: title,
            left: 'center'
        }
    })
}

</script>