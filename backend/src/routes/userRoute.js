import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();


userRouter.get(
    "/",
    userController.allUsers
);

userRouter.get(
    "/:id",
    userController.getUser
);

userRouter.post(
    "/",
    userController.createUser
);

userRouter.put(
    "/:id",
    userController.updateUser
);

userRouter.put(
    "/change-password",
    userController.changeUserPassword
);

userRouter.delete(
    "/delete-user/:id",
    userController.deleteUser
);

export default userRouter;