// import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    sassOptions: {
        silenceDeprecations: [
            "legacy-js-api",
            "mixed-decls",
            "color-functions",
            "global-builtin",
            "import",
        ],
    },
    transpilePackages: ["@vacancy-tracker/core"],
    // webpack: (config) => {
    //     return {
    //         ...config,
    //         resolve: {
    //             ...config.resolve,
    //             alias: {
    //                 ...config.resolve.alias,
    //                 // "@vacancy-tracker/core": path.resolve("../core"),
    //             },
    //         },
    //     };
    // },
};

export default nextConfig;
