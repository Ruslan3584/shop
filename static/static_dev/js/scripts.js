$(document).ready(function(){
    var form = $('#form_buying_product');
    console.log(form);


    function basketUpdating(product_id, numberofprod, is_delete){
        var data = {};
        data.product_id = product_id;
        data.numberofprod = numberofprod;
         var csrf_token = $('#form_buying_product [name="csrfmiddlewaretoken"]').val();
         data["csrfmiddlewaretoken"] = csrf_token;

        if (is_delete){
            data["is_delete"] = true;
        }

         var url = form.attr("action");

        console.log(data)
         $.ajax({
             url: url,
             type: 'POST',
             data: data,
             cache: true,
             success: function (data) {
                 console.log("OK");
                 console.log(data.products_total_numberofprod);
                 if (data.products_total_numberofprod || data.products_total_numberofprod == 0){
                    $('#basket_total_numberofprod').text("("+data.products_total_numberofprod+")");
                     console.log(data.products);
                     $('.basket-items ul').html("");
                     $.each(data.products, function(k, v){
                        $('.basket-items ul').append('<li>'+ v.name+', ' + v.numberofprod + 'шт. ' + 'по ' + v.price_per_item + 'грн  ' +
                            '<a class="delete-item" href="" data-product_id="'+v.id+'">x</a>'+
                            '</li>');
                     });
                 }

             },
             error: function(){
                 console.log("error")
             }
         })

    }

    form.on('submit', function(e){
        e.preventDefault();
        console.log('123');
        var numberofprod = $('#number').val();
        console.log(numberofprod);
        var submit_btn = $('#submit_btn');
        var product_id =  submit_btn.data("product_id");
        var name = submit_btn.data("name");
        var price = submit_btn.data("price");
        console.log(product_id );
        console.log(name);

        basketUpdating(product_id, numberofprod, is_delete=false)

    });

    function showingBasket(){
        $('.basket-items').removeClass('hidden');
    };

    // $('.basket-container').on('click', function(e){    //
    //    e.preventDefault();                             //було закоментовано
    //    showingBasket();                                 //
    // });

     $('.basket-container').mouseover(function(){
         showingBasket();

     });

     // $('.basket-container').mouseout(function(){
     //    showingBasket();
     // });

     $(document).on('click', '.delete-item', function(e){
         e.preventDefault();
         product_id = $(this).data("product_id")
         numberofprod = 0;
         basketUpdating(product_id, numberofprod, is_delete=true)
     })



    function calculatingBasketAmount(){
        var total_order_amount = 0;
        $('.total-product-in-basket-amount').each(function() {
            total_order_amount = total_order_amount + parseFloat($(this).text());
        });
        console.log(total_order_amount);
        $('#total_order_amount').text(total_order_amount.toFixed(2));
    };

    $(document).on('change', ".product-in-basket-numberofprod", function(){
        var current_numberofprod = $(this).val();
        console.log(current_numberofprod);

        var current_tr = $(this).closest('tr');
        var current_price = parseFloat(current_tr.find('.product-price').text()).toFixed(2);
        console.log(current_price);
        var total_amount = parseFloat(current_numberofprod*current_price).toFixed(2);
        console.log(total_amount);
        current_tr.find('.total-product-in-basket-amount').text(total_amount);

        calculatingBasketAmount();
    });


    calculatingBasketAmount();

});