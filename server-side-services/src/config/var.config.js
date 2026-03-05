import dotenv from 'dotenv'

dotenv.config()
class Config {
    #secondary_db_string;

    constructor () {
        this.#secondary_db_string = process.env.SECONDARY_DB_LOCAL;
    }

    get SecondaryDatabase () {
        return this.#secondary_db_string;
    }
}

export const config = new Config()