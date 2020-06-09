<template>
    <div id="dashboard">
        <el-button @click="download">下载数据</el-button>
        <el-button @click="upload">导入数据</el-button>
        <input id="file" type="file" accept=".json" />

        <div v-if="dataCurrent && shouldRender">
            <div>
                <div>
                    <!--          header section -->
                    <div class="covid_header">
                        <div>
                            <vSelect
                                class="select"
                                :clearable="false"
                                :value="currentCountry"
                                :options="countryList"
                                @input="switchCountry"
                            ></vSelect>
                        </div>
                        <!-- <div class="header_title">
                        <h2>COVID-19</h2>
                        <h3 v-html="$t('title')"></h3>
                        </div>-->
                    </div>

                    <!--            UK number display and postcode -->
                    <!-- <UkRegionSection v-if="dataCurrent.isUk && dataUk" :dataUk="dataUk"></UkRegionSection> -->

                    <!--            time machine -->
                    <div v-if="!dataCurrent.isUk">
                        <div class="title">{{ $t('subtitles.timeMachine') }}</div>
                        <div class="mBlock">
                            <SlideController
                                :start-date="startDate"
                                :end-date="endDate"
                                :hidePlayButton="true"
                                :disableClick="true"
                                :current-date="currentDate"
                                @changeIndex="changeDateIdx"
                                @change="changeDate"
                                @dragEnded="onTMDragEnd"
                                :enableEvenIfPaused="true"
                                :playing="false"
                            ></SlideController>
                            <div
                                class="displayInfo"
                                style="text-align: center; opacity:0.5;padding-top:6px"
                            >
                                {{ $t('tmHint')
                                }}
                            </div>
                        </div>
                    </div>
                    <!--            number display-->
                    <div class="datadisplay">
                        <div class="displaysection">
                            <div id="todaynumber" class="section">
                                <TodayNumberSection :display="display"></TodayNumberSection>
                            </div>

                            <div id="ratio" class="section">
                                <div class="title">{{ $t('subtitles.ratio') }}</div>
                                <PieSection
                                    class="pie"
                                    :allHistoryData="dataCurrent.history"
                                    :mainDate="mainDate"
                                ></PieSection>
                            </div>
                        </div>
                        <div class="displaysection">
                            <ChartSection
                                class="chart"
                                :chart-data="chartData ? chartData : dataCurrent.history"
                                :is-uk="dataCurrent.isUk"
                            ></ChartSection>
                        </div>
                    </div>
                </div>

                <!--            nav bar -->
                <!-- <div id="navPlaceholder" ref="navPlaceholder" v-if="!desktopLayout"></div>
                <div class="mNav" ref="nav" id="mNavbar" v-if="!desktopLayout">
                    <ul
                        class="nav nav-pills nav-fill"
                        v-scroll-spy-active="{selector: 'li a', class: 'active'}"
                    >
                        <li class="nav-item">
                            <a class="nav-link" href="#charts">{{ $t('nav.current') }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#animation">{{ $t('nav.animation') }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#regionData">{{ $t('nav.map') }}</a>
                        </li>
                    </ul>
                </div>

                <div
                    :class="{'d-flex': desktopLayout}"
                    v-scroll-spy="{data: 'section', offset: 100, allowNoActive: false}"
                >
                    
                    <div class="mSection" v-if="!desktopLayout" id="charts" style="padding-top: 0">
                        <ChartSection
                            :chart-data="chartData ? chartData : dataCurrent.history"
                            :is-uk="dataCurrent.isUk"
                        ></ChartSection>
                    </div>

                   
                    <div
                        class="mSection"
                        :class="{'mSectionDesktop': desktopLayout}"
                        id="animation"
                    >
                        <div class="title">{{ $t('subtitles.historyAnimation') }}</div>
                        <BarRaceSection
                            v-if="tableData.hasData"
                            :table-data="tableData"
                            :is-uk="dataCurrent.isUk"
                        ></BarRaceSection>
                        <div class="title">{{ $t('subtitles.ratio') }}</div>
                        <PieSection :allHistoryData="dataCurrent.history" :mainDate="mainDate"></PieSection>
                        <div class="title">{{ $t('subtitles.countryCompare') }}</div>
                        <CountryCompareSection
                            :global-data="dataGlobal"
                            :country-list="countryList"
                        ></CountryCompareSection>
                    </div>

                   
                    <div
                        class="mSection"
                        :class="{'mSectionDesktop': desktopLayout}"
                        id="regionData"
                    >
                        <div class="title">{{ $t('subtitles.map') }}</div>
                        <MapSection
                            :tableData="tableData"
                            :countryName="countryName"
                            :mainDate="mainDate"
                        ></MapSection>
                        <br />
                        <div class="title">{{ $t('subtitles.regionList') }}</div>
                        <RegionTable
                            :regionData="tableData"
                            v-if="tableData.hasData"
                            :mainDate="mainDate"
                            :is-uk="dataCurrent.isUk"
                            @switchCountry="switchCountry"
                            :current-country="currentCountry"
                            :desktop-layout="desktopLayout"
                        ></RegionTable>
                    </div>
                </div>-->
            </div>

            <!-- 
            <div v-if="isMiniApp && isLocaleCN && !showWechatPopup">
                <MiniAppPostOverlay></MiniAppPostOverlay>
            </div>

            <FAB v-if="isDesktop" @switchLayout="desktopLayout=$event"></FAB>-->
        </div>

        <!--        loading indicator -->
        <div v-else>
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

        <!--        launch indicator -->
        <!-- <div
            class="fix_bottom"
            style="font-size: 14px;font-weight: bold;"
            :class="{'hide-popup': !showWechatPopup}"
        >{{launchIndicator}}</div>-->
    </div>
</template>

<script>
/* eslint-disable */
import RegionTable from '../RegionTable.vue';
import UkRegionSection from '../UkRegionSection.vue';
import TodayNumberSection from '../TodayNumberSection.vue';
import BarRaceSection from '../BarRaceSection.vue';
import MapSection from '../MapSection.vue';
import ChartSection from '../ChartSection.vue';
import SlideController from '../SlideController.vue';
import PieSection from '../PieSection.vue';
import CountryCompareSection from '../CountryCompareSection.vue';
import MiniAppPostOverlay from '../MiniAppPostOverlay.vue';
import ShareIcons from '../ShareIcons.vue';
import NearbyCasesFinder from '../NearbyCasesFinder.vue';
import FAB from '../FAB.vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import $ from 'jquery';
import FileSaver from 'file-saver';
import {
    getRegionHistoryTableData,
    getGlobalHistoryTableData,
    parseLocationData,
    getAllCountries,
    getCountryData,
    getCountryHistoryData,
    getUSRegionData
} from '../../js/locationUtils';

const moment = require('moment');

export default {
    components: {
        RegionTable,
        BarRaceSection,
        ChartSection,
        PieSection,
        TodayNumberSection,
        UkRegionSection,
        vSelect,
        MapSection,
        SlideController,
        CountryCompareSection,
        MiniAppPostOverlay,
        ShareIcons,
        NearbyCasesFinder,
        FAB
    },
    data: () => {
        return {
            shouldRender: true,
            dataCurrent: null,
            dataUk: null,
            dataGlobal: null,
            sortedRegionData: null,
            section: 0,
            currentCountry: null,
            countryList: [],
            display: {
                confirmed: 0,
                confirmedChange: 0,
                deaths: 0,
                deathsChange: 0,
                tested: 0,
                testedChange: 0,
                cured: 0,
                curedChange: 0
            },
            tableData: {
                hasData: false
            },
            chartData: null,
            isLocaleCN: false,
            showWechatPopup: true,
            currentDate: null,
            mainDate: null,
            lastUpdated: 'NEVER',
            launchIndicator: '',
            isDesktop: false,
            desktopLayout: false,
            myjson: null
        };
    },
    mounted() {
        let username = localStorage.getItem('ms_username');
        var _this = this;
        $.ajax({
            url: 'http://123.57.229.179:8083/user/getCountry',
            data: 'name=' + username,
            type: 'POST',
            datatype: 'text',
            complete: function(data) {
                if (data.status == 200) {
                    console.log(data.responseText);
                    _this.switchCountry(data.responseText);
                }
            }
        });

        window.dateFormat = 'DD MMM';
        let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (this.isWeChat()) {
            this.$i18n.locale = 'zh';
        }
        // miniapp china redirect
        // if (this.isMiniApp && timeZone == "Asia/Shanghai") {
        //     window.location.replace("https://uclcssa.cn/public/covid_redirect.html");
        //     window.ga('send', 'event', "china-redirected", "mini-app-tab", "");
        //     return;
        // }
        this.isLocaleCN = this.$i18n.locale === 'zh';
        document.title = this.$t('pageTitle');
        window.dateFormat = this.$t('dateFormat');
        this.launchIndicator = this.$t('launchIndicator')[Math.floor(Math.random() * this.$t('launchIndicator').length)];

        let performanceTimeStart = performance.now();
        let data = JSON.parse(localStorage.getItem('data'));
        if (!data) {
            fetch('https://henryz.cc/projects/covid/api.php').then(async res => {
                let data = await res.json();
                var str = JSON.stringify(data);
                localStorage.setItem('data', str);
                this.myjson = str;
                let resTime = Math.round(performance.now() - performanceTimeStart);
                this.dataUk = data.uk;
                this.dataUs = data.us;
                this.dataGlobal = data.global;
                console.log(data.global);
                this.lastUpdated = `Global data updated ${moment(data.global.confirmed.last_updated).fromNow()},
                          UK data updated ${moment(data.uk.now[0].ts).fromNow()}, data is ${data.isUpToDate ? '' : 'NOT'} up to date.
                          Data might not reflect the real number, and might be delayed.`;
                //global data
                this.tableData.global = getGlobalHistoryTableData(this.dataGlobal, false, true);
                let countryArr = getAllCountries(this.dataGlobal.confirmed.locations);
                this.countryList = [this.$t('selector.world'), this.$t('selector.uk'), this.$t('selector.us'), ...countryArr];
                this.initLocation(timeZone);

                this.getNavScrollAnchor();
                let performanceTime = Math.round(performance.now() - performanceTimeStart);
                console.log('Data loaded', resTime, performanceTime);
                window.ga('send', 'event', 'net-request', 'initial-fetch-loaded', `loaded-${resTime}ms;calculated-${performanceTime}ms;`);
            });
        } else {
            let resTime = Math.round(performance.now() - performanceTimeStart);
            this.dataUk = data.uk;
            this.dataUs = data.us;
            this.dataGlobal = data.global;
            console.log(data);
            this.lastUpdated = `Global data updated ${moment(data.global.confirmed.last_updated).fromNow()},
                          UK data updated ${moment(data.uk.now[0].ts).fromNow()}, data is ${data.isUpToDate ? '' : 'NOT'} up to date.
                          Data might not reflect the real number, and might be delayed.`;
            //global data
            this.tableData.global = getGlobalHistoryTableData(this.dataGlobal, false, true);
            let countryArr = getAllCountries(this.dataGlobal.confirmed.locations);
            this.countryList = [this.$t('selector.world'), this.$t('selector.uk'), this.$t('selector.us'), ...countryArr];
            this.initLocation(timeZone);

            this.getNavScrollAnchor();
            let performanceTime = Math.round(performance.now() - performanceTimeStart);
            console.log('Data loaded', resTime, performanceTime);
            window.ga('send', 'event', 'net-request', 'initial-fetch-loaded', `loaded-${resTime}ms;calculated-${performanceTime}ms;`);
        }
    },
    methods: {
        initLocation: function(timezone) {
            if (timezone.includes('Europe/London') || this.isMiniApp) {
                this.currentCountry = this.countryList[1];
                this.loadUkData();
            } else if (timezone.includes('America')) {
                this.currentCountry = this.countryList[2];
                this.loadUsData();
            } else {
                this.currentCountry = this.countryList[0];
                this.loadCountryData('world');
            }
            window.ga('send', 'event', 'timezone-acquired', this.currentCountry, timezone);
        },
        switchCountry: async function(e) {
            this.shouldRender = false;
            console.log(e);
            this.chartData = null;
            this.currentCountry = e;
            window.ga('send', 'event', 'country', 'country-changed', e);
            if (e === this.countryList[0]) {
                this.loadCountryData('world');
            } else if (e === this.countryList[1]) {
                this.loadUkData();
            } else if (e === this.countryList[2] || e === 'US') {
                await this.loadUsData();
            } else {
                this.loadCountryData(e);
            }
            this.forceReload();
        },
        loadCountryData: function(countryName) {
            this.countryName = countryName;
            let countryData = getCountryData(this.dataGlobal, countryName);
            console.log(countryData.confirmed.locations);
            this.dataCurrent = {};
            this.dataCurrent.isUk = false;
            //history data
            //console.log("data loaded", countryData);
            this.tableData.country = countryName === 'world' ? null : getGlobalHistoryTableData(countryData, true);
            this.tableData.hasData = true;
            this.dataCurrent.history = getCountryHistoryData(countryData);
            console.log('country loaded', this.dataCurrent);
            this.startDate = moment(this.dataCurrent.history[0].date).format(window.dateFormat);
            this.endDate = moment(this.dataCurrent.history[this.dataCurrent.history.length - 1].date).format(window.dateFormat);
            this.currentDate = this.endDate;
            this.calculateDisplay(this.dataCurrent.history.length - 1);
        },
        loadUsData: async function() {
            this.loadCountryData('US');
            this.tableData.country = await getUSRegionData(this.dataUs);
        },
        calculateDisplay: function(idx) {
            let current = this.dataCurrent.history[idx];
            let last = this.dataCurrent.history[idx - 1] ? this.dataCurrent.history[idx - 1] : current;
            this.display = {
                confirmed: current.confirmed,
                confirmedChange: current.confirmed - last.confirmed,
                deaths: current.death,
                deathsChange: current.death - last.death,
                tested: current.tested,
                testedChange: current.tested ?? current.tested - last.tested,
                cured: current.cured,
                curedChange: current.cured - last.cured
            };
        },
        loadUkData: function() {
            this.countryName = 'UK';
            this.dataCurrent = this.dataUk;
            this.dataCurrent.isUk = true;
            let currentUkAreaData = parseLocationData(this.dataUk.now[0].area);
            //history data
            let todayData = this.dataUk.history[this.dataUk.history.length - 1];
            let yesterData = this.dataUk.history[this.dataUk.history.length - 2];
            this.tableData.country = getRegionHistoryTableData(this.dataUk.history, currentUkAreaData);
            console.log(currentUkAreaData);

            this.sortedRegionData = [...currentUkAreaData].sort((a, b) => b.number - a.number);
            this.tableData.hasData = true;
            this.currentDate = null;

            let confirmedChange = this.dataUk.now[0].confirmed - todayData.confirmed;
            let deathsChange = this.dataUk.now[0].death - todayData.death;
            let testedChange = this.dataUk.now[0].tested - todayData.tested;

            this.display = {
                confirmed: this.dataUk.now[0].confirmed,
                confirmedChange: confirmedChange != 0 ? confirmedChange : todayData.confirmed - yesterData.confirmed,
                deaths: this.dataUk.now[0].death,
                deathsChange: deathsChange != 0 ? deathsChange : todayData.death - yesterData.death,
                tested: this.dataUk.now[0].tested,
                testedChange: testedChange != 0 ? testedChange : todayData.tested - yesterData.tested,
                cured: this.dataUk.now[1].cured,
                curedChange: this.dataUk.now[1].cured - todayData.cured
            };
        },
        changeDateIdx: function(idx) {
            this.calculateDisplay(idx);
        },
        changeDate: function(date) {
            this.currentDate = date;
        },
        onTMDragEnd: function(idx) {
            console.log(idx);
            this.chartData = this.dataCurrent.history.slice(0, idx);
            this.mainDate = this.currentDate;
            window.ga('send', 'event', 'time-machine', 'drag-end', idx);
        },
        revertTM: function() {
            console.log('OK');
            this.currentDate = this.endDate;
            this.chartData = this.dataCurrent.history;
            this.calculateDisplay(this.dataCurrent.history.length - 1);
            window.ga('send', 'event', 'time-machine', 'reverted', this.endDate);
        },
        changeLang: function(lang) {
            this.$i18n.locale = lang;
            this.isLocaleCN = this.$i18n.locale === 'zh';
            document.title = this.$t('pageTitle');
            this.countryList[0] = this.$t('selector.world');
            this.countryList[1] = this.$t('selector.uk');
            this.countryList[2] = this.$t('selector.us');
            // this.currentCountry = this.countryList[0];
            this.forceReload();
        },
        forceReload: function() {
            //force reload
            this.shouldRender = false;
            this.$nextTick(() => {
                this.shouldRender = true;
            });
        },
        isWeChat: function() {
            let ua = window.navigator.userAgent.toLowerCase();
            return ua.match(/MicroMessenger/i) == 'micromessenger';
        },
        getNavScrollAnchor: function() {
            document.addEventListener('scroll', () => {
                if (this.$refs['navPlaceholder']) {
                    if (window.scrollY > this.$refs['navPlaceholder'].offsetTop) {
                        this.$refs['nav'].classList.add('fixed_nav');
                        this.$refs['navPlaceholder'].classList.add('navPlaceholder');
                    } else {
                        this.$refs['nav'].classList.remove('fixed_nav');
                        this.$refs['navPlaceholder'].classList.remove('navPlaceholder');
                    }
                }
            });

            let checkLayout = () => {
                this.isDesktop = window.innerWidth > 1200;
                this.desktopLayout = window.innerWidth > 1400;
            };

            window.onresize = checkLayout;
            checkLayout();
        },
        download() {
            const blob = new Blob([this.myjson], { type: '' });
            FileSaver.saveAs(blob, 'data.json');
        },
        upload() {
            const file = document.getElementById('file').files[0];
            const reader = new FileReader();
            reader.readAsText(file);
            const _this = this;
            reader.onload = function() {
                // this.result为读取到的json字符串，需转成json对象
                let data = JSON.parse(this.result);
                // 检测是否导入成功
                let performanceTimeStart = performance.now();
                let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                let resTime = Math.round(performance.now() - performanceTimeStart);
                _this.dataUk = data.uk;
                _this.dataUs = data.us;
                _this.dataGlobal = data.global;
                console.log(data);
                _this.lastUpdated = `Global data updated ${moment(data.global.confirmed.last_updated).fromNow()},
                          UK data updated ${moment(data.uk.now[0].ts).fromNow()}, data is ${data.isUpToDate ? '' : 'NOT'} up to date.
                          Data might not reflect the real number, and might be delayed.`;
                //global data
                _this.tableData.global = getGlobalHistoryTableData(_this.dataGlobal, false, true);
                let countryArr = getAllCountries(_this.dataGlobal.confirmed.locations);
                _this.countryList = [_this.$t('selector.world'), _this.$t('selector.uk'), _this.$t('selector.us'), ...countryArr];
                _this.initLocation(timeZone);

                _this.getNavScrollAnchor();
                let performanceTime = Math.round(performance.now() - performanceTimeStart);
                console.log('Data loaded', resTime, performanceTime);
                window.ga('send', 'event', 'net-request', 'initial-fetch-loaded', `loaded-${resTime}ms;calculated-${performanceTime}ms;`);
            };
        }
    },
    computed: {
        isMiniApp: function() {
            // WeChat Mini app
            let url = new URL(window.location.href);
            let query = url.searchParams.get('source');
            return query === 'apptab';
        }
    },
    watch: {
        desktopLayout: function() {
            this.forceReload();
        }
    }
};
</script>

<style scoped>
.title {
    font-size: 20px;
    margin: 30px 0px 15px 0;
    line-height: 22px;
    padding: 0;
    padding-left: 10px;
    border-left: 6px solid rgb(0, 195, 255);
    font-weight: bold;
}
.vertical-center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.pie {
    width: 100%;
    margin: auto;
}
.chart {
    width: 100%;
}
#dashboard {
    overflow: scroll;
}
.datadisplay {
    display: flex;
    flex-direction: row;
}
.displaysection {
    width: 50%;
}
</style>


