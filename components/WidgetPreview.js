app.component('widget-preview', {
    props: {
        doctor: {
            type: String
        },
        widget: {
            type: Number
        }
    },
    data() {
        return {
            widgetUrlBase: `<iframe scrolling="no" frameborder="0" id="widget-preview-iframe" src=`,
            widgetUrl: ``
        }
    },
    template:
        /*html*/
        `
            <div class="widget-display">
                <div class="content">
                    <div class="widget">
                        <div v-if="widgetUrl">
                            <div v-html="widgetUrl"></div>
                        </div>
                    </div>
                </div>
            </div>`,
    updated() {
        switch (this.widget) {
            case 1:
                this.widgetUrl = `${this.widgetUrlBase}"https://www.znanylekarz.pl/ajax/marketing/doctor/widget/big_with_calendar/${this.doctor}?hide_branding=true" class="big_with_calendar" style="height: 233px;"></iframe>`
                break;
            case 2:
                this.widgetUrl = `${this.widgetUrlBase}"https://www.znanylekarz.pl/ajax/marketing/doctor/widget/simple_link/${this.doctor}?hide_branding=true" class="simple_link" style="height: 233px;"></iframe>`
                break;
            case 3:
                this.widgetUrl = `${this.widgetUrlBase}"https://widgets.znanylekarz.pl/doctor/widget/big/${this.doctor}?opinion=false" class="big" style="height: 255px;"></iframe>`
                break;
            case 4:
                this.widgetUrl = `${this.widgetUrlBase}"https://widgets.znanylekarz.pl/doctor/widget/big/${this.doctor}?opinion=true" class="big_opinion" style="height: 372px;"></iframe>`
                break;
            case 5:
                this.widgetUrl = `${this.widgetUrlBase}"https://www.znanylekarz.pl/ajax/marketing/doctor/widget/button_calendar_medium/${this.doctor}?hide_branding=true" class="button_calendar_medium" style="height: 372px;"></iframe>`
                break;
            case 6:
                this.widgetUrl = `${this.widgetUrlBase}"https://www.znanylekarz.pl/ajax/marketing/doctor/widget/button_calendar_floating_medium/${this.doctor}?hide_branding=true" class="button_calendar_floating_medium" style="height: 232px;"></iframe>`
                break;
            case 7:
                this.widgetUrl = `${this.widgetUrlBase}"https://widgets.znanylekarz.pl/doctor/widget/certificate/${this.doctor}" class="certificate" style="height: 278px;"></iframe>`
                break;
            case 8:
                this.widgetUrl = `${this.widgetUrlBase}"https://www.znanylekarz.pl/ajax/marketing/facility/widget/facility-big/${this.doctor}.html?referrer=https://www.znanylekarz.pl/link#" class="facility-big" style="height: 298px;"></iframe>`
                break;
            case 9:
                this.widgetUrl = `${this.widgetUrlBase}"https://www.znanylekarz.pl/ajax/marketing/facility/widget/facility_simple_link/${this.doctor}.html?referrer=https://www.znanylekarz.pl/link#" class="facility_simple_link" style="height: 298px;"></iframe>`
                break;
            case 10:
                this.widgetUrl = `${this.widgetUrlBase}"https://www.znanylekarz.pl/ajax/marketing/facility/widget/facility-calendar/${this.doctor}" class="facility-calendar" style="height: 598px;"></iframe>`
                break;
            case 11:
                this.widgetUrl = `${this.widgetUrlBase}"https://widgets.znanylekarz.pl/facility/widget/certificate/${this.doctor}?referrer=https://www.znanylekarz.pl/link#" class="certificate" style="height: 278px;"></iframe>`
                break;
            case 12:
                this.widgetUrl = `${this.widgetUrlBase}"https://www.znanylekarz.pl/ajax/marketing/facility/widget/facility-button/${this.doctor}.html?referrer=https://www.znanylekarz.pl/link#" class="facility-button" style="height: 278px;"></iframe>`
                break;
            default:
                this.widgetUrl = ``
        }
    }
})