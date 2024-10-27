import { db } from "../config/database.js";

class UserDao {
    list() {
        const stmt = db.prepare("SELECT * FROM users;");
        const users = stmt.all();
        console.log({ users })

        return users;
    }

    listById(id) {
        const stmt = db.prepare("SELECT * FROM users WHERE id = ?;");
        const users = stmt.all(id);
        console.log({ users })

        return users;
    }

    getIdUser(cpf) {
        const stmt = db.prepare("SELECT id FROM users WHERE cpf= ?;");
        const users = stmt.all(cpf);

        return users;
    }

    save({ name, cpf, role, email, phone, createdAt }) {
        const stmt = db.prepare('INSERT INTO users (name, cpf, role, email, phone, created_at) VALUES (@name, @cpf, @role, @email, @phone, @createdAt)');
        stmt.run({ name, cpf, role, email, phone, createdAt });
    }


    update(name, email, phone, id) {
        const stmt = db.prepare('UPDATE users SET name = @name, email=@email, phone=@phone WHERE id = @id');
        stmt.run({ name, email, phone, id });
    }

    delete(id) {
        const stmt = db.prepare("DELETE FROM users WHERE id = ? and role='Cliente'");
        stmt.run(id);
    }
}

export {
    UserDao
}