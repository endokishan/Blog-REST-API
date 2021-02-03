export interface Environment {
    db_url: string;
    jwt_secret: string;
    sendGrid_API: string;
}
export declare function getEnvironmentVariables(): Environment;
