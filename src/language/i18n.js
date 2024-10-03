import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          app: {
            appNm: "Employee Polls",
            login: "Login",
            user: "User",
            pw: "Password",
          },
          err: {
            incorrectPassword: "Incorrect password. Please try again.",
            missingFields: "Please select a user and enter a password.",
          },
          buttonNm: {
            login: "Login",
          },
        },
      },
      vi: {
        translation: {
          app: {
            appNm: "Ý kiến ​​nhân viên",
            login: "Đăng nhập",
            user: "Tài khoản",
            pw: "Mật khẩu",
          },
          err: {
            incorrectPassword: "Sai mật khẩu. Vui lòng thử lại.",
            missingFields: "Hãy chọn user và nhập mật khẩu",
          },
          buttonNm: {
            login: "Đăng nhập",
          },
        },
      },
    },
  });

export default i18n;
