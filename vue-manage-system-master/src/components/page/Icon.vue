<template>
    <div id="globe">
        <vue-xlsx-table @on-select-file="handleSelectedFile" id="excel">导入excel</vue-xlsx-table>
        <div id="filter">
            <label>
                请选择一个城市：
                <el-input v-model="countryName" placeholder="请输入国家"></el-input>
            </label>
            <el-button type="success" @click="search">查询</el-button>
            <el-button type="primary" @click="getjson">可视化观看</el-button>
        </div>
        <div id="globalArea"></div>
        <div id="summary-live-stats"></div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    data: function() {
        return {
            countryName: 'China',
            controller: null,
            json: null,
            countries: [],
            settings: {
                async: true,
                crossDomain: true,
                url: 'https://covid-19-data.p.rapidapi.com/help/countries?format=json',
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
                    'x-rapidapi-key': 'fd63c3399fmshd494536bca7b420p1ac258jsn1ad4b6d3ddff'
                }
            },
            selectedCountry: { name: 'China', alpha2code: 'CN' },
            configs: {
                control: {
                    stats: false,
                    disableUnmentioned: false,
                    lightenMentioned: true,
                    inOnly: false,
                    outOnly: false,
                    initCountry: 'CN',
                    halo: true
                },
                color: {
                    surface: 0xffffff,
                    selected: 0xb02f2b,
                    in: 0x154492,
                    out: 0xdd380c,
                    halo: 0xffffff
                },
                brightness: {
                    ocean: 0.8,
                    mentioned: 0.8,
                    related: 0.5
                }
            }
        };
    },
    mounted() {
        var _this = this;
        var container = document.getElementById('globalArea');

        let username = localStorage.getItem('ms_username');
        $.ajax({
            url: 'http://123.57.229.179:8083/user/getCountry',
            data: 'name=' + username,
            type: 'POST',
            datatype: 'text',
            complete: function(data) {
                if (data.status == 200) {
                    console.log(data.responseText);
                    _this.countryName = data.responseText;
                    _this.search;
                }
            }
        });

        this.controller = new GIO.Controller(container);
        this.controller.configure(this.configs);

        this.getCountries();
        this.getLatestData('CN');
        // call the init() API to show the IO globe in the browser
        this.controller.setStyle('earlySpring');
        this.controller.onCountryPicked(callback);
        function callback(selectedCountry) {
            console.log(selectedCountry);
            _this.controller.switchCountry(selectedCountry.ISOCode);
            _this.getLatestData(selectedCountry.ISOCode);
        }
        this.controller.init();

        var scene = this.controller.getScene();

        // create a universe background which is an Three.js object

        var universe = this.createUniverse();

        // add universe to the scene

        scene.add(universe);
    },
    methods: {
        search() {
            var _this = this;
            let country = this.countries.filter(c => c.value === _this.countryName);
            console.log(country);
            if (!country) return;
            this.selectedCountry.name = country[0].value;
            this.selectedCountry.alpha2code = country[0].data;
            this.controller.switchCountry(this.selectedCountry.alpha2code);
            this.getLatestData(this.selectedCountry.alpha2code);
        },
        handleSelectedFile(convertedData) {
            console.log(JSON.stringify(convertedData));
            this.json = JSON.stringify(convertedData);
            this.$message({
                message: '图表导入成功!',
                type: 'success'
            });
        },
        getjson() {
            if (this.json) {
                var data = JSON.parse(this.json);

                this.controller.addData(data.body);
                console.log(this.controller);
            } else {
                this.$message({
                    message: '没有导入任何图表!',
                    type: 'warning'
                });
            }
        },
        onSelectGlobe: function(pickedCountry) {
            let country = this.countries.filter(c => c.data === pickedCountry.ISOCode);
            if (!country) return;
            this.selectedCountry.name = country[0].value;
            this.selectedCountry.alpha2code = country[0].data;
            this.controller.switchCountry(this.selectedCountry.alpha2code);
            this.countryName.val(country[0].value);
            this.getLatestData(this.selectedCountry.alpha2code);
        },

        getCountries: function() {
            var _this = this;
            $.ajax(this.settings).done(function(response) {
                for (let country of response) {
                    _this.countries.push({ value: country.name, data: country.alpha2code });
                }
            });
        },
        getLatestData: function(countryCode) {
            let countryInList = this.countries.filter(c => c.data === countryCode);
            if (!countryInList) {
                return;
            }
            this.settings.url = `https://covid-19-data.p.rapidapi.com/country/code?format=json&code=${countryCode}`;
            $.ajax(this.settings).done(function(response) {
                if (response.length == 0) return;
                let responseCountry = response[0];
                $('#summary-live-stats').empty();
                $('#summary-live-stats').html(`
            <h3>${responseCountry['country']}</h3>
            <p><b>Confirmed: </b> <span style="color: red">${responseCountry['confirmed']}</span></p>
            <p><b>Recovered: </b> <span style="color: red">${responseCountry['recovered']}</span></p>
            <p><b>Critical: </b> <span style="color: red">${responseCountry['critical']}</span></p>
            <p><b>Deaths: </b> <span style="color: red">${responseCountry['deaths']}</span></p>
        `);
            });
        },
        createUniverse: function() {
            var universeMesh = new THREE.Mesh();
            universeMesh.geometry = new THREE.SphereGeometry(500, 128, 128);
            universeMesh.material = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('../../assets/galaxy.png'),
                side: THREE.BackSide
            });

            return universeMesh;
        }
    }
};
</script>
<style scoped>
#excel {
    background-color: while;
}
#globe {
    width: 100%;
    height: 80%;
}
#globalArea {
    width: 100%;
    height: 100%;
}

#filter {
    margin-top: 20px;
    text-align: left;
}

#search-btn {
    border-radius: 4px;
    background-color: red;
    color: white;
    font-family: 'Roboto Mono', monospace;
    font-size: 16px;
}

input[type='text'] {
    font-size: 16px;
    border-radius: 5px;
    font-family: 'Roboto Mono', monospace;
    padding: 3px;
}

#globalArea {
    height: 650px;
    width: 100%;
}

#summary-live-stats {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 280px;
    margin-right: 250px;
    z-index: 10;
    padding: 5px 20px;
    color: brown;
}

#stats-table {
    text-align: center;
}
</style>

