import PouchDB from 'pouchdb';

class Database {
    constructor(name) {
        this.dbKey = name;
    }

    requireLocalDb() {
        if (this.localDb == null) {
            this.localDb = new PouchDB(`${this.dbKey}_recipes`);
        }
    }

    async addRecipe(recipe) {
        this.requireLocalDb();
        recipe.createdAt = new Date().toISOString();
        recipe.updatedAt = new Date().toISOString();

        let res = null;
        if (!recipe.hasOwnProperty("_id")) {
            res = await this.localDb.post(recipe);
        } else {
            res = await this.localDb.put(recipe);
        }
        return res;
    }

    async updateRecipe(recipe) {
        this.requireLocalDb();
        recipe.updatedAt = new Date().toISOString();
        return await this.localDb.put(recipe);
    }

    async getRecipes() {
        // TODO paging

        this.requireLocalDb();
        return await this.localDb.allDocs({
            include_docs: true
        });
    }

    async getRecipeById(id) {
        if (id == null) { return undefined; }

        // TODO: use local if available, else require remote and download recipe from there
        // Viewing recipes by id is the only way the remote db can be used without authentication

        this.requireLocalDb();
        return await this.localDb.get(id);
    }

    async deleteRecipe(recipe) {
        this.requireLocalDb();
        return await this.localDb.remove(recipe);
    }
}

export default Database;