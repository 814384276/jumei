$(function () {
    $(".h_more_width").hover(function () {
        $(this).css({ "background": "#fff" }).find(".menu_list").stop().slideDown();
    }, function () {
        $(this).css({ "background": "#ececec" }).find(".menu_list").stop().slideUp();
    });


    //判断用户是否登录状态
    //console.log(document.cookie);
    if ($.cookie('name')) {
        // var html = `<li class="signin">欢迎您，<span class="col_jumei"><a href="##" target="_blank" style="color: #ed155b">${document.cookie} </a></span> [ <a class="signout" href="##" style="color: #ed155b">退出</a> ]</li>`;
        var html = `<li>欢迎您，<a href="##"><span style="color: #ED145B;">${$.cookie('name')}</span></a><span style="padding:0 5px;">[<a href="##" style="padding:0;">退出</a>]</span></li>`;
        $(".denglu").css({ "display": "none" });
        $(".zhuce").css({ "display": "none" });
        $(".header_right").prepend(html);
    }



    var dataId = location.search;
    str = decodeURI(dataId);
    dataId = str.slice(1);
    //console.log(dataId);
    $.ajax({
        type: "post",
        url: "../api/detail.php",
        data: {
            "dataId": dataId
        },
        success: function (str) {
            //console.log(str);
            var arr = JSON.parse(str);
            //console.log(arr);
            arr = arr[0];
            var html = `<div class="detail_title">
                            <p class="title">${arr.detail}</p>
                        </div>
                        <div class="product_pic">
                            <div class="numtimer_box time">
                                <span class="tips">距特卖结束</span>
                                <span class="recom_time_box time_box">
                                    <span class="timer_d_sapn">
                                        0<em>天</em>
                                    </span>
                                    <span class="timer_info_sapn">14<em>:</em>24<em>:</em>00</span></span>
                            </div>
                            <div class="preview_product_id">
                                <img src="../images/${arr.img}">
                            </div>
                        </div>
                        <div class="product_info clearfix">
                            <div class="product_info_list fl">
                                ${miaoshu(arr.miaoshu)}
                            </div>
                            <div class="jiathis_style fr">
                                <a href="###">分享到 &gt;</a>
                            </div>
                        </div>`;
            //console.log(html);
            $("#detail_left").html(html);

            //右边
            var html_right = `<div class="r_first clearfix">
                                <a href="###" rel="nofollow" class="">
                                    <img src="../images/${arr.brand}" class="logo_brand" alt="logo_brand"></a>
                                <div class="flag_box_main clearfix fr">
                                    <img src="../images/${arr.country}" class="p_img_lg fl" alt="flag">
                                    <ul class="fl">
                                        <li>${arr.cname}</li>
                                        <li>${arr.ename}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="r_second">
                                <ul class="price_module clearfix">
                                    <li class="jumei_price"><em class="jp_cur">¥</em>${arr.nowpric}</li>
                                    <li class="market_price"><em>¥</em>${arr.passpric}</li>
                                    <li class="sh_mark" style="display: list-item;">
                                        <span class="rmb_tax" id="rmb_tax">价格详情 &gt;</span>
                                        <div class="mark_layer" style="display: none;">
                                            <b class="caret_out"></b>
                                            <b class="caret_in"></b>
                                            <div class="mark_hover" style="width: 315px;">
                                                <p class="details">价格详情:</p>
                                                <div class="price_detail">
                                                    <p class="deal_price">货价925.36+税价103.64 （增值税、消费税）</p>
                                                    <div class="tax_content"><span>1.财政部，海关总署，国家税务总局发布跨境电子商务零售进口税收政策，自2016年4月8日起，跨境电商单次交易限值为人民币2000元，个人年度交易限值为人民币20000元。</span><br><span>2.跨境电商综合税需按一般贸易增值税及消费税税额的70%征收，税费以结算页金额为准。</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="people clearfix">
                                <div class="num fl"><em>${arr.liker}</em>人已购买</div>
                            </div>
                            <div class="r_third">
                                <!--包邮-->
                                <dl class="mail_policy clearfix">
                                    <dt class="fl">包邮政策：</dt>
                                    <dd>
                                        本商品满299元或2件包邮
                                        （新疆部分区域除外）
                                    </dd>
                                </dl>
                                <!--服务政策-->
                                <dl class="mail_policy clearfix">
                                    <dt class="fl">服务政策：</dt>
                                    <dd>
                                        <a href="###">本商品不支持退货</a>
                                    </dd>
                                </dl>
                            </div>
                            <div class="r_fourth">
                                <a href="javascript:;" class="detail_btn" id="shop_cart">
                                    <span>加入购物车</span>
                                    <i></i>
                                </a>
                            </div>`;
            $("#detail_right").html(html_right);
            

            var html_detail = `<div class="deal_tab_nav" id="anchorbar">
                                    <div class="inner clearfix">
                                        <ul class="clearfix fl">
                                            <li><a href="#spxx">商品信息</a></li>
                                            <li><a href="#spxq">商品详情</a></li>

                                            <li><a href="#syff">使用方法</a></li>

                                            <li><a href="#spsp">商品实拍</a></li>

                                            <li><a href="#yhkb">用户口碑</a></li>
                                            <li><a href="#cjwt">关于极速免税店</a></li>
                                        </ul>
                                        <div class="fr clearfix" id="price">
                                            <span class="nav_fprice fl">
                                                <strong class="">¥${arr.nowpric}</strong>
                                                <span class="nav_price">(<span class="market_price"><em class="">¥</em>
                                                ${passprice(arr.passpric)}</span>)</span>
                                            </span>
                                            <span class="btn"><a href="" id="anchorbarBuyBtn" class="fixed_buy_now">加入购物车</a></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="ptb_30">
                                <div id="spxx" class="content_nav_con  content_book">
                                    <div class="detail_content guts_box"></div>
                                    <div class="content_text">
                                        <div class="deal_con_content">
                                            <table border="0" cellpadding="0" cellspacing="0" style="font-family:arial;">
                                                <tbody>
                                                    <tr>
                                                        <td width="85" align="left"><b>商品名称：</b></td>
                                                        <td width="500"><span>${arr.name}</span></td>
                                                        <td rowspan="7" style="padding-right:0;">
                                                            <img src="../images/${arr.img}"
                                                                class="w200">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="85" align="left"><b>商品型号：</b></td>
                                                        <td>
                                                            <span style="margin-right:10px;">${arr.xinghao}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left"><b>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</b></td>
                                                        <td><span>${arr.pingpai}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left"><b>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类：</b></td>
                                                        <td><span>${arr.type}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left"><b>功&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;效：</b></td>
                                                        <td><span>${arr.miaoshu}</span></td>
                                                    </tr>
                                                   
                                                    <tr>
                                                        <td align="left"><b>特别说明：</b></td>
                                                        <td><span>多款包装随机发货，介意者慎购！</span></td>
                                                    </tr>

                                                   

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="content_img">
                                        <img src="../images/htbsqPC.jpg" alt="gyhwg_img">
                                    </div>
                                </div>
                                <div id="spxq" class="content_nav_con" loaded="loaded">
                                    <div class="detail_content spxq_box"></div>
                                    <div class="content_text">
                                        <img src="../images/15471870483673.jpg" alt="">
                                        <img src="../images/15471870487602.jpg" alt="">
                                        <img src="../images/1547187049643.jpg" alt="">
                                        <img src="../images/15471870494100.jpg" alt="">
                                        <img src="../images/15471870497954.jpg" alt="">
                                        <img src="../images/15471870501431.jpg" alt="">
                                        <img src="../images/15471870504631.jpg" alt="">
                                        <img src="../images/15471870507895.jpg" alt="">
                                        <img src="../images/1547187051484.jpg" alt="">
                                        <img src="../images/15471870514409.jpg" alt="">
                                    </div>
                                </div>
                                <div id="syff" class="content_nav_con">
                                    <div class="detail_content syff_box"></div>
                                    <div class="content_text">
                                        <p>
                                            <p>
                                                本产品适宜存放在阴凉，干燥处，请尽量避免阳光直射。
                                            </p>
                                        </p>
                                    </div>
                                </div>
                                
                            </div>`;
            $(".deal_detail").html(html_detail + $(".deal_detail").html());
            //数据渲染后才查到节点
            passprice(arr.passpric);

            $(document).scroll(function () {
                //console.log($(window).scrollTop());
                if ($(window).scrollTop() > 915) {
                    //console.log("true")
                    $(".deal_tab_nav").addClass("nav_bar_fixed");
                    $("#price").css({ "display": "block" });
                } else {
                    $(".deal_tab_nav").removeClass("nav_bar_fixed");
                    $("#price").css({ "display": "none" })
                }
            });

            
                        
            
        }
    });


    //处理描述函数
    function miaoshu(str) {
        var arr = str.split(" ");
        //console.log(arr);
        var miaoStr = arr.map(function (item) {
            return `<a href="###">${item}</a>`;
        }).join("");
        return miaoStr;
        //console.log(miaoStr);
    }

    //是否有之前的价格
    function passprice(str) {
        //console.log(str);
        if (str == false) {
            //console.log(1)
            $("#detail_right").find(".market_price").css({ "display": "none" });
            //console.log($("#detail_right"))
        }
        if (str == false) {
            //console.log(1)
            $(".deal_detail").find(".nav_price").css({ "display": "none" });
            //console.log($("#detail_right"))
        }
        return str;
    }



    //记得委托
    
    $("#detail_right").on("mouseenter", "#rmb_tax", function () {
        $(this).next().stop().fadeIn();
        
    });
    $("#detail_right").on("mouseleave", "#rmb_tax", function () {
        console.log($(this).next().position())
        
        //$(elem).data("events")[type]
        $(this).next().stop().fadeOut();
    });

    //deal_prefer
    $(".item").on("mouseenter", function () {
        //console.log($(this).parent())
        $(this).stop().animate({"top" : "-80"})
    });
    $(".item").on("mouseleave", function () {
        //console.log($(this).parent())
        $(this).stop().animate({ "top": "0" })
    });


    //倒计时
    
    function toDb(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
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
            $(".numtimer_box").html(`<span class="icon">特卖已结束</span>
            <span class="today_time">00<em>:</em>00<em>:</em>00<em>:</em>00</span>`);
        }
        $(".numtimer_box").html(`<span class="icon">距特卖结束</span>
            <span class="today_time">${day}<em>:</em>${shi}<em>:</em>${min}<em>:</em>${sec}</span>`);

        
    }, 1000);

    //跳转购物车
    $("#cart_box").click(function () {
        location.href = "shopping.html";
    });

    //点击购物车回到顶部
    $("#anchorbarBuyBtn").click(function () {
        window.scrollTo(0, 0);
    });
    

});