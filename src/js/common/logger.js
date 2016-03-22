export default class Logger{
    constructor () {
        this.MESSAGES = {
            ABSTRACT_CLASS: 'Abstract class! The instance shouldn\'t be created',
            ABSTRACT_METHOD: 'The method isn\'t implemented'
        };
    }


    static log (message, status) {
        let method;
        switch (status) {
            case 1:
                method = 'error';
                break;
            case 2:
                method = 'warn';
                break;
            case 3:
                method = 'debug';
                break;
            default:
                method = 'log';
        }
        console[method](message);

        return message;
    }

    static abstractClassError () {
        Logger.log(this.MESSAGES.ABSTRACT_CLASS, 1);
    }

    static abstractMethod () {
        Logger.log(this.MESSAGES.ABSTRACT_METHOD, 2);
    }

}