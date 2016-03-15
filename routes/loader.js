function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      price: '3.00',
      unit: '瓶',
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      price: '3.00',
      unit: '瓶',
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      price: '5.50',
      unit: '斤',
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      price: '15.00',
      unit: '斤',
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: '2.00',
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      price: '4.50',
      unit: '袋',
    },
  ];
}

function initTestEnv(){
  localStorage.clear();
  localStorage.setItem('items',JSON.stringify(loadAllItems()));
  localStorage.setItem('cart','[{"barcode":"ITEM000001","count":5},{"barcode":"ITEM000002","count":1}]');
  localStorage.setItem('receipts',
      '[{' +
      '"carItems":' +
          '[{"barcode":"ITEM000000","count":5},' +
          '{"barcode":"ITEM000002","count":11},' +
          '{"barcode":"ITEM000001","count":6}],' +
        '"total":93.5,' +
        '"id":0},' +
      '{' +
      '"carItems":' +
        '[{"barcode":"ITEM000002","count":"1"}],' +
      '"total":5.5,' +
      '"id":1}]')
}


exports.loadItems = loadAllItems;

