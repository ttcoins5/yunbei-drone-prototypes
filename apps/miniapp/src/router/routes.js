import { categoriesPage, homePage } from "../pages/home.js?v=profile-auto-role-1";
import { orderConfirmPage, paymentResultPage, productDetailPage, productsPage } from "../pages/products.js?v=product-flow-1";
import { profileDetailPage, profilePage } from "../pages/profile.js?v=profile-auto-role-1";
import { messagesPage, orderDetailPage, ordersPage, serviceNotificationsPage } from "../pages/orders.js?v=order-detail-1";
import { addressPage, feedbackPage, formPage, invoicePage, operatorPage, reportPage } from "../pages/forms.js?v=flight-report-3";
import { aboutPage, contactPage, contactPhonePage, contactWechatPage, pilotOrderDetailPage, tasksPage } from "../pages/static.js?v=task-hall-1";

export const routes = {
  home: homePage,
  categories: categoriesPage,
  products: productsPage,
  product: productDetailPage,
  orderConfirm: orderConfirmPage,
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
