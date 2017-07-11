export class stringUtil {

    private static assemble = (literal, params): Function => {
        return new Function(params, "return `" + literal + "`;");
    };

    public static template = (literal: string, params: any): string => {

        let template = stringUtil.assemble(literal, "item");

        return template(params);
    }
}