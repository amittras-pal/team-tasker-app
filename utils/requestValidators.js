/**
 *
 * @param {Object} payload Request body containing user details
 * @returns It returns Object containing if request is valid along with any error as description
 */
const validateCreatePayload = (payload) => {
  const { name = "", mobileNo = "", email = "", password = "" } = payload || {};
  if (!name || !email || !password)
    return { valid: false, description: "Please provide mandatory fields" };
  if (password.length < 8)
    return {
      valid: false,
      field: "password",
      description: "Password must contain atleast 8 characters",
    };
  if (!mobileNo.match(/^\d{10}$/))
    return {
      valid: false,
      field: "mobileNo",
      description: "Please provide a valid mobile number",
    };

  return {
    valid: true,
    description: "",
  };
};

module.exports = {
  validateCreatePayload,
};
