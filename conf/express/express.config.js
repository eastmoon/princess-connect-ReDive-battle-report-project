// 編譯函式庫
import expressStartup from "./startup/express.startup";

// 編譯配置
module.exports = () => {
    // 編譯設定
    const config = {
        server: "app/server/index",
    		port: 8080,
        public: "build/publish"
    };
    expressStartup(config);
};

module.exports();
