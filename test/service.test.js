import assert from "assert";
import pgPromise from "pg-promise";
import query from "../service/query.js";

const pgp = pgPromise();

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
// which db connection to use
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://lelly:cHkFvXlgaIdPvAue4lxbMVEkSdRsuiLh@dpg-cjad3vue546c738aonpg-a.oregon-postgres.render.com/lelly_99_greetings_with_routes?ssl=true";

const database = pgp(connectionString);
const data = query(database);


describe('Greeting with routes database', function(){

    this.timeout(5000);

    beforeEach(async function(){
        // clean the tables before each test run
        await data.reset();
    });

    it('should insert a name into the database', async function() {
        await data.insert("Lee");
        const count = await data.count("Lee");
        assert.deepEqual({ sum: '1' }, count);
    });
    
    it('should update the count for names greeted', async function() {
        await data.insert("Lelly");
        await data.insert("Lee");
        await data.insert("Lesego");
        await data.insert("Lethabo");
        const updatedCount = await data.updateCount();
        assert.deepEqual({ count: '4' }, updatedCount);
    });
    
    it('should count the number of times Lelly was greeted', async function() {
        await data.insert("Lelly");
        await data.insert("Lelly");
        await data.insert("Lelly");
        await data.insert("Lelly");
        await data.insert("Lelly");
        await data.insert("Lelly");
        const count = await data.count("Lelly");
        assert.deepEqual({ sum: '6' }, count);
    });
    after(function(){
        pgp.end();
    })
});


