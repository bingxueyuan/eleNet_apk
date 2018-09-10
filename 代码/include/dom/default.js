const APP = {
    draw: function ($, c3, url, equipment) {
        let chart = c3.generate({
            bindto: '#draw',
            data: {
                columns: [
                    [equipment, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ]
            },
            legend: {
                show: false
            },
        });

        setInterval(function () {
            $.ajax({
                url: url,
                data: {
                    token: $.cookie('token')
                },
                type: 'post',
                success: function (a) {
                    a = JSON.parse(a);
                    chart.flow({
                        columns: [
                            [equipment, a[equipment]],
                        ],
                    });
                }
            });
        }, 1000);
    },


};