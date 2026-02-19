function prettyJSON(data) {
    try {
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        return JSON.stringify(data, null, 2);
    } catch (e) {
        return data; // 그냥 문자열로 출력
    }
}
