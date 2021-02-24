# i18n前端国际化实现

### 前沿

最近接到一个项目国际化的任务，要把平台中存在的六个项目全部做成国际化，第一步就是要先把项目中所有的中文都找出来。但是如果从页面上是很难完全找出来的，因为项目比较大，各种错误提示，系统错误等中文消息，都不容易在页面上复现。又加上我对这个六个项目不太熟悉，从页面上找实在是太麻烦。我首先想到的是通过VS Code的搜索功能来找，VS Code的搜索功能可以通过正则表达式的方式进行搜索。中文的范围是**[\u4E00-\u9FA5]+**，然后发现仅一个项目的jsp文件就有200多个，匹配到的内容就有6000多个。还有js、html文件，而且还是6个项目。这种方法显然也很费事费力。只能通过脚本爬取中文以及中文所在的文件了。

请参考这篇文章，看我是如何爬取中文的：https://blog.csdn.net/zyz00000000/article/details/114012727

### 开始

先来理解jquery.i18n实现中英文版本切换的原理，再来看具体实现的实例。

首先将中文汉字以变量的形式存入以zh_CN.properties结尾的文件中。将同样变量名值为英文的数据存入到en_GB.properties结尾的文件中。也可以是en_US.properties文件，总之是properties文件，文件名字与语言对应，已达到语义化的目的。

**语言资源文件：**

**strings_zh_CN.properties文件内容**

> string_prop=今天是{0}，我们可以出去{1}
>
> string_login_productName=项目国际化
>
> string_login_keepPassword=记住密码

**strings_en_GB.properties文件内容**

> string_prop=It is {0} today, We can go {1}
>
> string_login_productName=guojihua
>
> string_login_keepPassword=KeepPassword

### jquery.i18n.properties

jquery.i18n.properties.js这个库，可以判断浏览器的默认语言，根据浏览器的默认语言，加载对应的properties语言资源文件。说到**“加载”**二字，实际上jquery.i18n.properties库内部是发送ajax请求，获取对应的语言资源文件的。

**jquery.i18n.properties库还实现了其他功能接口，比如：**

**（1）jQuery.i18n.browserLang({}) ——**获取浏览器的默认语言

```javascript
jQuery.i18n.browserLang({});
```



**（2）jQuery.i18n.properties({})** ——设置加载语言资源文件的名称、路径、模式、对应语言、编码格式、回调函数等

```javascript
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

            $('.tip').html($.i18n.prop('string_prop', "晴天", "钓鱼"))
        }
    });
```

以上配置项中，name值为strings，language值为zh_CN，来确定加载的语言资源文件名：strings_zh_CN.properties



**（3）$.i18n.prop(key) ——** 根据properties语言资源文件的键key获取对应的变量值

$.i18n.prop('string_login_productName') 获取语言资源文件中的对应的key的值。

$('.tip').html($.i18n.prop('string_prop', "晴天", "钓鱼")) 可以将值传入到{0} ， {1}中



### Node做后端响应请求

由于jquery.i18n.properties.js库通过发送ajax来获取语言资源文件，所以项目中单纯前端是无法实现的，需要配合后端来响应数据。该实例中，将会使用node做后端。



### 国际化实例

**版本：**

jquery版本：3.3.1

node版本：v12.18.3

最新的jquery.i18n.properties.js库，地址：https://github.com/jquery-i18n-properties/jquery-i18n-properties 



### 项目源码地址：https://github.com/zhuyuzhu/i18n

下载代码后，执行以下操作：

（1）安装node

（2）cmd进入到项目readme.md文件所在目录中，执行npm install，下载安装项目中的依赖

（3）node server/webapp.js 启动服务器

（4）在浏览器中输入localhost:3000即可访问



### 参考文章：

[jQuery.i18n.properties 实现 Web 前端的国际化](https://cloud.tencent.com/developer/article/1644735)

[如何优雅的实现前端国际化](https://zhuanlan.zhihu.com/p/79165787)

[jQuery.i18n.properties实现js国际化](https://blog.csdn.net/chonggaoing/article/details/16119887)