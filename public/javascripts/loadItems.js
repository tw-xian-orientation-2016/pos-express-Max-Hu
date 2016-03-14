$( document ).ready(function() {
    //var strHtml;
    //initData();
    //getItemList(function(data){
    //    localstorage.setItem('items',data);
    //    strHtml = loadItems(data);
    //    $("tbody").html(strHtml);
    //});
    //
    //setCartLength(function(data){
    //    $("[name='cart-length']").text(data.length);
    //});
    initData();
    var strHtml = loadItems(getObjectFromLocalStorage('items'));

    $("tbody").html(strHtml);
    $("[name='add_to_cart']").click(function() {
        var barcode = $(this).data('itemid');
        var newCart = updateCart(getObjectFromLocalStorage('cart'),barcode);
        setObjectFromLocalStorage('cart',newCart);
        console.log('####');
        console.log(newCart);
        $.ajax({
            method:'post',
            url: '/api/addData',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {'collection':'cart','cartItems':JSON.stringify(newCart)}
        }).done(function(data){
            //$("[name='cart-length']").text(data.length);
        });
        $("[name='cart-length']").text(getAllCartItemCount(newCart));
    });

    $("[name='cart']").click(function() {
        window.location.replace("/cart");
    });
    $("[name='receipts']").click(function() {
        window.location.replace("/receiptList");
    });
});


