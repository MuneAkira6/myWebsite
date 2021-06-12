var app = new Vue({
    el: '#app',
        data: {
            keywords: '',
            weatherArray: [],
            result: ''
        },
        methods: {
            doSearch: function(){
                if (this.keywords != ''){
                    let cnt = 10;
                    var timer = setInterval(() => {
                        this.result = '我正在算😂请耐心等待' + cnt + '秒';
                        cnt--;
                        if (cnt == 0)
                            clearInterval(timer);
                    }, 1000)
                    let str = '/search?keywords=' + this.keywords;
                    let that = this;/////////////千万注意这里！要不然百思不得其解
                    axios.get(str)//使用get方法发送str
                        .then(function (response) {//收到请求
                            console.log(response);
                            that.result = '平均分：' + response.data.toString().slice(0, 3);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } 
            },
            addKeywords: function(event){
                console.log(event.target);
                this.keywords = event.target.innerHTML;//双向绑定确实方便
            }
        }
})
