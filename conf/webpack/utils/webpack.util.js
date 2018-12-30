// Webpack 第三方函式庫引用宣告
import fs from "fs";
import path from "path";

// 編譯版本，若為'production'則是產品，反之為開發。
export const production = process.env.NODE_ENV === "production";

// 開發環境代理伺服器轉址，devServer proxy 設定，輸入參數 --devProxy=[proxy name]
export const devServerProxyType = process.env.npm_config_devProxy;

// 環境設定參數，以此參數指向檔案夾路徑 conf/[local(default), sit, dev, uat ,qa, prd]，輸入參數 --env=[env name]
export const envType = process.env.npm_config_env;

// 編譯對象參數，以此參數指向本次需編譯的 pages group，輸入參數 --pages=[group name]
export const pagesGroupType = process.env.npm_config_pages;

// 路徑轉換
export function resolve(relativePath) {
    return path.resolve(process.cwd(), `${relativePath}`);
}

// 取回JSON檔案
export function readJSON(relativePath) {
    return JSON.parse(fs.readFileSync(resolve(relativePath)));
}
