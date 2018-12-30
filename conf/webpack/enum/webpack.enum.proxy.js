export const devServerProxyConfig = {
    proxyDefault: "default",
    default: {},
    dummy: {
        "/api": {
            target: "http://localhost:9080",
            pathRewrite: {"^/api" : ""}
        }
    },
    sit: {
        "/api": {
            target: "http://localhost:9080",
            pathRewrite: {"^/api" : ""}
        }
    },
    dev: {

    }
}
