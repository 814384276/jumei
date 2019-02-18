$(function () {
    //判断用户是否登录状态
    //console.log(document.cookie);
    if ($.cookie('name')) {
        var html = `<li class="signin">欢迎您，<span class="col_jumei"><a href="##" target="_blank" style="color: #ed155b">${$.cookie('name')} </a></span> [ <a class="signout" href="##" style="color: #ed155b">退出</a> ]</li>`;
        $(".header_top_left").html(html);
        $.ajax({
            url: "api/today.php",
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


    //头部下拉
    $(".header_top_right > li").hover(function () {
        //防止多次触发stop()
        $(this).children(".sub_nav").stop().slideDown();

    }, function () {
        $(this).children(".sub_nav").stop().slideUp("fast");

    });

    //搜索结果
    $(".header_search_input").focus(function () {
        $(".search_result").css({ "display": "block" });
    });

    //
    $(".search_result").on("click", "div", function () {
        //console.log($(this).children("span").html());
        $(".header_search_input").val($(this).children("span").html())
    })

    //解决click与blur冲突的问题
    $(".header_search_input").blur(function () {
        setTimeout(() => {
            $(".search_result").css({ "display": "none" });
        }, 300);


    });

    //
    $(".nav_list>li:nth-of-type(4)").hover(function () {
        $("#nav_content").delay(400).stop().slideDown();
    }, function () {
        $("#nav_content").stop().slideUp("fast");
    });


    //home_top_tab选项卡
    $("#tab_menu > li").click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        var index = $(this).index();
        $(this).parent().next().children().eq(index).css({ "display": "block" }).siblings().css({ "display": "none" })
    });

    //每日必看初始化
    //倒计时
    function toDb(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num
        }
    }

    var timer = setInterval(function () {
        var date = new Date();
        var dis = parseInt((new Date("2019/2/19 00:00:00") - date) / 1000);  //过去某一时间
        var sec = toDb(dis % 60);
        var min = toDb(parseInt(dis / 60 % 60));
        var shi = toDb(parseInt(dis / 60 / 60));
        var day = toDb(parseInt(dis / (60 * 60 * 24)));
        if (dis < 0) {
            clearInterval(timer);
            $(".today_end_time").html(`<span class="icon">距特卖结束</span>
            <span class="today_time" end_time="77296">00<em>:</em>00<em>:</em>00<em>:</em>00</span>`);
        }
        $(".today_end_time").html(`<span class="icon">距特卖结束</span>
            <span class="today_time" end_time="77296">${day}<em>:</em>${shi}<em>:</em>${min}<em>:</em>${sec}</span>`);

        $(".time_box").html(`<em>${day}</em>天
                                                <em>${shi}</em>时
                                                <em>${min}</em>分
                                                <em>${sec}</em>秒`);
        // return {
        //     day: day,
        //     hour: shi,
        //     min: min,
        //     sec: sec
        // }
        //console.log(day, shi, min, sec);


    }, 1000);

    //初始化
    $.ajax({
        type: "post",
        url: "api/today.php",
        data: {
            m: "today"
        },
        success: function (str) {
            //console.log(str)
            var arr = JSON.parse(str);
            //console.log(arr);
            var html = arr.map(function (item) {

                return `<div class="today_tab_content">
                            <a href="###"
                                class="today_tab_link">
                                <img class="all_cart_img" src="images/${item.img}">
                                <span class="today_rank_top_1"></span>
                            </a>
                            <a href="###"
                                class="global_tip" style="display: none;">
                                <span>海外直采</span><span>海外价格</span><span>闪电发货</span>
                            </a>
                            <div class="deals_tags">
                                <span class="tags_list tags_haitao">海淘</span>
                            </div>
                            <div class="products_detail">
                                <div class="products_have_time">
                                    <span class="today_end_time">
                                        <span class="icon">距特卖结束</span>
                                        <span class="today_time" end_time="77296">00<em>:</em>21<em>:</em>09<em>:</em>58</span>
                                    </span>
                                </div>
                                <a href="###"
                                    class="product_short_title">
                                    ${item.detail}</a>
                                <div class="product_price clearfix">
                                    <div class="goto_cart_wrap all_cart_wrap">
                                    <a class="goto_btn goto_cart all_cart" href="javascript:;">加入购物车</a></div>

                                    <span class="now_price"><em>¥</em>${item.nowpric}</span>
                                    <div class="price_wrap">
                                        <div class="icon_wrap">
                                        </div>
                                        <span class="pass_price"><del>${item.passpric}</del></span>
                                    </div>

                                </div>
                                <div class="global_sure_tag">
                                    <span class="g_tag"><img src="images/029_big.jpg"></span>
                                    <span class="wish_like yahei fr"><em>${item.like}</em>人已经购买</span>
                                </div>
                            </div>
                        </div>`;
            }).join("");
            //console.log(html);
            $("#today_tab_wrapper").html(html);


        }
    });


    $("#today_tab_wrapper").on("mouseenter", ".today_tab_content", function () {
        $(this).children(".global_tip").css({ "display": "block" });
        $(this).children(".today_tab_link").css({ "opacity": "0.8" });
    });
    $("#today_tab_wrapper").on("mouseleave", ".today_tab_content", function () {
        $(this).children(".global_tip").css({ "display": "none" });
        $(this).children(".today_tab_link").css({ "opacity": "1" });
    });


    // //今日上新单品
    // var key = true;
    // var num = 0;
    // var len = 0;
    // //懒加载数据
    // $(document).scroll(function (event) {
    //     var event = event || window.event;

    //     var sH = document.documentElement.scrollHeight;

    //     var sT = document.documentElement.scrollTop;

    //     var cH = document.documentElement.clientHeight;

    //     var top = $('#today_new_ul').offset().top - $(window).scrollTop();
    //     //滑到底部加载
    //     if (key && (top < 300)) {
    //         //保证一次加载完再进行下一次加载
    //         key = false;
    //         var timer = setTimeout(() => {

    //             $.ajax({
    //                 url: "api/todaylist.php",
    //                 type: "post",
    //                 data: {
    //                     "qty": 3,
    //                     "num": num
    //                 },
    //                 success: function (str) {
    //                     //console.log(num);
    //                     //console.log(str);
    //                     var arr = JSON.parse(str);
    //                     //console.log(arr);
    //                     len = arr.len; // 数据总长度
    //                     if (num * 3 > len) {
    //                         clearTimeout(timer);
    //                         $(".today_loading").css({ "display": "none" });
    //                     }

    //                     var html = arr.list.map(function (item) {
    //                         //海外的没有销量 倒计时
    //                         if (item.overseas == "true") {
    //                             return `<li class="newdeal_box" overseas=${item.overseas} data-id=${item.goodid}>
    //                                         <div class="img_box">
    //                                             <a class="img_box_href"href="###">
    //                                                 <img alt="${item.imgalt}" src="../images/${item.img}" class="img_400 all_cart_img">
    //                                                 <div class="commit_new" style="display: none;">
    //                                                     <div class="commit_new_box">${item.commitnew}</div>
    //                                                 </div>
    //                                             </a>
    //                                             <div class="deals_tags">
    //                                                 <span class="tags_list tags_haitao"></span>
    //                                             </div>
    //                                             <div class="add_cart_box all_cart_wrap" style="display: none;">
    //                                                 <a href="javascript:;" class="add_cart all_cart">加入购物车</a>
    //                                             </div>
    //                                         </div>
    //                                         <a href="###">
    //                                             <div class="today_new_detail">
    //                                                 <p class="title">${item.title}</p>
    //                                                 <div class="intro_box clearfix">
    //                                                     <div class="price_box clearfix">
    //                                                         <em>¥</em>
    //                                                         <span class="pnum">${item.nowpric}</span>
    //                                                         <div class="price_icon_wrap">
    //                                                             <div class="icon_p">
    //                                                                 <span class="y_icon">${item.baoyou}</span>
    //                                                             </div>
    //                                                         </div>
    //                                                         <div class="price_icon_wrap clearfix">
    //                                                             <div class="icon_p">
    //                                                                 <span class="y_icon">${item.baoyou}</span>
    //                                                             </div>
    //                                                             <span class="mnum">${item.passpric}</span>
    //                                                         </div>
    //                                                     </div>

    //                                                 </div>
    //                                             </div>
    //                                         </a>
    //                                     </li>`;
    //                         }
    //                         //带防伪码
    //                         if (item.securityCode == "yes") {
    //                             return `<li class="newdeal_box"data-id=${item.goodid} overseas=${item.overseas}>
    //                                         <div class="img_box">
    //                                             <a class="img_box_href"href="###">
    //                                                 <img alt="${item.imgalt}" src="../images/${item.img}" class="img_400 all_cart_img">
    //                                                 <div class="commit_new" style="display: none;">
    //                                                     <div class="commit_new_box clearfix">
    //                                                         <b class="link">
    //                                                             <span class="num">48303</span> 条评论
    //                                                         </b>
    //                                                         <div class="service_rating small clearfix">
    //                                                             <span class="rating_num">4.9/5</span>
    //                                                             <div class="rating">
    //                                                                 <div style="width:98.00000000000001%" class="value"></div>
    //                                                             </div>
    //                                                         </div>
    //                                                     </div>
    //                                                 </div>
    //                                             </a>
    //                                             <div class="deals_tags">
    //                                                 <span class="tags_list tags_fangwei"></span>
    //                                             </div>
    //                                             <div class="add_cart_box all_cart_wrap" style="display: none;">
    //                                                 <a href="javascript:;" class="add_cart all_cart">加入购物车</a>
    //                                             </div>
    //                                         </div>
    //                                         <a href="###">
    //                                             <div class="today_new_detail">
    //                                                 <p class="title">${item.title}</p>
    //                                                 <div class="intro_box clearfix">
    //                                                     <div class="price_box clearfix">
    //                                                         <em>¥</em>
    //                                                         <span class="pnum">${item.nowpric}</span>
    //                                                         <div class="price_icon_wrap">
    //                                                             <div class="icon_p">
    //                                                                 <span class="y_icon">${item.baoyou}</span>
    //                                                             </div>
    //                                                         </div>
    //                                                         <div class="price_icon_wrap clearfix">
    //                                                             <div class="icon_p">
    //                                                                 <span class="y_icon">${item.baoyou}</span>
    //                                                             </div>
    //                                                             <span class="mnum">${item.passpric}</span>
    //                                                         </div>
    //                                                     </div>

    //                                                 </div>
    //                                             </div>
    //                                         </a>
    //                                     </li>`;
    //                         }
    //                         //新品
    //                         return `<li class="newdeal_box" overseas=${item.overseas}  data-id=${item.goodid}>
    //                                     <div class="img_box">
    //                                         <a class="img_box_href"href="###">
    //                                         <img alt="${item.imgalt}" src="../images/${item.img}" class="img_400 all_cart_img">
    //                                             <div class="commit_new" style="display: none;">
    //                                                 <div class="commit_new_box">${item.commitnew}</div>
    //                                             </div>
    //                                         </a>
    //                                         <div class="deals_tags">
    //                                             <span class="tags_list tags_xinpin"></span>
    //                                         </div>
    //                                         <div class="add_cart_box all_cart_wrap" style="display: none;">
    //                                             <a href="javascript:;" class="add_cart all_cart">加入购物车</a>
    //                                         </div>
    //                                     </div>
    //                                     <a href="###">
    //                                         <div class="today_new_detail">
    //                                             <p class="title">${item.title}</p>
    //                                             <div class="intro_box clearfix">
    //                                                 <div class="price_box clearfix">
    //                                                     <em>¥</em>
    //                                                     <span class="pnum">${item.nowpric}</span>
    //                                                     <div class="price_icon_wrap">
    //                                                         <div class="icon_p">
    //                                                             <span class="y_icon">${item.baoyou}</span>
    //                                                         </div>
    //                                                     </div>
    //                                                     <div class="price_icon_wrap clearfix">
    //                                                         <div class="icon_p">
    //                                                             <span class="y_icon">${item.baoyou}</span>
    //                                                         </div>
    //                                                         <span class="mnum">${item.passpric}</span>
    //                                                     </div>
    //                                                 </div>
    //                                                 <div class="numtimer_box clearfix">
    //                                                     <div class="time_box">
    //                                                         <em>00</em>天
    //                                                         <em>14</em>时
    //                                                         <em>03</em>分
    //                                                         <em>52</em>秒
    //                                                     </div>
    //                                                     <div class="num_box">销量: <span class="buy_num">${item.liker}</span> |</div>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </a>
    //                                 </li>`;
    //                     }).join("");

    //                     $("#today_new_ul").html($("#today_new_ul").html() + html);
    //                     $(".today_loading").css({ "display": "none" });
    //                     key = true;
    //                     num++;
    //                 }
    //             });
    //         }, 1000);
    //         if (num * 3 > len) {
    //             clearTimeout(timer);
    //             $(".today_loading").css({ "display": "none" });
    //         } else {
    //             $(".today_loading").css({ "display": "block" });
    //         }


    //     }

    // });

    //鼠标滑过效果:购物车显示 commit_new 透明度
    $("#today_new_ul").on("mouseenter", ".newdeal_box", function () {
        //console.log($(this).find(".add_cart_box"));
        $(this).find(".add_cart_box").css({ "display": "block" });
        $(this).find(".commit_new").css({ "display": "block" });
        $(this).css({ "opacity": "0.8" });
        //if ($(this).prop(overseas));
        //console.log($(this).attr("overseas"));
        //console.log($(this));
        //如果是海外
        if ($(this).attr("overseas") == "true") {

            $(this).find(".commit_new_box").html("海外直采 海外价格 闪电发货");
            $(this).find(".commit_new").css({ "background": "#88698e", "textAlign": "center" });
            // $(this).find(".numtimer_box").html("");
        }
    });
    $("#today_new_ul").on("mouseleave", ".newdeal_box", function () {
        $(this).find(".add_cart_box").css({ "display": "none" });
        $(this).find(".commit_new").css({ "display": "none" });
        $(this).css({ "opacity": "1" });
    });




    //brand鼠标滑过透明度效果
    $(".side_content li").hover(function () {
        $(this).css({ "opacity": "0.8" });
    }, function () {
        $(this).css({ "opacity": "1" });
    });

    $(".brand_content .fl").hover(function () {

        $(this).css({ "opacity": "0.8" });
    }, function () {
        $(this).css({ "opacity": "1" });
    });


    //跳到详情页
    $("#today_new_ul").on("click", "li", function () {
        //console.log($(this));
        //console.log($(this).attr("data-id"));
        var str = $(this).attr("data-id");
        location.href = "html/detail.html?" + str;
        event.stopPropagation();
        //event.preventDefalut();

    });


    //加入购物车
    $("#today_new_ul").on("click", ".add_cart", function (event) {
        //console.log($(this));

        //插入到数据库中
        var img = $(this).parent().siblings(".img_box_href").find("img").attr("src");  //图片
        var title = $(this).parent().siblings(".img_box_href").find("img").attr("alt");  //title
        //console.log(img);   //../images/today02.jpg
        var arr = img.split("/");
        img = arr[arr.length - 1];   //
        //console.log(img);    //today02.jpg
        //console.log(title);
        var nowprice = $(this).parent().parent().next().find(".pnum").html();
        var passprice = $(this).parent().parent().next().find(".mnum").html();
        //console.log(nowprice, passprice);
        var goodid = $(this).parent().parent().parent().attr("data-id");
        var qty = 1;

        $.ajax({
            url: "api/shopping.php",
            type: "post",
            data: {
                "img": img,
                "title": title,
                "nowprice": nowprice,
                "passprice": passprice,
                "id": goodid,
                "qty": qty
            },
            success: function (str) {
                //console.log(str);
            }
        });
        event.stopPropagation();
        //event.preventDefalut();


    });

    // //楼层跳跃
    // $(document).scroll(function () {
    //     //console.log($(window).scrollTop());
    //     var top = $('#today_later_tab').offset().top - $(window).scrollTop();
    //     var top2 = $('#today_deals').offset().top - $(window).scrollTop();
    //     var top3 = $('.brands').offset().top - $(window).scrollTop();
    //     //console.log(top2)
    //     if (top < 70) {


    //         $("#home_nav_bar").stop().animate({
    //             "opacity": 1

    //         }, 500, "linear");

    //         $(".nav_mustsee").find("a").css({ "backgroundPosition": "-177px 0" });
    //         $(".nav_today_deals").find("a").css({ "backgroundPosition": "0 -125px" });

    //         if (top2 <= 10) {
    //             //console.log(1)
    //             $(".nav_mustsee").find("a").css({ "backgroundPosition": "0 0" });
    //             $(".nav_today_deals").find("a").css({ "backgroundPosition": "-177px -125px" });
    //         }

    //     } else {
    //         $(".nav_mustsee").find("a").css({ "backgroundPosition": "-177px 0" });
    //         $(".nav_today_deals").find("a").css({ "backgroundPosition": "0 -125px" });

    //         $("#home_nav_bar").stop().animate({
    //             "opacity": 0
    //         }, 500, "linear");
    //     }

    //     if (top3 <= 0) {
    //         $(".nav_mustsee").find("a").css({ "backgroundPosition": "0 0" });
    //         $(".nav_today_deals").find("a").css({ "backgroundPosition": "0 -125px" });
    //     }

    //     //出现返回顶部
    //     if ($(window).scrollTop() > 400) {
    //         $("#gotop").css("display", "block");
    //     } else {
    //         $("#gotop").css("display", "none");
    //     }
    // });


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


    //加入购物车效果
    var offset = $("#cardend").offset();  //结束的地方的元素
    //是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点
    $("#today_new_ul").on("click", ".add_cart", function (event) {
        var addcar = $(this);
        //var endL = $("#end").offset().left;
        var img = addcar.parent().parent().find('img').attr('src');
        var flyer = $('<img class="u-flyer" src="' + img + '">');
        flyer.fly({
            start: {
                // left: event.pageX,
                // top: event.pageY
                left: event.clientX,
                top: event.clientY
            },
            end: {
                left: $("#cardend").offset().left,
                top: $("#cardend").offset().top - window.scrollY,
                width: 0,
                height: 0
            },
            onEnd: function () {
                $.ajax({
                    url: "api/today.php",
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

        });


    });

    //生成购物车商品li
    function lis(list) {
        var html = list.map(function (item) {
            return `<li class="ibar_cart_item clearfix">
                                <div class="ibar_cart_item_pic">
                                    <a title="${item.title}" href="##">
                                        <img src="images/${item.img}"
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
            url: "api/today.php",
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

    //跳到购物车页面
    $(".ibar_sub_panel").on("click", ".ibar_cart_go_btn", function () {
        location.href = "html/shopping.html";
    });


    //跳转列表页
    $(".list").on("click", function () {
        console.log(11)
        location.href = "html/list.html";
    });


    $("#cart_box").click(function () {
        location.href = "html/shopping.html";
    });



});