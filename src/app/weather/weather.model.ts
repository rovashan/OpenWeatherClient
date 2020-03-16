export class WeatherModel {
    date: string;
    min: string;
    max: string;
    icon: string;

    constructor(date: string, min: string, max: string, icon: string) {
        this.date = date;
        this.min = min;
        this.max = max;
        this.icon = icon;
    }
}