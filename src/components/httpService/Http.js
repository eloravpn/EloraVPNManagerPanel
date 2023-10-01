import Notification from '../toast';

const Http = {
  success(res) {
    Notification.success(res.data.message);
  },
  error(error) {
    if (Array.isArray(error.response.data.detail)) {
      error.response.data.detail.map((i) => Notification.danger(`${i.loc[1]} ${i.msg}`));
    }
    if (error.response) {
      switch (error.response.status) {
        case undefined:
          Notification.danger('Try Again');
          break;
        case 400:
          Notification.danger(error.response.data.detail);
          break;
        case 401:
          localStorage.clear();
          window.location.reload();
          break;
        case 403:
          test();
          break;
        case 404:
          Notification.danger(error.response.data.detail);
          break;
        case 405:
          Notification.danger('درخواست مورد نطر قابل تغییر نمی باشد...!');
          break;
        case 409:
          Notification.danger(error.response.data.detail);
          break;
        case 422:
          Notification.danger(error.response.data.detail[0].message);
          break;
        case 500:
          Notification.danger('مشکل از سمت سرور می باشد لطفا با راهبر تماس بگیرید');
          break;
        default:
          break;
      }
    } else {
      Notification.danger('لطفا اینترنت را بررسی کنید و دوباره سعی کنید!');
    }
  }
};

export default Http;
