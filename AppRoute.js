import express from "express";
const router = express.Router();
import * as ProductController from "./controllers/ProductController";
import * as CategoryController from "./controllers/CategoryController";
import * as OrderController from "./controllers/OrderController";
import * as OrderDetailController from "./controllers/OrderDetailController";
import * as BrandController from "./controllers/BrandController";
import * as UserController from "./controllers/UserController";
import * as NewsController from "./controllers/NewsController";
import asyncHandle from "./middlewares/asyncHandle";
import validate from "./middlewares/validate";
import InsertProductRequest from "./dtos/requests/product/insertProductRequest";
import UpdateProductRequest from "./dtos/requests/product/updateProductRequest";
import InsertOrderRequest from "./dtos/requests/order/insertOrderRequest";
import InsertUserRequest from "./dtos/requests/user/InsertUserRequest";
export function AppRoute(app) {
  //product api
  // http://localhost:3000/products
  router.get("/products", asyncHandle(ProductController.getProducts));
  router.get("/products/:id", asyncHandle(ProductController.getProductById));
  router.post(
    "/products",
    validate(InsertProductRequest),
    asyncHandle(ProductController.insertProduct)
  );
  router.put(
    "/products/:id",
    validate(UpdateProductRequest),
    asyncHandle(ProductController.updateProduct)
  );
  router.delete("/products/:id", asyncHandle(ProductController.deleteProduct));

  // category api
  router.get("/categories", asyncHandle(CategoryController.getCategories));
  router.get(
    "/categories/:id",
    asyncHandle(CategoryController.getCategoryById)
  );
  router.post("/categories", asyncHandle(CategoryController.insertCategory));
  router.put("/categories/:id", asyncHandle(CategoryController.updateCategory));
  router.delete(
    "/categories/:id",
    asyncHandle(CategoryController.deleteCategory)
  );

  // User API
  router.get("/users", asyncHandle(UserController.getUsers));
  router.get("/users/:id", asyncHandle(UserController.getUserById));
  router.post(
    "/users",
    validate(InsertUserRequest),
    asyncHandle(UserController.insertUser)
  );
  router.put("/users/:id", asyncHandle(UserController.updateUser));
  router.delete("/users/:id", asyncHandle(UserController.deleteUser));

  // Order API
  router.get("/orders", asyncHandle(OrderController.getOrders));
  router.get("/orders/:id", asyncHandle(OrderController.getOrderById));
  router.post(
    "/orders",
    validate(InsertOrderRequest),
    asyncHandle(OrderController.insertOrder)
  );
  router.put("/orders/:id", asyncHandle(OrderController.updateOrder));
  router.delete("/orders/:id", asyncHandle(OrderController.deleteOrder));

  // Order Detail API
  router.get(
    "/order-details",
    asyncHandle(OrderDetailController.getOrderDetails)
  );
  router.get(
    "/order-details/:id",
    asyncHandle(OrderDetailController.getOrderDetailById)
  );
  router.post(
    "/order-details",
    asyncHandle(OrderDetailController.insertOrderDetail)
  );
  router.put(
    "/order-details/:id",
    asyncHandle(OrderDetailController.updateOrderDetail)
  );
  router.delete(
    "/order-details/:id",
    asyncHandle(OrderDetailController.deleteOrderDetail)
  );

  // Brand API
  router.get("/brands", asyncHandle(BrandController.getBrands));
  router.get("/brands/:id", asyncHandle(BrandController.getBrandById));
  router.post("/brands", asyncHandle(BrandController.insertBrand));
  router.put("/brands/:id", asyncHandle(BrandController.updateBrand));
  router.delete("/brands/:id", asyncHandle(BrandController.deleteBrand));

  //news api
  router.get("/news", asyncHandle(NewsController.getNews));
  router.get("/news/:id", asyncHandle(NewsController.getNewsById));
  router.post("/news", asyncHandle(NewsController.insertNews));
  router.put("/news/:id", asyncHandle(NewsController.updateNews));
  router.delete("/news/:id", asyncHandle(NewsController.deleteNews));

  app.use("/api/", router);
}
