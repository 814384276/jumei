$(function () {
    var name = $.cookie('name')
    //console.log(name);
    $("#uname").html(name);

    //退出
    // $(".user_box .out").click(function () {
    //     var exp = new Date();
    //     exp.setTime(exp.getTime() + 60 * 200000);//过期时间 2分钟
    //     document.cookie = "name=" + name + ";expires=" + exp.toGMTString();
    // });

    //倒计时
    var m = 20;  //分
    var s = 00;  //秒

    getCountdown();
    var timer = setInterval(function () { getCountdown() }, 1000);
    function toDb(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }
    function getCountdown() {
        $(".cart_timer_text").html(`${toDb(m)}分${toDb(s)}秒`);
        if (m == 0 && s == 0) {
            //alert("倒计时结束");
            clearInterval(timer);

        } else if (m >= 0) {
            if (s > 0) {
                s--;

            } else if (s == 0) {
                m--;
                s = 59;

            }

        }

    }
    // //计算省钱的价格
    // function preferential() {
    //     if (arguments.length == 2) {
    //         return arguments[1] - arguments[0];
    //     }
    //     return 0;
    // }
    //渲染购物车
    $.ajax({
        url: "../api/shopping.php",
        type: "post",
        data: {
            "m": "initialize"
        },
        success: function (str) {
            //console.log(str);
            var arr = JSON.parse(str);
            //console.log(arr);
            var html = arr.map(function (item) {
                return `<tr class="cart_item" data-id="${item.goodid}">
                            <td valign="top">
                                <div class="clearfix">
                                    <input type="checkbox" class="cart_item_selector">
                                    <div class="cart_item_desc_wrapper">
                                        <a class="cart_item_pic" href="###">
                                            <img src="../images/${item.img}"
                                                    alt="${item.title}">
                                        </a>
                                        <span class="cart_item_global">[极速免税]</span>
                                        <a class="cart_item_link" title="${item.title}" href="###">
                                                ${item.title}
                                        </a>
                                        <p class="sku_info"> 容量：<span class="cart_item_capacity">15ml</span> </p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="cart_item_price">
                                    <p class="jumei_price">${item.nowprice}</p>
                                    <p class="market_price ">${item.passprice}</p>
                                </div>
                            </td>
                            <td>
                                <div class="cart_item_num ">
                                    <div class="item_quantity_editer clearfix">
                                        <span class="decrease_one">-</span>
                                        <input class="item_quantity" type="text" value="${item.qty}">
                                        <span class="increase_one ">+</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="cart_item_total">
                                    <p class="item_total_price">${item.nowprice * item.qty}</p>
                                    <p class="shengyu">省 <span>${(item.passprice - item.nowprice) * item.qty}</span></p>
                                </div>
                            </td>
                            <td>
                                <div class="cart_item_option">
                                    <a class="delete_item" href="javascript:void(0)" title="删除"></a>
                                </div>
                            </td>
                        </tr>`;
            }).join("");
            //console.log(html);
            $("#tbody").prepend(html);
            $(".decrease_one").each(function (index) {
                if ($(this).next().val() - 0 == 1) {
                    $(this).addClass("disabled");
                } else {
                    $(this).removeClass("disabled");
                }
            });
            $(".cart_item").each(function () {
                //console.log($(this).find(".market_price ").html());
                if (!$(this).find(".market_price ").html()) {
                    $(this).find(".shengyu ").remove();
                }
            });
            update();
        }
    });

    //操作购物车
    //加
    $("#tbody").on("click", ".increase_one ", function () {
        //console.log($(this).prev().val()); 
        var val = $(this).prev().val() - 0;
        //console.log(++val);
        $(this).prev().val(++val);
        var itemId = $(this).parents(".cart_item").attr("data-id");
        if ($(this).prev().val() - 0 > 1) {
            $(this).siblings(".decrease_one").removeClass("disabled");
        } else {
            $(this).siblings(".decrease_one").addClass("disabled");
        }
        //console.log(itemId);
        $.ajax({
            url: "../api/shopping.php",
            type: "post",
            data: {
                "m": "increase",
                "itemid": itemId
            },
            success: function (str) {
                //console.log(str);  //操作成功返回1
            }
        });
        goodPrice($(this));
    });



    //减
    $("#tbody").on("click", ".decrease_one ", function () {
        //console.log($(this).prev().val()); 
        var val = $(this).next().val() - 0;
        var itemId = $(this).parents(".cart_item").attr("data-id");
        //console.log(val);
        var _this = $(this);
        //console.log($(this).next());

        if (val <= 1) {
            val = 1;
            $(this).addClass("disabled");
        } else {

            if (val <= 1) {
                $(this).addClass("disabled");
            }
            $(this).removeClass("disabled");
            $.ajax({
                url: "../api/shopping.php",
                type: "post",
                data: {
                    "m": "decrease",
                    "itemid": itemId
                },
                success: function (str) {
                    // console.log(str);  //操作成功返回1
                    --val;
                    _this.next().val(val);
                    goodPrice(_this);
                }
            });
        }

    });

    //删除

    $("#tbody").on("click", ".delete_item ", function () {
        var deletearr = [];  //只存放最后删除的
        //console.log($(this).parents(".cart_item").find(".cart_item_link").attr("title"));
        var _this = $(this);

        var title = $(this).parents(".cart_item").find(".cart_item_link").attr("title");

        var html = `<tr class="cancel_delete"> 
                        <td colspan=" 5 ">
                            <div class="cancel_delete_wrapper"> 您已删除
                                <a class="deleted_item_url" href="###" target="_blank">${title}
                                </a> ，如有误， 可<a class="do_cancel_delete" href="javascript:void(0)">撤销删除
                                </a>
                            </div>
                        </td>
                    </tr>`;
        //$("#tbody .cancel_delete").replaceWith(html);
        if (deletearr.length >= 1) {
            deletearr = [];//只存放最后删除的
        }
        deletearr.push(_this.parents(".cart_item"));
        //console.log(deletearr);

        $(".cancel_delete").remove(); //删除其他再添加自己
        $(this).parents(".cart_item").after(html);
        //detach可以保留原本的绑定的事件
        $(this).parents(".cart_item").detach();
        var itemId = $(this).parents(".cart_item").attr("data-id");
        $.ajax({
            url: "../api/shopping.php",
            type: "post",
            data: {
                "m": "delete",
                "itemid": itemId
            },
            success: function (str) {
                //console.log(str);  //操作成功返回1
                goodTotal();
                update();
            }
        });




        //委托时每个都会绑定，每次只执行第一个  so，用普通的事件绑定  bug

        $(".do_cancel_delete").one("click", function () {

            console.log(deletearr[0].attr("data-id"));
            var id = deletearr[0].attr("data-id");
            var img = deletearr[0].find("img").attr("src");
            var arr = img.split("/");
            img = arr[arr.length - 1];
            var title = deletearr[0].find("img").attr("alt");
            var nowprice = deletearr[0].find(".jumei_price").html();
            var passprice = deletearr[0].find(".market_price").html();
            var qty = deletearr[0].find(".item_quantity").val();
            //console.log(img, title, nowprice, passprice, id, qty);
            $.ajax({
                url: "../api/shopping.php",
                type: "post",
                data: {
                    "img": img,
                    "title": title,
                    "nowprice": nowprice,
                    "passprice": passprice,
                    "cid": id,
                    "qty": qty,
                    "m": "canceldelete"
                },
                success: function (str) {
                    //console.log(str);  //操作成功返回1
                    goodTotal();
                }
            });
            $(this).parents(".cancel_delete").after(deletearr[0]);

            $(this).parents(".cancel_delete").remove();



        });

    });

    //计算单个价格
    function goodPrice(now) {
        var nowp = now.parents(".cart_item").find(".jumei_price").html() - 0; // 现在价格
        var passp = now.parents(".cart_item").find(".market_price ").html() - 0; // 原来价格
        var qty = now.parents(".cart_item").find(".item_quantity ").val() - 0; // 原来价格
        var nowtotal = (nowp * qty).toFixed(2);   //   现在单个总价
        var shenyutotal = ((passp - nowp) * qty).toFixed(2);   //  省的钱

        //
        now.parents(".cart_item").find(".item_total_price").html(nowtotal);
        if (now.parents(".cart_item").find(".shengyu")) {
            now.parents(".cart_item").find(".shengyu").html(`省 <span>${shenyutotal}</span>`);
        }

        goodTotal();
    }


    //计算总价
    var arrselected = [];
    function goodTotal() {
        arrselected = [];
        var total = 0;  //选中商品数量
        var priceAll = 0; //选中商品总价

        //存被选中的行的下标数

        for (var i = 0; i < $('.cart_item_selector').size(); i++) {
            if ($('.cart_item_selector').eq(i).prop('checked')) {
                arrselected.push(i);
            }
        }
        //console.log(arrselected)
        //所有商品被选中了，控制权限勾上
        if (arrselected.length == $('.cart_item_selector').size()) {
            //所有商品被选中了，控制权限勾上
            $('#js_all_selector').prop('checked', 'checked');
            $('.cart_group_selector').prop('checked', 'checked');
        } else {
            $('#js_all_selector').removeAttr('checked');
            $('.cart_group_selector').removeAttr('checked');
        }


        //计算总价相加
        for (var i = 0; i < arrselected.length; i++) {
            priceAll += $('.cart_item .item_total_price').eq(arrselected[i]).text() * 1;

        }
        total = arrselected.length;

        //设置内容
        $(".group_total_price").html(`¥${priceAll.toFixed(2)}`);
        $(".total_price").html(`¥${priceAll.toFixed(2)}`);
        $(".total_amount").html(`${total}`);

    }

    //单选input绑定
    $("#tbody").on("click", ".cart_item_selector", function () {
        goodTotal();
    });


    //全选、不选
    //attr绑定属性     表单某些属性是有行为的：这种属性需要用prop去绑定
    $('#js_all_selector').on('click', function () {
        if ($(this).prop('checked')) {
            //给所有的复选框都勾上
            $('.cart_item_selector').prop('checked', 'checked');
        } else {
            $('.cart_item_selector').removeAttr('checked');
        }
        goodTotal();
    });


    //清空选中的商品
    var arrempty = [];
    var arremptyID = [];
    function emptySelected() {
        arrempty = [];
        arremptyID = [];
        for (var i = 0; i < $('.cart_item_selector').size(); i++) {
            if ($('.cart_item_selector').eq(i).prop('checked')) {
                arrempty.push(i);
                arremptyID.push($('.cart_item').eq(i).attr("data-id"));
            }
        }
        //console.log(arrempty); //[1, 2]
        console.log(arremptyID); //
        //删除
        
        for (var i = arrempty.length - 1; i >= 0; i--) {//从尾部开始删除
            //console.log(arr[i] + 1);
            $('.cart_item').eq(arrempty[i]).remove();
           
        }
        //删除选中的多条
        for (var i = 0; i < arremptyID.length; i++) {
            $.ajax({
                url: "../api/shopping.php",
                type: "post",
                data: {
                    "idArr": arremptyID[i],
                    "m": "deleteAll"
                },
                success: function (str) {
                    //console.log(str);  //操作成功返回1
                    
                }
            });
        }
        
        goodTotal();
        update();
    }

    $(".clear_cart_all").click(function () {
        var res = confirm('您确定要清空选中的商品吗？');
        if (res) {
            emptySelected();
        }

    });

    //update
    function update() {
        if ($('.cart_item').size() == 0) {
            //已结删完所有的行，没有必要保留总价了
            var html = `<div class="cart_empty clearfix"> 
                            <img class="cart_empty_logo" src="../images/empty_icon.jpg" alt="">
                            <div class="cart_empty_right">
                                <h2>您的购物车中没有商品，请先去挑选心爱的商品吧！</h2>
                                <p class="cart_empty_backtip"> 您可以
                                    <a class="btn" href="###">  返回首页  </a> 挑选喜欢的商品,或者
                                </p>
                                <div class="search_block">
                                    <form>
                                        <button type="submit" class="btn_cart_search">搜索</button>
                                        <input name="search" type="text" class="search_input" placeholder="搜搜您想要的商品" autocomplete="off">
                                    </form>
                                </div>
                            </div>
                        </div>`;
            $("#container").html(html);
        }
    }

    
    //跳转主页
    $("#home").click(function() {
        location.href = '../index.html';
    })



});