# i18n前端国际化实现

### 相关文章

https://cloud.tencent.com/developer/article/1644735

https://zhuanlan.zhihu.com/p/79165787

https://blog.csdn.net/qq_40687327/article/details/81170584

https://blog.csdn.net/chonggaoing/article/details/16119887

### 注意事项

[张三少](https://blog.csdn.net/github_39532240)**:**解决了 ，，引入i18n的时候，不能用min.js，，引入正常版本才行，，不清楚为啥

### jquery.i18n.properties

####  api

**（1）获取浏览器的默认语言：**

```js
jQuery.i18n.browserLang({})
```

chrome的默认语言：

> 中文 zh-CN
>
> 英文 en
>
> 



**（2）加载对应的资源，并执行回调函数，切换页面语言**

```js
    jQuery.i18n.properties({
        name: 'strings', // 资源文件名称  
        path: 'i18n/', // 资源文件所在目录路径  
        mode: 'both', // 模式：变量或 Map  
        language: type, // 对应的语言  
        cache: false,
        encoding: 'UTF-8',
        callback: function () { // 回调方法
            $(".lan_select").val(type);
            $('.username').html($.i18n.prop('string_login_productName'));
            $('.password').html($.i18n.prop('string_login_keepPassword'));
        }
    });
```

注意：修改网页title



**（3）jQuery.i18n.prop()** 

也可以这样写（$.i18n.prop()）

```js
string_prop=今天是{0}天，我们可以出去{1}
string_prop=It is {0} today, We can go {1}

使用：
$('.tip').html($.i18n.prop('string_prop', "晴天", "钓鱼"))

```





https://github.com/jquery-i18n-properties/jquery-i18n-properties