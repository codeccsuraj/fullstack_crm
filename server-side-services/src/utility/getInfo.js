import { UAParser } from "ua-parser-js";

export const getRequestInfo = (req) => {

    const parser = new UAParser(req.headers["user-agent"]);
    const ua = parser.getResult();

    return {
        ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,

        deviceType: ua.device.type || "DESKTOP",

        browser: ua.browser.name || "UNKNOWN",

        os: ua.os.name || "UNKNOWN",

        userAgent: req.headers["user-agent"]
    };
};