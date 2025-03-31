import Joi from "joi";

class InsertOrderRequest {
  constructor(data) {
    this.user_id = data.user_id;
    this.status = data.status;
    this.note = data.note;
    this.total = data.total;
  }

  static validate(data) {
    const schema = Joi.object({
      user_id: Joi.number().required(),
      status: Joi.number().required(),
      note: Joi.string().optional().allow(""),
      total: Joi.number().required().positive(),
    });
    return schema.validate(data);
  }
}

export default InsertOrderRequest;
