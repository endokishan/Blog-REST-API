import { devEnvironment } from "./dev.env";
import { prodEnvironment } from "./prod.env";

export interface Environment {
    db_url: string,
    jwt_secret: string,
    sendGrid_API : string
};

export function getEnvironmentVariables() {
    if (process.env.NODE_ENV === 'production') {
        return prodEnvironment;
    };
    return devEnvironment;
};