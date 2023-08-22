const query = (db) => {
  const insert = async (name) => {
    await db.none(
      "insert into names (greetedNames, greetCount) values ($1, $2)",
      [name, 1]
    );
  };

  const updateCount = async () => {
    return await db.oneOrNone(
      "select count (distinct greetedNames) From names"
    );
  };

  const count = async (name) => {
    return await db.oneOrNone(
      "select sum(greetcount) from names where greetedNames = $1",
      [name]
    );
  };

  const greeted = async () => {
    return await db.any("select distinct greetedNames from names");
  };

  const reset = async () => {
    await db.none("delete from names");
  };

  return {
    insert,
    updateCount,
    greeted,
    reset,
    count,
  };
};

export default query;
