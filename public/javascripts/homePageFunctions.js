//
//function addItemInCart(barcode,cartItems){
//    setObjectFromLocalStorage('cart',updateCart(cartItems,barcode));
//    return getAllCartItemCount();
//}
function getItemList(callback){
    $.get('/api/getItems',function(data){
        if (callback){
            callback(data);
        }
    });
}


function updateCart(items,barcode){
    var newItems = [];
    var exist = false;
    items.forEach(function(existItem){
        if (existItem.barcode === barcode) {
            existItem.count ++;
            exist = true;
        }
        var element = {};
        element.barcode = existItem.barcode;
        element.count = existItem.count;
        newItems.push(element);
    })
    if (!exist) {
        newItems.push(createCartItem(barcode,1));
    }
    return newItems;
}

function createCartItem(barcode,count){
    var cartItem = {};
    cartItem.barcode = barcode;
    cartItem.count = count;
    return cartItem;
}

function loadItems (items){
    var strHtml = "";
    items.forEach(function(item){
        strHtml += createHtml(item);
    });
    return strHtml;
}

function createHtml(item) {
    var strHtml = "";
    strHtml += '<tr>';
    strHtml += '<td class="text-center">' + item.name + '</td>';
    strHtml += '<td class="text-center">' + item.price + '(元)/' + item.unit + '</td>';
    strHtml += '<td class="text-center"><button type="button" data-itemid = "' + item.barcode + '" class="btn btn-success" name="add_to_cart" >+</button></td>';
    strHtml += '</tr>';
    return strHtml;
}