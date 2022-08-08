const { query } = require("express-validator");
const { PAGE_START, PAGE_LIMIT_MIN, PAGE_LIMIT_MAX } = require("../constants/pagination.constants");

validateLimitInQuery = query("limit").default(PAGE_LIMIT_MAX).isInt().isFloat({ min: PAGE_LIMIT_MIN });
validatePageInQuery = query("page").default(PAGE_START).isInt().isFloat({ min: PAGE_START });

module.exports.validatePagination = () => [
  validateLimitInQuery,
  validatePageInQuery,
];
