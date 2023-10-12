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
  statuses: [
    { name: 'OPEN', id: 'OPEN' },
    { name: 'PENDING', id: 'PENDING' },
    { name: 'CANCELED', id: 'CANCELED' },
    { name: 'PAID', id: 'PAID' },
    { name: 'COMPLETED', id: 'COMPLETED' }
  ],
  methods: [
    { name: 'MONEY ORDER', id: 'MONEY_ORDER' },
    { name: 'ONLINE', id: 'ONLINE' },
    { name: 'CRYPTO CURRENCIES', id: 'CRYPTOCURRENCIES' }
  ],
  type: [
    { name: 'PAYMENT', id: 'PAYMENT' },
    { name: 'ORDER', id: 'ORDER' },
    { name: 'BOUNS', id: 'BOUNS' }
  ]
};

export default GLOBAL;
