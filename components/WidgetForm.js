app.component('widget-form', {
    props: {
        code: {
            type: String
        }
    },
    template:
        /*html*/
        `
            <div class="widget-panel">
                <h3>Stwórz własny widget</h3>
                <p class="text-muted">Połącz profil na ZnanyLekarz z Twoją stroną internetową. Pozwól swoim pacjentom bezpośrednio umawiać wizyty i dzielić się opiniami.</p>
                <hr/>
                <div class="widget-form">
                    <label for="search" class="form-element"><span class="badge rounded-pill bg-primary text-light">1</span> Wyszukaj swój profil na ZnanyLekarz lub wprowadź link do profilu.</label>
                    <input id="search" class="form-bar" @input="resultQuery(searchQuery)" v-model="searchQuery">
                    <div v-if="!resultsGenerated">
                        <div v-for="item in searchResult">
                            <div v-for="hit in item">
                                <div v-for="h in hit">
                                    <p class="form-tile" @click="selectDoctor(h)">
                                        <img class="form-icon" :src="h.image_micro_square_absolute">
                                        {{ h.fullname_formatted }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if=resultsGenerated>
                        <label for="choose" class="form-element"><span class="badge rounded-pill bg-primary text-light">2</span> Wybierz jeden z rekomendowanych typów widgetów.</label>
                        <div id="select-widget">
                            <div v-if="selectedDoctor.surname">
                                <div v-for="widget in widgetsForDoctors">
                                    <p :class="{ selected: widget.id === selectedWidgetID }" class="form-tile" @click="selectWidget(widget)">
                                        {{ widget.title }} <span class="badge bg-primary" v-if="widget.isRecommended">POLECANE</span>
                                    </p>
                                </div>
                            </div>
                            <div v-else>
                                <div v-for="widget in widgetsForFacilities">
                                    <p :class="{ selected: widget.id === selectedWidgetID }" class="form-tile" @click="selectWidget(widget)">
                                        {{ widget.title }} <span class="badge bg-primary" v-if="widget.isRecommended">POLECANE</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <input :disabled="!isActive" :class="{ disabled: !isActive }" class="btn btn-primary form-element" type="submit" value="Wygeneruj kod widgetu" @click="isWidgetReady = true">
                    <div v-if="isWidgetReady">
                        <label for="copy"><span class="badge rounded-pill bg-primary text-light">3</span> Jeszcze tylko jeden krok dzieli Cię od połączenia profilu na ZnanyLekarz z Twoją stroną internetową.</label>
                        <code for="code">{{ code }}</code>
                        <input class="btn btn-success form-element" type="submit" value="Kopiuj kod widgetu" @click="copyCode">
                    </div>
                </div>
            </div>`,
    data() {
        return {
            items: [],
            searchQuery: '',
            searchResult: [],
            resultsGenerated: false,
            widgetsForDoctors: [
                { id: 1, title: "Z kalendarzem", isRecommended: true },
                { id: 2, title: "Prosty link", isRecommended: true },
                { id: 3, title: "Standardowy", isRecommended: false },
                { id: 4, title: "Standardowy z opinią", isRecommended: false },
                { id: 5, title: "Przycisk", isRecommended: false },
                { id: 6, title: "Pływający przycisk", isRecommended: false },
                { id: 7, title: "Certyfikat", isRecommended: false }
            ],
            widgetsForFacilities: [
                { id: 8, title: "Standardowy", isRecommended: false },
                { id: 9, title: "Prosty link", isRecommended: false },
                { id: 10, title: "Lista kalendarzy", isRecommended: false },
                { id: 11, title: "Certyfikat", isRecommended: false },
                { id: 12, title: "Przycisk", isRecommended: false }
            ],
            isActive: false,
            selectedWidgetID: null,
            isWidgetReady: false
        }
    },
    mounted() {
        const doctorAdress = "https://us-central1-trialdayzl.cloudfunctions.net/doctor/"
        const facilityAdress = "https://us-central1-trialdayzl.cloudfunctions.net/facility/"
        const doctors = ["jan", "damian", "katarzyna"]
        let mockups = []

        for (let doctor of doctors) {
            mockups.push(doctorAdress + doctor)
            mockups.push(facilityAdress + doctor)
        }

        for (let mockup of mockups) {
            fetch(mockup)
                .then(response => response.json())
                .then(data => this.items.push(data))
                .catch(error => console.log(error.message))
        }
    },
    methods: {
        resultQuery(searchQuery) {
            this.resultsGenerated = false
            this.searchResult = this.items.filter(item =>
                item.hits.every(hit =>
                    hit.fullname_formatted.toLowerCase().trim()
                        .includes(searchQuery.toLowerCase().trim())
                )
            )
        },
        selectDoctor(doctor) {
            this.selectedDoctor = doctor
            this.searchQuery = doctor.url
            this.resultsGenerated = true
            this.$emit('doctor', doctor.urlname)
        },
        selectWidget(widget) {
            this.isActive = true
            this.selectedWidgetID = widget.id
            this.$emit('widget', widget.id)
        },
        copyCode() {
            navigator.clipboard.writeText(this.code)
                .then(() => alert("Kod widgetu został skopiowany!"))
                .catch(error => alert(error.message)); 
        }
    }
})