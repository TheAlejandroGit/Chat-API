const router = require("express").Router();

const passport = require("passport");
const adminValidate = require("../middleware/role.middleware");

const userServices = require("./users.services");

require("../middleware/auth.middleware")(passport);

//?rutas raiz

router.get("/", userServices.getAllUsers);

//? ruta de el usuario logeado

router
  .route("/me")
  .get(passport.authenticate("jwt", { session: false }), userServices.getMyUser)
  .patch(
    passport.authenticate("jwt", { session: false }),
    userServices.updateMyUser
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    userServices.deleteMyUser
  );

//? rutas dinamicas por ID

router
  .route("/:id")
  .get(userServices.getUserById)
  .patch(
    adminValidate,
    passport.authenticate("jwt", { session: false }),
    userServices.patchUser
  )
  .delete(
    adminValidate,
    passport.authenticate("jwt", { session: false }),
    userServices.deleteUser
  );

module.exports = router;
