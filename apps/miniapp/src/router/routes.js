import { caseDetailPage, casesPage, categoriesPage, homePage } from "../pages/home.js?v=miniapp-live-20260624-report-clean-1";
import { orderConfirmPage, paymentPage, paymentResultPage, productDetailPage, productReviewsPage, productsPage } from "../pages/products.js?v=miniapp-live-20260624-report-clean-1";
import { loginPage, pilotStatusPage, profileDetailPage, profilePage } from "../pages/profile.js?v=miniapp-live-20260624-report-clean-1";
import { messagesPage, orderDetailPage, orderReviewPage, ordersPage, serviceNotificationsPage } from "../pages/orders.js?v=miniapp-live-20260624-report-clean-1";
import { addressPage, feedbackPage, formPage, invoicePage, operatorPage, reportDetailPage, reportPage } from "../pages/forms.js?v=miniapp-live-20260624-report-clean-1";
import { aboutPage, contactPage, contactPhonePage, contactWechatPage, pilotOrderDetailPage, tasksPage } from "../pages/static.js?v=miniapp-live-20260624-report-clean-1";

export const routes = {
  home: homePage,
  cases: casesPage,
  caseDetail: caseDetailPage,
  categories: categoriesPage,
  products: productsPage,
  product: productDetailPage,
  productReviews: productReviewsPage,
  orderConfirm: orderConfirmPage,
  payment: paymentPage,
  paymentResult: paymentResultPage,
  pilot: () => formPage("pilot"),
  pilotStatus: pilotStatusPage,
  report: reportPage,
  reportDetail: reportDetailPage,
  booking: () => formPage("booking"),
  rental: () => formPage("rental"),
  login: loginPage,
  profile: profilePage,
  profileDetail: profileDetailPage,
  orders: ordersPage,
  orderDetail: orderDetailPage,
  orderReview: orderReviewPage,
  messages: messagesPage,
  serviceNotifications: serviceNotificationsPage,
  address: addressPage,
  contact: contactPage,
  contactPhone: contactPhonePage,
  contactWechat: contactWechatPage,
  invoice: invoicePage,
  feedback: feedbackPage,
  operator: operatorPage,
  tasks: tasksPage,
  pilotOrderDetail: pilotOrderDetailPage,
  about: aboutPage
};
