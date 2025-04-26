import Joi from "joi";
import { UserRole } from "../../../constants";

class InsertUserRequest {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.role = data.role;
    this.avatar = data.avatar;
    this.phone = data.phone;
  }

  static validate(data) {
    const schema = Joi.object({
      email: Joi.string().email().optional(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      // role: Joi.number().integer().min(UserRole.USER).required(),
      avatar: Joi.string().optional().allow(""),
      phone: Joi.number().optional(),
    });
    return schema.validate(data);
  }
}

export default InsertUserRequest;
