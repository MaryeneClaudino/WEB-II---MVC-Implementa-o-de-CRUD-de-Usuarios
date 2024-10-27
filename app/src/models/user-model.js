class User {
    constructor(name, cpf, role, email, phone, id, createdAt) {
        this.id = id ?? null;
        this.name = name;
        this.cpf = cpf;
        this.email = email ?? "-";
        this.phone = phone ?? "-"

        this.role = role ?? 'Cliente';
        this.createdAt = createdAt ?? Date.now();
    }
}

export {
    User
}