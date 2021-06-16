const app = Vue.createApp({
    data() {
        return {
            doctor: '',
            widget: null
        }
    },
    methods: {
        getDoctor(doctor) {
            this.doctor = doctor
        },
        getWidget(widget) {
            this.widget = widget
        }
    }
})