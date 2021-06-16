const app = Vue.createApp({
    data() {
        return {
            doctor: '',
            widget: null,
            code: ''
        }
    },
    methods: {
        getDoctor(doctor) {
            this.doctor = doctor
        },
        getWidget(widget) {
            this.widget = widget
        },
        setCode(code) {
            this.code = code
        }
    }
})