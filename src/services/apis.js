const BASE_URL = process.env.REACT_APP_BASE_URL

console.log("BASE_URL:", BASE_URL);

export const categories = {
    CATEGORIES_API: `${BASE_URL}/course/showAllCategories`,
    LOGIN_API: `${BASE_URL}/auth/login`,
    SEND_OTP: `${BASE_URL}/auth/sendotp`,
    SIGNUP_API: `${BASE_URL}/auth/signup`
}

console.log("API:", categories.CATEGORIES_API);