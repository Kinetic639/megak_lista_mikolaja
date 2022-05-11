declare global {
    namespace NodeJS{
        interface ProcessEnv {
            PORT: string,
            HOST: string;
            DB_URL: string;
            DB_NAME?: string;
            DB_kopytko: string
        }
    }
}

export {}
