export const checkValue = (store: any, field: string, regExp: RegExp | string) => {
    const {value, required} = store[field];
    store[field].valid = value && !Array.isArray(value) ? !!value.toString().match(regExp) : !required;
};
