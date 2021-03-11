export const formatDate = (data: string | Date | null | undefined, dateOnly?: boolean) => {
    if (!data) return data;
    const date = typeof data === 'string' ? new Date(data) : data;
    if (!date) return data;
    return [
        [getDate(date), getMonth(date), date.getFullYear()].join('-'),
        !dateOnly ? [date.getHours(), date.getMinutes()].join(':') : ''
    ].join(' ');
};

const getDate = (date: Date) => {
    const day = date.getDate();
    return day.toString().length > 1 ? day : '0' + day;
};

const getMonth = (date: Date) => {
    const month = date.getMonth() + 1;
    return month < 10 ? '0' + month : month;
};

export const delay = (() => {
    let timer = 0;
    return (callback: () => void | Promise<void>, ms: number) => {
        clearTimeout(timer);
        timer = window.setTimeout(callback, ms);
    };
})();
