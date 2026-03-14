import dotenv from 'dotenv'

dotenv.config()
class Config {
    #secondary_db_string;
    #jwtKey;

    constructor () {
        this.#secondary_db_string = process.env.SECONDARY_DB_LOCAL;
        this.#jwtKey = process.env.JWT_ACCESS_KEY;
    }

    get SecondaryDatabase () {
        return this.#secondary_db_string;
    }

    get JwtAccessKey () {
        return this.#jwtKey;
    }
}

export const config = new Config()