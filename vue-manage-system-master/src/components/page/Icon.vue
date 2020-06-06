<template>
    <div id="globe">
        <div id="headline-news"></div>
        <div id="filter">
            <label>
                Search for a country:
                <input type="text" id="countryName" value="China" />
            </label>
            <button id="search-btn">View</button>
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

        var controller = new GIO.Controller(container);
        controller.configure(this.configs);

        this.getCountries();
        this.getLatestData('CN');
        // call the init() API to show the IO globe in the browser
        controller.setStyle('earlySpring');
        controller.onCountryPicked(callback);
        function callback(selectedCountry) {
            console.log(selectedCountry);
            controller.switchCountry(selectedCountry.ISOCode);
            _this.getLatestData(selectedCountry.ISOCode);
        }
        controller.init();

        var scene = controller.getScene();

        // create a universe background which is an Three.js object

        var universe = this.createUniverse();

        // add universe to the scene

        scene.add(universe);

        $('#search-btn').on('click', function() {
            let country = _this.countries.filter(
                c =>
                    c.value ===
                    $('#countryName')
                        .val()
                        .trim()
            );
            console.log(country);
            if (!country) return;
            _this.selectedCountry.name = country[0].value;
            _this.selectedCountry.alpha2code = country[0].data;
            controller.switchCountry(_this.selectedCountry.alpha2code);
            _this.getLatestData(_this.selectedCountry.alpha2code);
        });
    },
    methods: {
        onSelectGlobe: function(pickedCountry) {
            let country = this.countries.filter(c => c.data === pickedCountry.ISOCode);
            if (!country) return;
            this.selectedCountry.name = country[0].value;
            this.selectedCountry.alpha2code = country[0].data;
            this.controller.switchCountry(this.selectedCountry.alpha2code);
            $('#countryName').val(country[0].value);
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
#globe {
    width: 100%;
    height: 80%;
}
#globalArea {
    width: 100%;
    height: 100%;
}

#headline-news {
    text-align: center;
    background-color: red;
    top: 0;
}

#headline-news a {
    color: white;
}

#filter {
    margin-top: 20px;
    text-align: center;
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

