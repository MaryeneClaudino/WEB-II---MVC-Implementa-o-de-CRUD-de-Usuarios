class Email {
    constructor(userId, email, id) {
        this.id = id ?? null;
        this.userId = userId;
        this.email = email;
    }
}

export {
    Email
}