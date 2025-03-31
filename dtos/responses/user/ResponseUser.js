class ResponseUser {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.avatar = user.avatar;
    this.phone = user.phone;
    // Password is intentionally omitted for security
  }
}

export default ResponseUser;
