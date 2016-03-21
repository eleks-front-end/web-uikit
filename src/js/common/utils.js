export default class Utils {
    constructor () {
        throw new Error('Abstract Class! The instance shouldn\'t be created');
    }

    static extend (obj1, obj2) {
        for (const key in obj2) {
            if (!obj2.hasOwnProperty(key))
                continue;

            obj1[key] = obj2[key];
        }
    }

    static clone (obj) {
        if (obj == null || typeof obj !== 'object')
            return obj;

        const temp = {};

        for (const key in obj)
            if (obj.hasOwnProperty(key))
                temp[key] = obj[key];
        return temp;
    }
}
