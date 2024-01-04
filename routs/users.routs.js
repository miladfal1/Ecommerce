const express = require("express");
const {
  register,
  userList,
  updateUser,
  getUser,
  deleteUser,
} = require("../controllers/users.controller");
const router = express.Router();

router.route("/").get(userList).post(register);

router.route("/:username").get(getUser).put(updateUser).delete(deleteUser);
// router.put("/userlist/:userId", updateUser);

module.exports = router;
