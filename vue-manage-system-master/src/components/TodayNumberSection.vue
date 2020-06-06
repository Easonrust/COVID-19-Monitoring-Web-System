<template>
    <div>
        <div class="title">今日概览</div>
        <div class="overview mBlock">
            <div class="overview_item" style="color: #ff5151;">
                <div class="overview_title">{{ $t('totalConfirmed') }}</div>
                <div class="overview_number"><ICountUp :endVal="displayData.confirmed"/></div>
                <div class="daily-increase">{{ '+' + display.confirmedChange }}</div>
            </div>
            <div class="overview_item" style="color: #575757;">
                <div class="overview_title">{{ $t('totalDeaths') }}</div>
                <div class="overview_number"><ICountUp :endVal="displayData.deaths "/></div>
                <div class="daily-increase">{{ '+' + display.deathsChange}}</div>
            </div>
            <div class="overview_item" style="color: #0094b9;" v-if="display.tested">
                <div class="overview_title">{{ $t('totalTests') }}</div>
                <div class="overview_number"><ICountUp :endVal=" displayData.tested "/></div>
                <div class="daily-increase"> {{ '+' + display.testedChange }} </div>
            </div>
            <div class="overview_item" style="color: #28ca00;">
                <div class="overview_title">{{ $t('totalCured') }}</div>
                <div class="overview_number"><ICountUp :endVal=" displayData.cured "/></div>
                <div class="daily-increase">{{ '+' + display.curedChange }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import ICountUp from 'vue-countup-v2';
    let timeout = null;
    export default {
        name: "TodayNumberSection",
        props: ["display"],
        data: function(){
            return {
                displayData: {
                    confirmed: 0,
                    deaths: 0,
                    tested: 0,
                    cured: 0
                }
            }
        },
        watch: {
          display: function () {
              this.updateDisplay()
          }
        },
        mounted(){
            this.updateDisplay()
        },
        methods:{
          updateDisplay(){
              clearTimeout(timeout);
              timeout = setTimeout(()=>{
                  this.displayData = this.display;
              },100);
          }
        },
        components:{
            ICountUp
        }
    }
</script>

<style scoped>
.title {
  font-size: 20px;
  margin: 30px 0px 15px 0;
  line-height: 22px;
  padding: 0;
  padding-left: 10px;
  border-left: 6px solid rgb(0, 195, 255);
}

.mBlock {
  background: white;
  box-shadow: 0px 30px 50px -2px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  color: #252525;
}

.overview {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  text-overflow: fade;
  white-space: nowrap;
  overflow-x: hidden;
  border: #252525 solid;
}

.overview_item {
  margin: 1px 15px;
  text-align: center;
  width: 25% !important;
}

.overview_number {
  font-size: 2.0em;
  padding-top:3px;
}

</style>