import Joi from "joi";

class UpdateProductRequest {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.category_id = data.category_id;
    this.brand_id = data.brand_id;
    this.oldprice = data.oldprice;
    this.image = data.image;
    this.buyturn = data.buyturn;
    this.quantity = data.quantity;
    this.specification = data.specification;
  }

  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().optional(),
      image: Joi.string().optional().allow(""),
      description: Joi.string().optional(),
      price: Joi.number().optional().positive(),
      category_id: Joi.number().optional(),
      brand_id: Joi.number().optional(),
      oldprice: Joi.number().optional().positive(),
      buyturn: Joi.number().optional(),
      quantity: Joi.number().optional(),
      specification: Joi.string().optional(),
    });
    return schema.validate(data);
  }
}

export default UpdateProductRequest;
