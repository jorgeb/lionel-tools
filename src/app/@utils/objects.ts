export class objectsUtil {

    public static isDate(value) {
        return Object.prototype.toString.call(value) === '[object Date]';
    }

    public static isRegExp(value) {
        return Object.prototype.toString.call(value) === '[object RegExp]';
    }

    public static isWindow(obj) {
        return obj && obj.window === obj;
    }

    public static isFunction(value) {
        return typeof value === 'function';
    }

    public static isDefined(value) {
        return typeof value !== 'undefined';
    }
    public static equals(o1, o2) {
        if (o1 === o2) {
            return true
        };
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true; // NaN === NaN
        }
        const t1 = typeof o1;
        const t2 = typeof o2;
        let length;
        let key;
        let keySet;
        if (t1 === t2 && t1 === 'object') {
            if (Array.isArray(o1)) {
                if (!Array.isArray(o2)) {
                    return false;
                }
                if ((length = o1.length) === o2.length) {
                    for (key = 0; key < length; key++) {
                        if (!objectsUtil.equals(o1[key], o2[key])) {
                            return false;
                        }
                    }
                    return true;
                }
            }
            else if (objectsUtil.isDate(o1)) {
                if (!objectsUtil.isDate(o2)) {
                    return false;
                }
                return objectsUtil.equals(o1.getTime(), o2.getTime());
            }
            else if (objectsUtil.isRegExp(o1)) {
                if (!objectsUtil.isRegExp(o2)) {
                    return false;
                }
                return o1.toString() === o2.toString();
            }
            else {
                if (objectsUtil.isWindow(o1) || objectsUtil.isWindow(o2)
                    || Array.isArray(o2) || objectsUtil.isDate(o2) || objectsUtil.isRegExp(o2)
                ) {
                    return false
                };
                keySet = Object.create(null);
                for (key in o1) {
                    if (key.charAt(0) === '$' || objectsUtil.isFunction(o1[key])) {
                        continue
                    };
                    if (!objectsUtil.equals(o1[key], o2[key])) {
                        return false;
                    }
                    keySet[key] = true;
                }
                for (key in o2) {
                    if (!(key in keySet)
                        && key.charAt(0) !== '$'
                        && objectsUtil.isDefined(o2[key])
                        && !objectsUtil.isFunction(o2[key])
                    ) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
}