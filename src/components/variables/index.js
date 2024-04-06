const GLOBAL = {
  allEnableStatus: [
    { id: -1, name: 'All' },
    { id: 0, name: 'Disable' },
    { id: 1, name: 'Enable' }
  ],
  enableStatus: [
    { id: null, name: 'All' },
    { id: 1, name: 'Enable' },
    { id: 0, name: 'Disable' }
  ],
  statusOrder: [
    { name: 'OPEN', id: 'OPEN' },
    { name: 'PENDING', id: 'PENDING' },
    { name: 'CANCELED', id: 'CANCELED' },
    { name: 'PAID', id: 'PAID' },
    { name: 'COMPLETED', id: 'COMPLETED' }
  ],
  statusPayment: [
    { name: 'Pending', id: 'PENDING' },
    { name: 'Canceled', id: 'CANCELED' },
    { name: 'Paid', id: 'PAID' }
  ],
  methods: [
    { name: 'MONEY ORDER', id: 'MONEY_ORDER' },
    { name: 'ONLINE', id: 'ONLINE' },
    { name: 'CRYPTO CURRENCIES', id: 'CRYPTOCURRENCIES' }
  ],
  type: [
    { name: 'PAYMENT', id: 'PAYMENT' },
    { name: 'ORDER', id: 'ORDER' },
    { name: 'BONUS', id: 'BONUS' }
  ],
  statusNotifications: [
    { id: 'pending', name: 'Pending' },
    { id: 'canceled', name: 'Canceled' },
    { id: 'failed', name: 'Faild' },
    { id: 'sent', name: 'Sent' }
  ],
  typeNotifications: [
    { id: 'payment', name: 'PAYMENT' },
    { id: 'order', name: 'ORDER' },
    { id: 'transaction', name: 'TRANSACTION' },
    { id: 'general', name: 'GENERAL' },
    { id: 'account', name: 'ACCOUNT' },
    { id: 'used_traffic', name: 'USED_TRAFFICE' },
    { id: 'expire_time', name: 'EXPIRE_TIME' }
  ],
  typeTransaction: [{ name: 'BONUS', id: 'BONUS' }]
};

export default GLOBAL;
