export interface Local {
    name?: string,
    short?: string,
}

export const defaultLocal: Local = {
    name: "",
    short: "",
}

export interface Product {
    name?: string,
    valueString?: string,
    dateString?: string,
    ean?: number,
    date?: number,
    value?: number,
    local?: Local,
}

export const defaultProduct: Product = {
    name: "",
    dateString: "",
    valueString: "0",
    ean: 0,
    date: 0,
    value: 0,
    local: defaultLocal,
}
