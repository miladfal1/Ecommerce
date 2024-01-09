const express = require("express");
const { userController } = require("../controllers")
// const {
//   register,
//   login,
//   userList,
//   updateUser,
//   getUser,
//   deleteUser,
// } = require("../controllers/users.controller");
const router = express.Router();

router.route("/").get(userController.userList).post(userController.register);
router.post("/login", userController.login);
router.post("/register", userController.register);



router.route("/:username").get(userController.getUser).put(userController.updateUser).delete(userController.deleteUser);
// router.put("/userlist/:userId", updateUser);

module.exports = router;
