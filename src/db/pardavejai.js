import { dbConnect, dbDisconnect, dbQuery } from "./db.js";

async function getList() {
    let conn;
    try {
        conn = await dbConnect();
        let r = await dbQuery(
            conn,
            "select id, pavadinimas from pardavejai order by pavadinimas"
        );
        return r.results;
    } finally {
        try {
            await dbConnect(conn);
        } catch (err) {

        }
    }
}

async function getOne(id) {
    id = parseInt(id);
    if (isFinite(id)) {
        let conn;
        try {
            conn = await dbConnect();
            let r = await dbQuery(
                conn,
                "select id, pavadinimas from pardavejai where id = ?",
                [id],
            );
            return r.results;
        } finally {
            try {
                await dbDisconnect(conn);
            } catch (err) {
            }
        }
    } else {
        throw new Error("Bad id");
    }
}

async function save(id, pavadinimas) {
    let conn;
    try {
        conn = await dbConnect();
        if (id) {
            let r = await dbQuery(
                conn,
                "update pardavejai set pavadinimas = ? where id = ?;",
                [pavadinimas, id],
            );
            return r.results;
        } else {
            let r = await dbQuery(
                conn,
                "insert into pardavejai (pavadinimas) values (?);",
                [pavadinimas],
            );
            return r.results;
        }
    } finally {
        try {
            await dbDisconnect(conn);
        } catch (err) {
        }
    }
}



async function deleteRecord(id) {
    id = parseInt(id);
    if (isFinite(id)) {
        let conn;
        try {
            conn = await dbConnect();
            let r = await dbQuery(
                conn,
                "delete from pardavejai where id = ?",
                [id],
            );
        } finally {
            try {
                await dbDisconnect(conn);
            } catch (err) {
            }
        }
    } else {
        throw new Error("Bad id");
    }
}


export { getList, deleteRecord, getOne, save }