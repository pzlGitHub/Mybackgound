// 左边区域  相当于选项卡 用class控制背景颜色
$('.list-group-item').on('click', function () {
    if ($(this).attr('id') === 'dis') {
        return false;
    }
    $('.list-group-item').removeClass('list-group-item-active');
    $(this).addClass('list-group-item-active');
    // 调用相对应的区域
    var id = $(this).attr('href');
    $('.tab-pane').removeClass('active');
    $(id).addClass('active');
});
// 三角图标的变换
$('#topAD').on('click', function () {
    $('#topA').toggleClass('glyphicon-triangle-right');
    $('#topA').toggleClass('glyphicon-triangle-bottom');
});
$('#topAD1').on('click', function () {
    $('#topB').toggleClass('glyphicon-triangle-right');
    $('#topB').toggleClass('glyphicon-triangle-bottom');
    $('#topB').toggleClass('collaps');
});
// 点击按钮  切换左侧与右侧区域显示状态
$('.toggle-btn').on('click', function () {
    $(".leftMenu").toggleClass("show");
    $(".rightCon").toggleClass("padding0px");
});