<template>
    <div id="section">
        <vue-xlsx-table @on-select-file="handleSelectedFile">导入excel</vue-xlsx-table>
        <el-button @click="getjson">可视化观看</el-button>
        <div id="globalArea"></div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            json: null,
            controller: null
        };
    },
    methods: {
        handleSelectedFile(convertedData) {
            console.log(JSON.stringify(convertedData));
            this.json = JSON.stringify(convertedData);
        },
        getjson() {
            var data = JSON.parse(this.json);
            
            this.controller.addData(data.body);
            console.log(this.controller);
        }
    },
    mounted() {
        var container = document.getElementById('globalArea');

        // create controller for the IO globe, input the container as the parameter

        this.controller = new GIO.Controller(container);
        this.controller.init();
    }
};
</script>
<style scoped>
#section {
    width: 100%;
    height: 100%;
}
#globalArea {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
}
</style>
