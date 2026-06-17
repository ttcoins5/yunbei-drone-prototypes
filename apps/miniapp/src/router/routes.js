import { caseDetailPage, casesPage, categoriesPage, homePage } from "../pages/home.js?v=case-showcase-1";
import { orderConfirmPage, paymentPage, paymentResultPage, productDetailPage, productReviewsPage, productsPage } from "../pages/products.js?v=all-products-2";
import { profileDetailPage, profilePage } from "../pages/profile.js?v=message-clean-2";
import { messagesPage, orderDetailPage, ordersPage, serviceNotificationsPage } from "../pages/orders.js?v=order-list-paid-only-1";
import { addressPage, feedbackPage, formPage, invoicePage, operatorPage, reportPage } from "../pages/forms.js?v=report-no-after-submit-1";
import { aboutPage, contactPage, contactPhonePage, contactWechatPage, pilotOrderDetailPage, tasksPage } from "../pages/static.js?v=about-contact-1";

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
  report: reportPage,
  booking: () => formPage("booking"),
  rental: () => formPage("rental"),
  profile: profilePage,
  profileDetail: profileDetailPage,
  orders: ordersPage,
  orderDetail: orderDetailPage,
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
