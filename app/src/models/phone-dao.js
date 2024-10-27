import { db } from "../config/database.js";
import { Phone } from "../models/phone-model.js";

class PhoneDao {
    listByIdUser(userID) {
        const stmt = db.prepare("SELECT * FROM phones WHERE user_id = ?;");
        const phones = stmt.all(userID);

        return (phones);
    }

    save({ userId, phone }) {
        const stmt = db.prepare('INSERT INTO phones (user_id, phone) VALUES (@userId, @phone)');
        stmt.run({ userId, phone });
    }

    saveSecondaryPhones(data, idUser) {
        if (data != undefined || data != null) {
            if (typeof "A" === typeof data && data != "") {
                let phone = new Phone(idUser, data);
                this.save(phone);
            } else {
                for (let phoneSec of data) {
                    if (phoneSec != '') {
                        let phone = new Phone(idUser, phoneSec);
                        this.save(phone);
                    }
                }
            }
        }
    }

    update(phone, id) {
        const stmt = db.prepare('UPDATE phones SET phone = @phone WHERE id = @id');
        stmt.run({ phone, id });
    }

    updateSecondaryPhones(dataPhone, dataId) {
        if (dataPhone != undefined || dataPhone != null) {
            if (typeof "A" === typeof dataPhone) {
                this.update(dataPhone, dataId);
            } else {
                for (let i = 0; i < dataPhone.length; i++) {
                    this.update(dataPhone[i], dataId[i]);
                }
            }
        }
    }

    delete(id) {
        const stmt = db.prepare('DELETE FROM phones WHERE id = ?');
        stmt.run(id);
    }

    deleteByIdUser(id) {
        const stmt = db.prepare('DELETE FROM phones WHERE user_id = ?');
        stmt.run(id);
    }

    deleteSecondaryPhones(data) {
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
    PhoneDao
}