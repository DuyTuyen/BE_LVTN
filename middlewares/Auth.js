const jwt = require("jsonwebtoken");
const roleService = require("../services/RoleService")

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "Bạn phải đăng nhập để thực hiện chức năng này" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    error.toString();
    return res.status(401).json({ message: " Đăng nhập thất bại" });
  }
}

function verifyByPermission(permissions) {
  return async (req, res, next) => {

    if(!permissions)
    permissions = req.query.permissions ? req.query.permissions: []

    const myRole = await roleService.getById(req.user.role.id)
    const checkPermission = [...req.user.permissions, myRole && myRole?.r_permissions.map(p => p.type)].some(userPermission =>
      permissions.includes(userPermission)
    )
    if (!checkPermission)
      return res.status(401).json('Bạn không có quyền thực hiện chức năng này')
    next()
  }
}

function verifyByRole(roles) {
  return (req, res, next) => {
    if(!roles)
      roles = req.query.roles ? req.query.roles: []
    if (!roles.includes(req.user.role.title))
      return res.status(401).json('Bạn không có quyền thực hiện chức năng này')
    next()
  }
}

module.exports = { verifyToken, verifyByPermission, verifyByRole };
