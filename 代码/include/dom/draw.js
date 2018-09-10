/**
 * 菜单栏
 */
const gui = $('#gui');
const ph = $('#ph');
const pressure = $('#pressure');
const template = $('#template');
const speed = $('#speed');
const ip = $('#ip');
const token = $('#token');
const about = $('#about');

/**
 * 表格区
 */
const table = $('#table');

/**
 * 绘图区
 */
const draw = $('#draw');

/**
 * 所有菜单栏
 */
const all_menu = $('#ph,#pressure,#template,#speed,#ip,#token');

gui.click(function () {
    draw.hide();
    table.show();
});


all_menu.click(function () {
    table.hide();
    draw.show();
});

ph.click(function () {
    if ( $.cookie('ip') !== 'undefined')
    {
        APP.draw($, c3, $.cookie('ip'), 'ph');
    }
});
pressure.click(function () {
    if ( $.cookie('ip') !== 'undefined')
    {
        APP.draw($, c3, $.cookie('ip'), 'pressure');
    }
});
template.click(function () {
    if ( $.cookie('ip') !== 'undefined')
    {
        APP.draw($, c3, $.cookie('ip'), 'template');
    }
});
speed.click(function () {
    if ( $.cookie('ip') !== 'undefined')
    {
        APP.draw($, c3, $.cookie('ip'), 'speed');
    }
});


ip.click(function () {
    let ip_dialog = Metro.dialog.create({
        title: "填写IP/URL地址",
        content: "<input id=\"ip_input\" title=\"\" type=\"text\" data-role=\"input\">",
        actions: [
            {
                caption: "确认",
                cls: "js-dialog-close alert",
                onclick: function(){

                    let ip_input = $('#ip_input').val();

                    $.cookie('ip', ip_input, { expires: 365, path: '/' });
                }
            },
            {
                caption: "取消",
                cls: "js-dialog-close",
                onclick: function(){
                    Metro.dialog.close(ip_dialog)
                }
            }
        ]
    });
});
token.click(function () {
    let token_dialog = Metro.dialog.create({
        title: "填写IP/URL地址",
        content: "<input id=\"ip_input\" title=\"\" type=\"text\" data-role=\"input\">",
        actions: [
            {
                caption: "确认",
                cls: "js-dialog-close alert",
                onclick: function(){

                    let token_input = $('#ip_input').val();

                    $.cookie('token', token_input, { expires: 365, path: '/' });

                }
            },
            {
                caption: "取消",
                cls: "js-dialog-close",
                onclick: function(){
                    Metro.dialog.close(token_dialog)
                }
            }
        ]
    });
});

function drawText(dom, text = '')
{
    const canvas = dom;
    //简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误

    if(canvas.getContext)
    {
        //获取对应的CanvasRenderingContext2D对象(画笔)
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,100,100);
        //设置字体样式
        ctx.font = "20px Courier New";
        //设置字体填充颜色
        ctx.fillStyle = "blue";
        //从坐标点(50,50)开始绘制文字
        ctx.fillText(text, 0, 26);
    }
}
setInterval(function(){
    $.ajax({
        url: $.cookie('ip'),
        data: {
            token:  $.cookie('token')
        },
        type: 'post',
        success: function (data) {
            data = JSON.parse(data);
            drawText(document.getElementById("ph-val"), data['ph']);
            drawText(document.getElementById("pressure-val"),  data['pressure']);
            drawText(document.getElementById("template-val"),  data['template']);
            drawText(document.getElementById("speed-val"),  data['speed']);
        }
    })
}, 1000);

about.click(function () {
    Metro.notify.create("V 1.0.0.0", "测试版", {});
});

console.log($.cookie('ip'));