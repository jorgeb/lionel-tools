
export class  arrayUtil {

    public static range = function (start, stop, step?) {
        if (stop == null) {
            stop = start || 0;
            start = 0;
        }
        if (!step) {
            step = stop < start ? -1 : 1;
        }

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);

        for (var idx = 0; idx < length; idx++ , start += step) {
            range[idx] = start;
        }

        return range;
    }

    public static arrayToTable = function (array: Array<any>, numOfCols: number): Array<any> {
        var arrayLength = array.length;
        var rows = [{
            columns: []
        }];
        var rowNum = 0;
        for (var i = 0; i < arrayLength; i++) {
            var rowMod = (i) % numOfCols;
            if (rowMod === 0) {
                rows.push({
                    columns: []
                });
            }
            rows[rowNum].columns.push(array[i]);

            if (rowMod === numOfCols - 1) {
                rowNum++;
            }
        }

        return rows;
    };
}