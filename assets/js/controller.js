if (window.location.href.indexOf("article_create") > -1) {
    unactivce_menu("articles_menu")
    $(function () {
        $("#content").load(route_address + "/html/article_create.html");
    });
} else if (window.location.href.indexOf("articles_read") > -1) {
    console.log("here2")
    unactivce_menu("articles_menu")
    $(function () {
        $("#content").load(route_address + "/html/article_read.html");
    });
} else if (window.location.href.indexOf("articles") > -1) {
    unactivce_menu("articles_menu")
    $(function () {
        $("#content").load(route_address + "/html/articles.html");
    });
} else if (window.location.href.indexOf("diaries_create") > -1) {
    unactivce_menu("diaries_menu")
    $(function () {
        $("#content").load(route_address + "/html/diaries_create.html");
    });
} else if (window.location.href.indexOf("diaries_read") > -1) {
    console.log("here2")
    unactivce_menu("diaries_menu")
    $(function () {
        $("#content").load(route_address + "/html/diaries_read.html");
    });
} else if (window.location.href.indexOf("diaries") > -1) {
    unactivce_menu("diaries_menu")
    $(function () {
        $("#content").load(route_address + "/html/diaries.html");
    });
} else if (window.location.href.indexOf("store_create") > -1) {
    unactivce_menu("store_menu")
    $(function () {
        $("#content").load(route_address + "/html/store_create.html");
    });
} else if (window.location.href.indexOf("store") > -1) {
    unactivce_menu("store_menu")
    $(function () {
        $("#content").load(route_address + "/html/store.html");
    });
} else {
    console.log("here")
    unactivce_menu("index_menu")
    $(function () {
        $("#content").load(route_address + "/html/main.html");
    });
}

function unactivce_menu(menu) {
    $("#index_menu").removeClass("active")
    $("#articles_menu").removeClass("active")
    $("#Diarie_menu").removeClass("active")
    $("#match_menu").removeClass("active")
    $("#store_menu").removeClass("active")

    $("#" + menu).addClass("active")
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

setTimeout(() => {
    butt.already_login();
}, 100);
setInterval(() => {
    butt.already_login();
}, 5000);
var butt = {
    login_block: () => {
        $("#login_block").show();
        $("#register_block").hide();
    },
    register_block: () => {
        $("#login_block").hide();
        $("#register_block").show();
    },
    already_login: () => {
        if (getCookie("FUCKCOOK") != "") {
            $("#login_register_butt").hide();
            $("#logout_butt").show();
        } else {
            $("#login_register_butt").show();
            $("#logout_butt").hide();
        }
    },
    article_create: () => {
        if (getCookie("FUCKCOOK") != "") {
            window.location = route_address + "/article_create";
        } else {
            toastem.show('danger', "กรุณาเข้าสู่ระบบหรือสมัครสมาชิคก่อน");
        }
    },
    diaries_create: () => {
        if (getCookie("FUCKCOOK") != "") {
            window.location = route_address + "/diaries_create";
        } else {
            toastem.show('danger', "กรุณาเข้าสู่ระบบหรือสมัครสมาชิคก่อน");
        }
    },
    store_create: () => {
        if (getCookie("FUCKCOOK") != "") {
            window.location = route_address + "/store_create";
        } else {
            toastem.show('danger', "กรุณาเข้าสู่ระบบหรือสมัครสมาชิคก่อน");
        }
    }
}
var apps = {
    register: () => {
        let username = $('#reg_username').val();
        let pass1 = $('#reg_pass1').val();
        let pass2 = $('#reg_pass2').val();
        let facebook = $('#reg_facebook').val();
        $.get(route_address + '/api/register?username=' + username + '&pass1=' + pass1 + '&pass2=' + pass2 + '&facebook=' + facebook, function (data, textStatus, xhr) {
            if (data.status) {
                toastem.show('success', data.text);
            } else {
                toastem.show('danger', data.text);
            }
        })
    },
    logining: () => {
        console.log("asdsadasd")
        let username = $('#log_username').val();
        let password = $('#log_password').val();
        $.get(route_address + '/api/login?username=' + username + '&password=' + password, function (data, textStatus, xhr) {
            if (data.status) {
                setCookie("FUCKCOOK", data.cookie, 0.5)
                setCookie("jwt", data.token, 0.5)
                setCookie("steam_name", data.steam_name, 0.5)
                toastem.show('success', "Login success");
                var socket = io({
                    reconnection: true,
                    autoConnect: true
                });
                socket.on('authenticated', function () {
                    socket.on(getCookie("FUCKCOOK"), function (data) { });
                })
                socket.emit('authenticate', {
                    token: getCookie("jwt")
                });
                setTimeout(() => {
                    location.reload();
                }, 1000)
            } else {
                toastem.show('danger', data.text);
            }
        })
    },
    logouting: () => {
        setCookie("FUCKCOOK", "", 1)
        toastem.show('danger', "ออกจากระบบ สำเร็จ");
        setTimeout(() => {
            location.reload();
        }, 1000)
        return true
    },
    article_create: () => {
        let at_title = $('#article_create_title').val();
        let at_type = $('#article_create_type').val();
        let at_image = $('#article_create_image').val().replace(/.*(\/|\\)/, '');
        let at_text = $('#article_create_text').val();
        let new_text = at_text.replace(/(\r\n|\n|\r)/gm, "");
        console.log(at_title)
        $.get(route_address + '/api/article_create?fuckcook=' + getCookie("FUCKCOOK") + '&title=' + at_title + '&type=' + at_type + '&image=' + at_image + '&text=' + new_text, function (data, textStatus, xhr) {
            if (data.status) {
                document.getElementById("uploaders").submit();
                toastem.show('success', "เขียนบทความเรียบร้อย");
            } else {
                toastem.show('danger', "กรุณาเข้าสู่ระบบก่อนเขียนบทความ");
            }
        });
    },
    at_reader: () => {
        $.get(route_address + '/api/at_read?id=' + getUrlParameter('id'), function (data, textStatus, xhr) {
            if (data.status) {
                console.log(data)
                items = data.items[0];
                $("#titles").text(items.title)
                $("#images").attr("src", `assets/user_upload/` + items.image + ``);
                var $geek = $("#texts"),
                    str = "A <b>computer science portal</b> for <b>geeks</b>",
                    html = jQuery.parseHTML(items.text),
                    nodeNames = [];
                $geek.append(html);
            } else {
            }
        });
    },
    at_list: () => {
        $.get(route_address + '/api/at_list', function (data, textStatus, xhr) {
            if (data.status) {
                document.getElementById("article_list").innerHTML = ``;
                items = data.items;
                for (var i = 0; i < items.length; i++) {
                    let div_item = document.createElement("div");
                    div_item.setAttribute("class", "col-12 col-md-4 col-lg-4")
                    div_item.innerHTML = `
                        <div class="card">
                            <div class="card-header p-0 mx-3 mt-3 position-relative z-index-1" style="height:250px;">
                                <a class="d-block" href="` + route_address + `/articles_read?id=` + items[i].id + `"><img class="img-cover1 border-radius-lg" height="100%" src="assets/user_upload/` + items[i].image + `"></a>
                            </div>
                            <div class="card-body pt-2">
                                <a class="card-title h2 d-block text-darker" href="` + route_address + `/articles_read?id=` + items[i].id + `">` + items[i].title + `</a>
                                <div class="author align-items-center">
                                    <div class="name ps-3">
                                        <code>ผู้อ่าน: `+ items[i].view + `</code> <small>(` + items[i].date + `)</small><br>
                                        <span>เขียนโดย: <span class="text-gradient text-primary text-uppercase text-xs font-weight-bold my-2">`+ items[i].username + `</span></span>
                                        <div class="stats"></div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    document.getElementById("article_list").append(div_item);
                }
            } else {
            }
        });
    },
    diaries_create: () => {
        let diaries_title = $('#diaries_create_title').val();
        let diaries_type = $('#diaries_create_type').val();
        let diaries_strain = $('#diaries_create_strain').val();
        let diaries_breeder = $('#diaries_create_breeder').val();
        let diaries_light = $('#diaries_create_light').val();
        let diaries_watt = $('#diaries_create_watt').val();
        let diaries_medium = $('#diaries_create_medium').val();
        let diaries_veg = $('#diaries_create_veg').val();
        let diaries_bloom = $('#diaries_create_bloom').val();
        let diaries_seed_type = $('#diaries_seed_type').val();
        let diaries_image = $('#diaries_create_image').val().replace(/.*(\/|\\)/, '');
        $.get(route_address + '/api/diaries_create?fuckcook=' + getCookie("FUCKCOOK") + '&title=' + diaries_title + '&strain=' + diaries_strain + '&breeder=' + diaries_breeder + '&indoor=' + diaries_type + '&light=' + diaries_light + '&watt=' + diaries_watt + '&medium=' + diaries_medium + '&veg=' + diaries_veg + '&bloom=' + diaries_bloom + '&image=' + diaries_image + '&seed_type=' + diaries_seed_type, function (data, textStatus, xhr) {
            if (data.status) {
                document.getElementById("uploaders").submit();
                toastem.show('success', "สร้างไดอรี่ไม้เรียบร้อย");
            } else {
                toastem.show('danger', "กรุณาเข้าสู่ระบบก่อนสร้างไดอรี่ไม้");
            }
        });
    },
    diaries_reader: () => {
        $.get(route_address + '/api/diaries_read?id=' + getUrlParameter('id'), function (data, textStatus, xhr) {
            if (data.status) {
                console.log(data)
                document.getElementById("data_here1").innerHTML = ``;
                items = data.items[0];
                $("#titles").text(items.title)
                $("#usernames").text(items.username)
                let medium
                let indoor
                let seed_type
                if (items.seed_type == 1) {
                    seed_type = "Autoflower"
                } else {
                    seed_type = "Photoperiod"
                }
                if (items.indoor == 1) {
                    indoor = "Indoor"
                } else {
                    indoor = "Outdoor"
                }
                if (items.medium == 1) {
                    medium = "ดิน"
                } else if (items.medium == 2) {
                    medium = "ขุยมะพร้าว"
                } else if (items.medium == 2) {
                    medium = "ไฮโดรโปรนิค"
                } else {
                    medium = "อื่นๆ"
                }
                let div_item = document.createElement("div");
                div_item.setAttribute("class", "row")
                div_item.innerHTML = `
                <div class="col-md-3">
                    <b>พันธุ์:</b> `+ items.strain + `<br>
                    <b>บรีดเดอร์:</b> `+ items.breeder + `<br>
                    <b>ประเภท:</b> `+ seed_type + `
                </div>
                <div class="col-md-3">
                    <b>ไฟ:</b> `+ items.light + `<br>
                    <b>วัตไฟ:</b> `+ items.watt + `<br>
                </div>
                <div class="col-md-3">
                    <b>สถานที่ปลูก:</b> `+ indoor + `<br>
                    <b>วัสดุปลูก:</b> `+ medium + `<br>
                </div>
                <div class="col-md-3">
                    <b>ปุ๋ยทำใบ:</b> `+ items.veg_nutrient + `<br>
                    <b>ปุ๋ยทำดอก:</b> `+ items.bloom_nutrient + `<br>
                </div>`;
                document.getElementById("data_here1").append(div_item);
            } else {
            }
        });
    },
    diaries_weeker: () => {
        $.get(route_address + '/api/diaries_week?id=' + getUrlParameter('id'), function (data, textStatus, xhr) {
            if (data.status) {
                document.getElementById("weeker").innerHTML = ``;
                items = data.items;
                for (var i = 0; i < items.length; i++) {
                    let color;
                    if (items[i].stage == 0) {
                        color = "info"
                    } else if (items[i].stage == 1) {
                        color = "success"
                    } else if (items[i].stage == 2) {
                        color = "warning"
                    } else {
                        color = "danger"
                    }
                    let div_item = document.createElement("button");
                    div_item.setAttribute("class", "badge badge-pill badge-lg bg-gradient-" + color)
                    div_item.setAttribute("style", "color:white;border:0px;")
                    div_item.innerHTML = `<span>WEEK</span><br>
                        <span style="font-size:30px;">`+ items[i].week + `</span>`;
                    document.getElementById("weeker").append(div_item);
                }
            } else {
            }
        });
    },
    diaries_list: () => {
        $.get(route_address + '/api/diaries_list', function (data, textStatus, xhr) {
            if (data.status) {
                document.getElementById("diaries_list").innerHTML = ``;
                items = data.items;
                for (var i = 0; i < items.length; i++) {

                    let div_item = document.createElement("div");
                    div_item.setAttribute("class", "col-12 col-md-4 col-lg-4")
                    div_item.innerHTML = `
                    <div class="card">
                        <div class="card-header p-0 mx-3 mt-3 position-relative z-index-1" style="height:250px;">
                            <a class="d-block" href="`+ route_address + `/diaries_read?id=` + items[i].id + `"><img class="img-cover1 border-radius-lg" height="100%" src="assets/user_upload/` + items[i].image + `"></a>
                        </div>
                        <div class="card-body pt-2">
                            <a class="card-title h2 d-block text-darker" href="`+ route_address + `/diaries_read?id=` + items[i].id + `">` + items[i].title + `</a>
                            <div class="author align-items-center">
                                <div class="name ps-3">
                                    <code>ผู้อ่าน: `+ items[i].view + `</code> <small>(` + items[i].date_update + `)</small><br>
                                    <span>เขียนโดย: <span class="text-gradient text-primary text-uppercase text-xs font-weight-bold my-2">`+ items[i].username + `</span></span>
                                    <div class="stats"></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    document.getElementById("diaries_list").append(div_item);
                }
            } else {
            }
        });
    },
    flower_create: () => {
        let flower_breeder = $('#flower_create_breeder').val();
        let flower_strain = $('#flower_create_strain').val();
        let flower_g = $('#flower_create_g').val();
        let flower_oz = $('#flower_create_oz').val();
        let flower_100 = $('#flower_create_100').val();
        let flower_thc = $('#flower_create_thc').val();
        let flower_cbd = $('#flower_create_cbd').val();
        let flower_ship = $('#flower_create_ship').val();
        let flower_info = $('#flower_create_info').val();
        let flower_contact = $('#flower_create_contact').val();
        let flower_type = $('#flower_create_type').val();
        let flower_image = $('#flower_create_image').val().replace(/.*(\/|\\)/, '');
        $.get(route_address + '/api/flower_create?fuckcook=' + getCookie("FUCKCOOK") + '&breeder=' + flower_breeder + '&strain=' + flower_strain + '&g=' + flower_g + '&oz=' + flower_oz + '&_100=' + flower_100 + '&thc=' + flower_thc + '&cbd=' + flower_cbd + '&ship=' + flower_ship + '&info=' + flower_info + '&contact=' + flower_contact + '&type=' + flower_type + '&image=' + flower_image, function (data, textStatus, xhr) {
            if (data.status) {
                document.getElementById("uploaders").submit();
                toastem.show('success', "ลงขายดอกไม้เรียบร้อย");
            } else {
                toastem.show('danger', "กรุณาเข้าสู่ระบบก่อนลงขายดอกไม้");
            }
        });
    },
    flower_list: () => {
        $.get(route_address + '/api/flower_list', function (data, textStatus, xhr) {
            if (data.status) {
                document.getElementById("flower_list").innerHTML = ``;
                items = data.items;
                for (var i = 0; i < items.length; i++) {
                    price = items[i].price_100 / 100 + "-" + items[i].price_g
                    let div_item = document.createElement("div");
                    div_item.setAttribute("class", "col-6 col-md-3 col-lg-3")
                    div_item.innerHTML = `
                    <div class="card">
                        <div class="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                            <a class="d-block" href="javascript:;"><img class="img-cover3 border-radius-lg" src="assets/user_upload/`+ items[i].image + `"></a>
                        </div>
                        <div class="card-body pt-2">
                            <a class="card-title h5 d-block text-darker" href="javascript:;">`+ items[i].breeder + `: ` + items[i].name + `</a>
                            <h4>`+ price + `THB / G</h4>
                            <div class="author align-items-center">
                                <button class="btn btn-sm btn-success btn-block" data-target="#flower_reader" data-toggle="modal" onclick="apps.flower_read(`+ items[i].id + `)">สั่งซื้อ</button>
                            </div>
                        </div>
                    </div>`;
                    document.getElementById("flower_list").append(div_item);
                }
            } else {
            }
        });
    },
    flower_read: (ids) => {
        $.get(route_address + '/api/flower_read?id=' + ids, function (data, textStatus, xhr) {
            if (data.status) {
                setTimeout(() => {
                    document.getElementById("strain_info").innerHTML = ``;
                    items = data.items[0];
                    console.log(items)
                    let type
                    if (items.type == 1) {
                        type = "Indoor"
                    } else {
                        type = "Outdoor"
                    }
                    let div_item = document.createElement("div");
                    div_item.innerHTML = `
                    <div class="card-header pb-0 text-left">
                        <span class="h3">`+ items.breeder + `: ` + items.name + `</span><button class="float-right btn btn-sm btn-danger" onclick="$('#flower_reader').modal('hide');">ปิด</button><br>
                        <br>
                    </div>
                    <div class="card-body">
                        <img class="img-cover1 border-radius-lg" src="assets/user_upload/`+ items.image + `"><br>
                        <br>
                        <div class="row">
                            <div class="col-md-6">
                                <b>ชื่อสายพันธุ์:</b> `+ items.name + `<br>
                                <b>ค่ายเมล็ด:</b> `+ items.breeder + `<br>
                                <b>ประเภทการปลูก:</b> `+ type + `<br>
                                <b>รายละเอียด:</b> `+ items.information + `
                            </div>
                            <div class="col-md-6">
                                <b>THC:</b> `+ items.thc + `%<br>
                                <div class="progress">
                                    <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="`+ items.thc + `" class="progress-bar bg-warning" role="progressbar" style="width:` + items.thc + `%;"></div>
                                </div><b>CBD:</b> `+ items.cbd + `%<br>
                                <div class="progress">
                                    <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="`+ items.cbd + `" class="progress-bar bg-info" role="progressbar" style="width:` + items.cbd + `%;"></div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-6">
                                <b>ราคาต่อ 1 กรัม:</b> `+ items.price_g + ` THB<br>
                                <b>ราคาต่อ 30 กรัม:</b> `+ items.price_30 + ` THB<br>
                                <b>ราคาต่อ 100 กรัม:</b> `+ items.price_100 + ` THB<br>
                            </div>
                            <div class="col-md-6">
                                <b>ค่าจัดส่ง:</b> `+ items.ship + ` THB<br>
                                <b>ติดต่อ:</b> ช่องทางการติดต่อสั่งซื้อ<br>
                                <b>ผู้ขาย:</b> `+ items.username + `
                            </div>
                        </div>
                    </div>`
                    document.getElementById("strain_info").append(div_item);
                }, 100);
            } else {
            }
        });
    },
}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
function sidebar() {
    setTimeout(() => {
        document.getElementById("sidenav-main").style.transform = "translateX(0px)";
    }, 10);
}
$(document).mouseup(function (e) {
    $(function () {
        let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

        if (isMobile) {
            document.getElementById("sidenav-main").style.transform = "translateX(-250px)";

            //Conditional script here
        }
    });
});