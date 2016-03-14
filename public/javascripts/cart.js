$( document ).ready(function() {
    reflashNumber();
    refreshCartPage();
    $("tbody").html(loadCartItems());
    $("[name='home']").click(function() {
        window.location.replace("/");
    });
    $("[name='receipts']").click(function() {
        window.location.replace("/receiptList");
    });
    $("[name='input-count']").on('input', function (){
        var count;
        if ($(this).val() != '') {
            count = $(this).val();
        } else {
            count = 1;
        }
        var cartItem = createCartItem($(this).data('itemid'),count);
        var newCart = updateCartItem(cartItem,getObjectFromLocalStorage('cart'));
        setObjectFromLocalStorage('cart',newCart);
        $("[name='" + cartItem.barcode + "']").text(formatNumber(
                getSubTotal(cartItem,getObjectFromLocalStorage('items'))) + '(元)');
        refreshCartPage();
        sendCartToServer(newCart);
        reflashNumber();
    });
    $("[name='delete-from-cart']").click(function() {
        var barcode = $(this).data('itemid');
        $(this).parents("tr").remove();
        var cartItems = removeItembyBarcode(barcode,getObjectFromLocalStorage('cart'));
        setObjectFromLocalStorage('cart',cartItems);
        //initData();
        refreshCartPage();
        sendCartToServer(cartItems);
        reflashNumber();
    });

    $("[name='checkout-total']").click(function() {
        var receipt = getReceipt();
        var receipts = addToReceipts(receipt,getObjectFromLocalStorage('receipts'));
        setObjectFromLocalStorage('temple-receipt',receipt);
        setObjectFromLocalStorage('cart',[]);
        sendReceiptsToServer(receipts);
        clearCartInServer();
        window.location.replace("/receipt");
    });
});

function sendCartToServer(newCart){
    $.ajax({
        method:'post',
        url: '/api/addData',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {'collection':'cart','cartItems':JSON.stringify(newCart)}
    }).done(function(data){
        //$("[name='cart-length']").text(data.length);
    });
}

function sendReceiptsToServer(receipts){
    $.ajax({
        method:'post',
        url: '/api/addData',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {'collection':'receipts','cartItems':JSON.stringify(receipts)}
    }).done(function(data){
        //$("[name='cart-length']").text(data.length);
    });
}

function clearCartInServer(){
    $.ajax({
        method:'post',
        url: '/api/clearCollection',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {'collection':'cart'}
    }).done(function(data){
        //$("[name='cart-length']").text(data.length);
    });
}

