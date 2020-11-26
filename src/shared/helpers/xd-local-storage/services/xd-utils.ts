/**
 * Created by Ofir_Dagan on 4/17/14.
 */

export default {
    extend(object: any, defaultObject: any) {
        const result = defaultObject || {};
        for (let key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                result[key] = object[key];
            }
        }
        return result;
    }
}
