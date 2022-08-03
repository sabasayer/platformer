export class TimeLogger {
    private startTime = 0;
    private endTime = 0;

    get diff() {
        return this.endTime - this.startTime;
    }

    start() {
        this.startTime = new Date().getTime();
    }

    end() {
        this.endTime = new Date().getTime();
    }

    reset() {
        this.startTime = 0;
        this.endTime = 0;
    }
}
