### 从输入URL到页面展现数据，发生了什么？
#### 技术蛋老师版
1. 我们在游览器输入的URL还不能找到服务器的地址（服务器IP地址），URL是为了方便我们更快记住服务器地址，是服务器IP地址的别名
2. 我们需要进行DNS解析：把URL地址 解析为 服务器IP地址 这一个过程就是DNS解析，
3. 虽然我们知道具体IP地址，但是在正式发送数据之前，还是得建立TCP连接，在发送数据之前建立数据通道，于是就有了三次握手
4. 建立连接后，游览器是会发送HTTP请求报文给服务器，发送请求报文
5. 服务器收到HTTP请求报文，服务器处理请求报文，并作出响应，生成响应报文
6. 游览器在接收服务器的响应以后，就会进行页面渲染，即：解析接收到的HTML，CSS,JavaScript等文件，生成页面内容


#### 知识点
1. DNS：其实就是一个数据库，这个数据库记录着很多IP地址和对应的URL，这样大家就能通过DNS查找到对应的IP地址，有了IP地址，我们就可以在互联网中找到指定的服务器
2. 请求报文的格式：请求行， 请求头部， 空行， 请求数据，
   1. 请求行：请求方法，请求地址，HTTP协议
   2. 请求头部：关于游览器的信息，键值对组成
   3. 空行：表示没有请求头部了
   4. 请求数据：真正的发送给服务器的请求数据
3. 响应报文：
   1. 状态行：三位数字，例如：404 Not Found
   2. 响应头部：键值对组成，一行一对，
   3. 空行：表示下面没有响应头部
   4. 响应数据：响应游览器的数据

#### 参考
技术蛋视频：https://www.bilibili.com/video/BV1s44y117vK/?spm_id_from=333.788&vd_source=ce628a5bd43df277d141676215ef5ff3
掘金文章：https://juejin.cn/post/6905931622374342670