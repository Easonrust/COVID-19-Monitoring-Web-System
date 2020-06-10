<template>
    <div>
        <div id="displayarea">
            <vue-xlsx-table @on-select-file="handleSelectedFile" class="btn">导入excel</vue-xlsx-table>
            <el-button @click="train" class="btn">开始训练</el-button>
            <br />
            <label class="param">
                预测天数
                <el-input v-model="pday" placeholder="请输入预测天数"></el-input>
            </label>
            <label class="param">
                Epochs
                <el-input v-model="epoch" placeholder="请输入训练轮数"></el-input>
            </label>
            <label class="param">
                Units
                <el-input v-model="unit" placeholder="请输入训练轮数"></el-input>
            </label>
            <label class="param">
                激活函数
                <br />
                <el-select v-model="ac" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </label>
            <div style="padding:50px" id="my">
                <canvas id="myChart" width="400px" height="100px"></canvas>
            </div>
            <div style="padding:50px" id="train">
                <canvas id="trainChart" width="400px" height="100px"></canvas>
            </div>

            <div style="padding:50px" id="predict">
                <canvas id="predictChart" width="400px" height="100px"></canvas>
            </div>
        </div>
        <div id="training" class="hide">

            
            <div class="vertical-center">
                <div
                    class="spinner-border text-primary"
                    style="width: 3rem; height: 3rem;"
                    role="status"
                >
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as tf from '@tensorflow/tfjs';
export default {
    data() {
        return {
            itraining: true,
            pday: '100',
            epoch: '100',
            unit: '128',
            myxs: [],
            myys: [],
            xs: [],
            ys: [],
            bestfit: [],
            json: null,
            trainChart: null,
            myChart: null,
            predictChart: null,
            model: null,
            outcome: [],
            options: [
                {
                    value: 'sigmoid',
                    label: 'sigmoid'
                },
                {
                    value: 'relu',
                    label: 'relu'
                },
                {
                    value: 'tanh',
                    label: 'tanh'
                }
            ],
            ac: 'sigmoid'
        };
    },
    methods: {
        handleSelectedFile(convertedData) {
            var _this = this;
            this.json = convertedData.body;
            this.myys = [];
            this.myxs = [];
            for (let i = 0; i < this.json.length; ++i) {
                this.myys.push(parseFloat(this.json[i].confirm));
                this.myxs.push(parseFloat(this.json[i].day));
            }

            var ctx = document.getElementById('myChart').getContext('2d'); // begin chart
            console.log(this.myChart);
            if (!this.myChart) {
                // Chart data and settings:
                this.myChart = new Chart(ctx, {
                    type: 'line',
                    options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
                    data: {
                        labels: _this.myxs,
                        datasets: [
                            {
                                label: 'Original dataset',

                                data: _this.myys
                            }
                        ]
                    }
                });
            } else {
                this.myChart.destroy();
                this.myChart = null;
                this.myChart = new Chart(ctx, {
                    type: 'line',
                    options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
                    data: {
                        labels: _this.myxs,
                        datasets: [
                            {
                                label: 'Original dataset',

                                data: _this.myys
                            }
                        ]
                    }
                });
            }
        },
        train() {
            if (this.myChart) {
                document.getElementById('training').className = '';
                document.getElementById('displayarea').className = 'hide';
                this.itraining = false;
                this.xs = [];
                this.ys = [];
                var aver1 = 0.0;
                var aver2 = 0.0;

                var sum1 = 0;
                var sum2 = 0;

                for (let i = 0; i < this.json.length; ++i) {
                    sum1 += parseFloat(this.json[i].confirm);
                }
                aver1 = sum1 / this.json.length;

                var temp1 = new Array(this.json.length); //定义一个临时空数组，用来存储每个数组元素与平均值的差的平方。

                for (let i = 0; i < this.json.length; i++) {
                    let dev = parseFloat(this.json[i].confirm) - aver1; //计算数组元素与平均值的差
                    temp1[i] = Math.pow(dev, 2); //计算差的平方
                }
                var powSum1 = 0; //用来存储差的平方总和

                for (let j = 0; j < temp1.length; j++) {
                    if (temp1[j].toString() != '' || temp1[j].toString() != null) {
                        powSum1 = parseFloat(powSum1) + parseFloat(temp1[j].toString()); //计算差的平方总和
                    }
                }
                var stddev1 = Math.sqrt(parseFloat(powSum1) / parseFloat(this.json.length)); //用差的平方总和除以数组长度即可得到标准差

                for (let i = 0; i < this.json.length; ++i) {
                    sum2 += parseFloat(this.json[i].day);
                }
                aver2 = sum2 / this.json.length;

                var temp2 = new Array(this.json.length); //定义一个临时空数组，用来存储每个数组元素与平均值的差的平方。

                for (let i = 0; i < this.json.length; i++) {
                    let dev = parseFloat(this.json[i].day) - aver2; //计算数组元素与平均值的差
                    temp2[i] = Math.pow(dev, 2); //计算差的平方
                }
                var powSum2 = 0; //用来存储差的平方总和

                for (let j = 0; j < temp1.length; j++) {
                    if (temp2[j].toString() != '' || temp2[j].toString() != null) {
                        powSum2 = parseFloat(powSum2) + parseFloat(temp2[j].toString()); //计算差的平方总和
                    }
                }
                var stddev2 = Math.sqrt(parseFloat(powSum2) / parseFloat(this.json.length)); //用差的平方总和除以数组长度即可得到标准差

                for (let i = 0; i < this.json.length; ++i) {
                    this.ys.push((parseFloat(this.json[i].confirm) - aver1) / stddev1);
                    this.xs.push((parseFloat(this.json[i].day) - aver2) / stddev2);
                }
                var _this = this;

                var ctx = document.getElementById('trainChart').getContext('2d');
                var ctx2 = document.getElementById('predictChart').getContext('2d');

                var model = tf.sequential();
                let Units = parseInt(_this.unit);
                model.add(tf.layers.dense({ units: Units, inputShape: [1] }));
                model.add(tf.layers.dense({ units: Units, inputShape: [Units], activation: _this.ac }));
                model.add(tf.layers.dense({ units: 1, inputShape: [Units] }));
                const optimizer = tf.train.adam(0.01);
                model.compile({ loss: 'meanSquaredError', optimizer: optimizer });
                model.fit(tf.tensor(_this.xs), tf.tensor(_this.ys), { epochs: parseInt(_this.epoch) }).then(() => {
                    _this.bestfit = model.predict(tf.tensor(_this.xs, [_this.xs.length, 1])).dataSync(); // create best-fit line from xs data
                    console.log(model.predict(tf.tensor(_this.xs, [_this.xs.length, 1])).dataSync());

                    // Chart data and settings:

                    _this.trainChart = new Chart(ctx, {
                        type: 'line',
                        options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
                        data: {
                            labels: _this.xs,
                            datasets: [
                                {
                                    label: 'Original dataset',
                                    data: _this.ys
                                },
                                {
                                    label: 'Best Fit line',
                                    data: _this.bestfit,
                                    borderWidth: 1,
                                    borderColor: '#FF0000',
                                    backgroundColor: 'rgba(1,1,1,0)'
                                }
                            ]
                        }
                    });
                    _this.xs = [];
                    var predictx = [];
                    var predicty = [];
                    _this.xs.push((parseFloat(_this.json[_this.json.length - 1].day) + 1 - aver2) / stddev2);
                    predictx.push(parseFloat(_this.json[_this.json.length - 1].day) + 1);
                    for (let i = 1; i < parseInt(_this.pday); ++i) {
                        _this.xs.push((parseFloat(predictx[i - 1]) + 1 - 68.0) / 39.6);
                        predictx.push(predictx[i - 1] + 1);
                    }
                    _this.bestfit = model.predict(tf.tensor(_this.xs, [_this.xs.length, 1])).dataSync();
                    var best = [];
                    for (let i = 0; i < this.json.length; ++i) {
                        _this.bestfit[i] = _this.bestfit[i] * stddev1 + aver1;
                        console.log(_this.bestfit[i]);
                        best.push(Math.round(_this.bestfit[i]));
                    }
                    console.log(best);
                    if (_this.predictchart) {
                        _this.predictChart.destroy();
                    }
                    _this.predictChart = new Chart(ctx2, {
                        type: 'line',
                        options: { scales: { yAxes: [{ ticks: { beginAtZero: false } }] } },
                        data: {
                            labels: predictx,
                            datasets: [
                                {
                                    label: 'Best Fit line',
                                    data: best,
                                    borderWidth: 1,
                                    borderColor: '#000000',
                                    backgroundColor: 'rgba(1,1,1,0)'
                                }
                            ]
                        }
                    });
                    document.getElementById('training').className = 'hide';
                    document.getElementById('displayarea').className = '';
                });
            } else {
                this.$message({
                    message: '没有导入任何表格!',
                    type: 'warning'
                });
            }
        }
    },
    mounted() {
        // Train the model...then:
    }
};
</script>
<style>
.param {
    margin-right: 30px;
}
.btn {
    margin-right: 30px;
}
.vertical-center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.hide {
    display: none;
}
</style>