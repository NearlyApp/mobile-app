export function stringifySearch(searchObj: Record<string, any>): string {
    if (!searchObj || typeof searchObj !== "object" || Object.keys(searchObj).length === 0) {
        return "";
    }

    const params = new URLSearchParams();

    Object.entries(searchObj).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
                params.append(key, value.join(","));
            } else {
                params.append(key, String(value));
            }
        }
    });

    const result = params.toString();
    return result ? `?${result}` : "";
}

export function isObject(object: any | Record<any, any>, strict: boolean = false): object is Record<string, any> {
    return object != null && typeof object === 'object' && (!strict || !Array.isArray(object));
}