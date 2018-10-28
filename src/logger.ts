import * as moment from 'moment';

class Logger {
    info(message: string) {
        console.log(this.prefix() + message);
    }

    error(message: string, error: Error) {
        console.error(this.prefix() + message);
        console.error(error);
    }

    private prefix() : string {
        return `[${moment().format('DD/MM/YYYY HH:mm:ss')}] `;
    }
}

export default new Logger();