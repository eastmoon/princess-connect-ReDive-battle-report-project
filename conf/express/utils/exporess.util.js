// Webpack 第三方函式庫引用宣告
import fs from "fs";
import path from "path";

// 編譯版本，若為'production'則是產品，反之為開發。
export const production = process.env.NODE_ENV === "production";
