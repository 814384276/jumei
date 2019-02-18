$(function () {

    //判断用户是否登录状态
    //console.log(document.cookie);
    if ($.cookie('name')) {
        var html = `<li class="signin">欢迎您，<span class="col_jumei"><a href="##" target="_blank" style="color: #ed155b">${$.cookie('name')} </a></span> [ <a class="signout" href="##" style="color: #ed155b">退出</a> ]</li>`;
        $(".header_top_left").html(html);
        // $.ajax({
        //     url: "../api/today.php",
        //     type: "post",
        //     data: {
        //         m: "cart"
        //     },
        //     success: function (str) {
        //         //console.log(str)
        //         var arr = JSON.parse(str);
        //         console.log(arr);
        //         $(".cart_num").html(arr.total);
        //     }
        // });
        $.ajax({
            url: "../api/today.php",
            type: "post",
            data: {
                m: "cart"
            },
            success: function (str) {
                //console.log(str)
                var arr = JSON.parse(str);
                console.log(arr);
                $(".cart_num").html(arr.total);
            }
        });
    }


    //退出登录
    $(".signout").click(function () {
        alert("退出成功");
        $.removeCookie('name', { path: '/' });
        window.location.reload();
    });

    //渲染数据
    function xuanran(arr) {
        var html = arr.map(function (item) {
            return `<li class="item hai" data-id="${item.goodid}">
                                <div class="item_wrap clearfix  " style="left: -16px;">
                                    <div class="item_wrap_right">
                                        <div class="s_l_pic">
                                            <div class="icon_wrap clearfix">
                                                <strong style="color: #ec2b8c">【海外自营】</strong>
                                            </div>
                                            <a href="##">
                                                <img width="255" height="255" src="../images/${item.img}"
                                                    style="display: inline;">
                                            </a>
                                        </div>

                                        <div class="s_l_name">
                                            <a href="##">
                                                ${item.title}
                                            </a>
                                        </div>
                                        <div class="s_l_view_bg">
                                            <div class="search_list_price">
                                                <label>¥</label>
                                                <span>${item.nowpric}</span>
                                            </div>
                                        </div>
                                        <div class="search_deal_buttom_bg clearfix">
                                            <div class="search_pl">月销${item.liker}</div>
                                        </div>
                                        <div class="search_list_button">
                                            <a class="track_click  zuhe_zhifu_dingjing" title="去看看"
                                                href="####"></a>
                                        </div>
                                        <p class="search_list_tags">
                                            ${miaoshu(item.miaoshu)}
                                        </p>
                                    </div>
                                </div>
                            </li>`;
        }).join("");
        //console.log(html)
        //处理描述函数

        $("#listAllcontent").html(html);

        $(".hai").hover(function () {
            $(this).addClass("hover_sm");
            $(this).find(".search_list_tags").css({ "display": "block" });
        }, function () {
            $(this).removeClass("hover_sm");
            $(this).find(".search_list_tags").css({ "display": "none" });
        });
    }


    function miaoshu(str) {
        //console.log(str);
        var arr = str.split(" ");
        //console.log(arr);
        var miaoStr = arr.map(function (item) {
            return `<span href="###">${item}</span>`;
        }).join("");
        return miaoStr;
        //console.log(miaoStr);
    }

    //渲染数据
    $.ajax({
        type: "post",
        data: {
            m: "list"
        },
        url: "../api/today.php",
        success: function (str) {
            //console.log(str);
            console.log("渲染数据")
            var arr = JSON.parse(str);
            xuanran(arr);
            //console.log(arr);
        }
    });
    $(".moren").click(function () {

        $.ajax({
            type: "post",
            data: {
                m: "list"
            },
            url: "../api/today.php",
            success: function (str) {
                //console.log(str);
                var arr = JSON.parse(str);
                xuanran(arr);
                //console.log(arr);
            }
        });
    });
    //**按价格排序

    var price = "ascending";//升序
    $(".price_sort").click(function () {

        //升序
        if (price == "ascending") {
            $.ajax({
                type: "post",
                data: {
                    m: "price"
                },
                url: "../api/today.php",
                success: function (str) {
                    //console.log(str);

                    var arr = JSON.parse(str);
                    xuanran(arr);
                    price = "descending";
                }
            })
        }
        //降序
        if (price == "descending") {

            $.ajax({
                type: "post",
                data: {
                    m: "descending"
                },
                url: "../api/today.php",
                success: function (str) {
                    //console.log(str);

                    var arr = JSON.parse(str);
                    xuanran(arr);
                    price = "ascending";
                }
            })
        }

    });


    $("#paixun > li").click(function () {
        //console.log($(this))
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
    });

    //销量
    $(".sales").click(function () {

        $.ajax({
            type: "post",
            data: {
                m: "sales"
            },
            url: "../api/today.php",
            success: function (str) {
                //console.log(str);
                var arr = JSON.parse(str);
                xuanran(arr);
                //console.log(arr);
            }
        });
    });



    //跳到详情页
    $("#listAllcontent").on("click", "li", function () {
        //console.log($(this));
        //console.log($(this).attr("data-id"));
        var str = $(this).attr("data-id");
        console.log(str)
        location.href = "detail.html?" + str;
    });



    //头部下拉
    $(".header_top_right > li").hover(function () {
        //防止多次触发stop()
        $(this).children(".sub_nav").stop().slideDown();

    }, function () {
        $(this).children(".sub_nav").stop().slideUp("fast");

    });



    //tab
    $(".nav_list>li:nth-of-type(4)").hover(function () {
        $("#nav_content").delay(400).stop().slideDown();
    }, function () {
        $("#nav_content").stop().slideUp("fast");
    });



    //右侧固定条栏

    $(".sidebar").hover(function () {
        $(this).next().css({ "visibility": "visible" });
        $(this).next().stop().animate({
            left: "+=13",
            opacity: 1

        }, "fast", "swing");
    }, function () {

        $(this).next().stop().animate({
            left: '-=13',
            "opacity": 0,

        }, "fast", "swing");
    });

    $(".phonejumei").hover(function () {
        $(this).next().css({ "display": "block" });
    }, function () {
        $(this).next().css({ "display": "none" });
    });

    $("#gotop").click(function () {
        window.scrollTo(0, 0);
    });

    //生成购物车商品li
    function lis(list) {
        var html = list.map(function (item) {
            return `<li class="ibar_cart_item clearfix">
                                <div class="ibar_cart_item_pic">
                                    <a title="${item.title}" href="##">
                                        <img src="../images/${item.img}"
                                            alt="中国•芙优润植物酵素水光套盒">
                                            <span class="ibar_cart_item_tag png"></span>
                                        </a>
                                    </div>
                                <div class="ibar_cart_item_desc">
                                    <span class="ibar_cart_item_name_wrapper">
                                        <span class="ibar_cart_item_global">[极速免税]</span>
                                        <a class="ibar_cart_item_name" title="${item.title}" href="##">${item.title}
                                        </a>
                                    </span>
                                    <div class="ibar_cart_item_sku ibar_text_ellipsis">
                                        <span title=" 一套">型号： 一套</span>
                                    </div>
                                    <div class="ibar_cart_item_price ibar_pink">
                                        <span class="unit_price">￥${item.nowprice}</span>
                                        <span class="unit_plus"> x </span>
                                        <span class="ibar_cart_item_count">${item.qty}</span>
                                    </div>
                                </div>
                            </li> `;
        }).join("");
        return html;
    }

    //计算价格
    function totalprice(arr) {
        var total = 0;
        arr.map(function (item) {
            total += (item.qty * item.nowprice);
        });
        return total;
    }

    //购物车
    $("#loadcart").click(function () {
        
        $(".ibar_sub_panel").animate({
            right: "40px"
        });
        $.ajax({
            type: "post",
            url: "../api/today.php",
            data: {
                m: "cart"
            },
            success: function (str) {
                //console.log(str);
                var arr = JSON.parse(str);
                //console.log(arr);

                var str1 = `<div class="ibar_plugin ibar_cart_content" id="iBarCart">
                                <div class="ibar_plugin_title">
                                    <span class="ibar_plugin_name">购物车
                                        <span class="ibar_cart_timer" style="display: inline;">
                                            <span class="ibar_pink" id="daojishi">17分32.6秒</span>后清空
                                        </span>
                                    </span>
                                </div>
                                <div class="ibar_plugin_content" style=" overflow-y: auto;">
                                    <div class="ibar_cart_group_container">
                                        <div class="ibar_cart_group ibar_cart_product">
                                            <div class="ibar_cart_group_header clearfix">
                                                <span class="ibar_cart_group_title">聚美优品</span>
                                            </div>
                                            <ul class="ibar_cart_group_items">
                                                ${lis(arr.list)}
                                            </ul>
                                        </div>
                                        
                                    </div>
                                    <div class="ibar_cart_handler ibar_cart_handler_fixed" style="display: block; top: auto;">
                                        <div class="ibar_cart_handler_header clearfix">
                                            <span class="ibar_cart_handler_header_left">共 
                                                <span class="ibar_cart_total_quantity ibar_pink">${arr.total}</span> 
                                                件商品
                                            </span>
                                            <span class="ibar_cart_total_price ibar_pink">￥${totalprice(arr.list).toFixed(2)}</span>
                                        </div>
                                        <a class="ibar_cart_go_btn" href="###">去购物车结算</a>
                                    </div>
                                </div>
                            </div>`;
                //console.log(str1);
                $(".ibar_sub_panel").append(str1);
                //购物车倒计时
                var m = 20;  //分
                var s = 00;  //秒
                timer2 = setInterval(function () { getCountdown() }, 1000);
                function toDb(num) {
                    if (num < 10) {
                        return "0" + num;
                    } else {
                        return num;
                    }
                }
                function getCountdown() {
                    $("#daojishi").html(`${toDb(m)}分${toDb(s)}秒`);
                    if (m == 0 && s == 0) {
                        //alert("倒计时结束");
                        $("#daojishi").html(`加入超时`);
                        clearInterval(timer2);

                    } else if (m >= 0) {
                        if (s > 0) {
                            s--;

                        } else if (s == 0) {
                            m--;
                            s = 59;

                        }

                    }

                }
                getCountdown();

            }
        });




        $(".ibar_sub_panel").on("click", ".ibar_closebtn", function () {
            clearInterval(timer2);
            //console.log(1)
            $(".ibar_sub_panel").animate({
                right: "-427px"

            });
        });

    });

    //跳转购物车
    $("#cart_box").click(function () {
        location.href = "shopping.html";
    });


    $(document).scroll(function () {
        //出现返回顶部
        if ($(window).scrollTop() > 400) {
            $("#gotop").css("display", "block");
        } else {
            $("#gotop").css("display", "none");
        }
    });
});