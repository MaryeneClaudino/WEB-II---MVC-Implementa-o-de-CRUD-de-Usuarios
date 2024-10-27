import { db } from "../config/database.js";
import { Email } from "./email-model.js";

class EmailDao {

    listByIdUser(userID) {
        const stmt = db.prepare("SELECT * FROM emails WHERE user_id = ?;");
        const emails = stmt.all(userID);

        return (emails);
    }

    save({ userId, email }) {
        const stmt = db.prepare('INSERT INTO emails (user_id, email) VALUES (@userId, @email)');
        stmt.run({ userId, email });
    }

    saveSecondaryEmails(data, idUser) {
        if (data != undefined || data != null) {
            if (typeof "A" === typeof data && data != "") {
                let email = new Email(idUser, data);
                this.save(email);
            } else {
                for (let emailSec of data) {
                    if (emailSec != '') {
                        let email = new Email(idUser, emailSec);
                        this.save(email);
                    }
                }
            }
        }
    }

    update(email, id) {
        const stmt = db.prepare('UPDATE emails SET email = @email WHERE id = @id');
        stmt.run({ email, id });
    }

    updateSecondaryEmails(dataEmail, dataId) {
        if (dataEmail != undefined || dataEmail != null) {
            if (typeof "A" === typeof dataEmail) {
                this.update(dataEmail, dataId);
            } else {
                for (let i = 0; i < dataEmail.length; i++) {
                    this.update(dataEmail[i], dataId[i]);
                }
            }
        }
    }

    delete(id) {
        const stmt = db.prepare('DELETE FROM emails WHERE id = ?');
        stmt.run(id);
    }

    deleteByIdUser(id) {
        const stmt = db.prepare('DELETE FROM emails WHERE user_id = ?');
        stmt.run(id);
    }

    deleteSecondaryEmails(data) {
        if (data != undefined || data != null) {
            if (typeof "A" === typeof data) {
                this.delete(data);
            } else {
                for (let i = 0; i < data.length; i++) {
                    this.delete(data[i]);
                }
            }
        }
    }
}

export {
    EmailDao
}