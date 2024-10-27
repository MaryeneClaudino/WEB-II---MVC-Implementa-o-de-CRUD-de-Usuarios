import { PhoneDao } from "../models/phone-dao.js";
import { EmailDao } from "../models/email-dao.js";
import { UserDao } from "../models/user-dao.js";
import { User } from "../models/user-model.js";
import { Phone } from "../models/phone-model.js";
import { Email } from "../models/email-model.js";

function getUsers(req, res) {
    const userDao = new UserDao();
    const usersRaw = userDao.list();
    const listUsers = usersRaw.map(u => new User(u.name, u.cpf, u.role, u.email, u.phone, u.id, u.created_at));
    const filter = req.body.search;

    let users;

    if (filter != undefined || filter != null) {
        users = listUsers.filter(s => s.name.toUpperCase().startsWith(filter.toUpperCase()));
    } else {
        users = listUsers;
    }

    let page = 0;
    let initialIndex = 0;
    let endIndex = users.length;

    if (req.query.page != undefined || req.query.page != null) {
        page = req.query.page;

        initialIndex = (page * 5) - 5;
        endIndex = page * 5;

        if (users.length < endIndex) {
            endIndex = users.length;
        }
    }

    const data = {
        users,
        initialIndex,
        endIndex,
        page
    }

    res.render('users-listagem', { data });
}

function getUser(req, res) {
    const id = req.params.id;

    const userDao = new UserDao();
    const phoneDao = new PhoneDao();
    const emailDao = new EmailDao();

    const user = userDao.listById(id);
    const phones = phoneDao.listByIdUser(id);
    const emails = emailDao.listByIdUser(id);

    const data = {
        title: "Detalhes Usuário",
        user: user,
        phones: phones,
        emails: emails
    }

    res.render('user-detalhes', { data });
}

function pageAddUser(req, res) {
    const data = {
        title: "Cadastro Usuário"
    }
    res.render('users-formulario', { data });
}

function addUser(req, res) {
    const userDao = new UserDao();
    const phoneDao = new PhoneDao();
    const emailDao = new EmailDao();

    const data = req.body;
    const newUser = new User(data.name, data.cpf, data.role, data.email, data.phone);

    userDao.save(newUser);

    const id = userDao.getIdUser(data.cpf);
    const idUser = id[0].id;

    //Salvando no banco todos os telefones e emails secundários!
    phoneDao.saveSecondaryPhones(data.secondaryPhone, idUser);
    emailDao.saveSecondaryEmails(data.secondaryEmail, idUser);

    res.redirect("/users?page=1");
}

function pageUpdateUser(req, res) {
    const id = req.params.id;

    const userDao = new UserDao();
    const phoneDao = new PhoneDao();
    const emailDao = new EmailDao();

    const user = userDao.listById(id);
    const phones = phoneDao.listByIdUser(id);
    const emails = emailDao.listByIdUser(id);

    const data = {
        title: "Editando Usuário",
        user: user,
        phones: phones,
        emails: emails
    }

    res.render('users-edicao', { data });
}

function updateUser(req, res) {
    const data = req.body;
    const idUser = data.id;

    const userDao = new UserDao();
    const phoneDao = new PhoneDao();
    const emailDao = new EmailDao();

    console.log(data);

    userDao.update(data.name, data.email, data.phone, data.id);
    phoneDao.updateSecondaryPhones(data.phoneUpdate, data.idPhoneUpdate);
    emailDao.updateSecondaryEmails(data.emailUpdate, data.idEmailUpdate);

    phoneDao.saveSecondaryPhones(data.secondaryPhone, idUser);
    emailDao.saveSecondaryEmails(data.secondaryEmail, idUser);

    phoneDao.deleteSecondaryPhones(data.deletedPhone);
    emailDao.deleteSecondaryEmails(data.deletedEmail);

    res.redirect("/users?page=1");
}

function deleteUser(req, res) {
    const idUser = req.params.id;

    const userDao = new UserDao();
    const phoneDao = new PhoneDao();
    const emailDao = new EmailDao();

    phoneDao.deleteByIdUser(idUser);
    emailDao.deleteByIdUser(idUser);
    userDao.delete(idUser);

    res.send(200).end();
}

export {
    addUser,
    getUsers,
    pageAddUser,
    deleteUser,
    getUser,
    pageUpdateUser,
    updateUser
};
