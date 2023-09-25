import { environment } from "src/environment/environment.pord";

const BASE_URL=environment.production?'':'http://localhost:5000';
export const FOOD_URL=BASE_URL+'/api/foods';
export const FOODTAG_URL=FOOD_URL+'/tag';
export const FOOD_SEARCH_URL=FOOD_URL+'/search/';
export const FOOD_TAG_URL=FOOD_URL+'/tag/';
export const FOOD_DETAIL_URL=FOOD_URL+'/';
export const FOOD_DELETE_URL=FOOD_URL+'/deletefood/';
export const FOOD_ADD_URL=FOOD_URL+'/addfood';
export const FOOD_UPDATE_NAME_URL=FOOD_URL+'/update/name/';
export const FOOD_UPDATE_IMAGE_URL=FOOD_URL+'/update/image/';
export const FOOD_UPDATE_TAG_URL=FOOD_URL+'/update/tag/';
export const FOOD_UPDATE_RATING_URL=FOOD_URL+'/update/rating/';
export const FOOD_UPDATE_ORGIN_URL=FOOD_URL+'/update/orgin/';
export const FOOD_UPDATE_PRICE_URL=FOOD_URL+'/update/price/';
export const FOOD_UPDATE_FAVIROTE_URL=FOOD_URL+'/update/favirote/';
export const FOOD_FAV_URL=BASE_URL+'/api/wish/';
export const FOOD_ADD_CART_URL=BASE_URL+'/api/cart/cartlist';
export const FOOD_SHOW_CART_URL=BASE_URL+'/api/cart/';
export const LOGIN_URL=BASE_URL+'/api/user/login';
export const OTP_URL=BASE_URL+'/api/user/mail';
export const EMAIL_CHECK_URL=BASE_URL+'/api/user/email/verification';
export const REGISTER=BASE_URL+'/api/user/register';
export const USER_DETAIL=BASE_URL+'/api/user/userdetail';
export const USER_DELETE=BASE_URL+'/api/user/deleteuser/';
export const USER_CHANGE_PASSWORD=BASE_URL+'/api/user/changepassword/';
export const USER_VERIFY=BASE_URL+'/api/user/verification/';
export const USER_UPLOAD_PHOTO=BASE_URL+'/api/user/change/profile/upload/';
export const USER_PHOTO=BASE_URL+'/api/user/change/profile';
export const FORGOT_PASSWORD_MAIL_URL=BASE_URL+'/api/user/forgotpassword/email';
export const FORGOT_PASSWORD_URL=BASE_URL+'/api/user/forgotpassword/';
export const SEND_FEEDBACK=BASE_URL+'/api/user/feedback/sendx';
export const SEE_FEEDBACK=BASE_URL+'/api/user/feedback';
export const FILTER_FEEDBACK=BASE_URL+'/api/user/feedback/filter';
export const SEE_USER_FEEDBACK=BASE_URL+'/api/user/userid/';
export const DELETE_USER_FEEDBACK=BASE_URL+'/api/user/feedback/delete/';
export const ORDER_CREATED=BASE_URL+'/api/order/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL=BASE_URL+'/api/order/newOrderForCurrentUser';
export const ORDER_PAY=BASE_URL+'/api/order/pay';
export const ORDER_LIST=BASE_URL+'/api/order/orderlist';
export const ORDER_LIST_ALL=BASE_URL+'/api/order/orderlist/all';
export const ORDER_LIST_DATE=BASE_URL+'/api/order/orderlist/date';
export const ORDER_LIST_CHANGE_STATUS=BASE_URL+'/api/order/orderlist/change/status/';
export const ORDER_LIST_DELETE=BASE_URL+'/api/order/orderlist/delete/';
export const ORDER_TRACK=BASE_URL+'/api/order/track/';
export const ORDER_PAY_SEND_MAIL=BASE_URL+'/api/order/payment/success/mail/';













