### TCP的三次握手和四次挥手
#### 网络体系OSI模型
1. 物理层
2. 数据链路层
3. 网络层
4. 传输层 ：承上启下，建立端到端的链接，例如：客户端到服务端
5. 会话层
6. 表示层
7. 应用层 
#### 握手之前
客户端和服务端都有自己唯一的IP地址，可通过IP地址取得联系。但是客户端和服务端都有自己的应用进程，而且都可能进行TCP连接。
例如：我在电脑同时用谷歌和火狐登录b站，很明显，B站需要把内容发给两个不同的应用进程，那么我们就需要另外的参数来 保证内容
不会错发给应用进程，是的，就是**端口号**了。我们访问B站，游览器会自动帮我们添加端口号443（https协议），电脑会给谷歌和
火狐添加不同的端口号，这样，客户端和服务器的连接就会像管道一样，互不影响
###### 名词
套接字（socket): IP地址+端口号

> 套接字（socket)就是握手之前的核心条件

#### 三次握手
1. 客户端发送TCP报文，先打开SYN,表示客户端想和服务端进行数据同步，在同步以后，也就是三次握手以后，客户端就可以和服务端
进行通信，可以互相发送信息，TCP是全双工的，可互发信息，
2. 仅仅开启SYN是不够的，报文中还有一个重要字段，**Sequence序号**。添加这个序号，是因为：应用程序可能会发送多个序号给服务器，
这样的话，服务器就可以有依据判断那些是累赘信息，而且这个Sequence序号随机生成，作为初始值进行后续判断依据，这样就保证了通道的
唯一性，也保证了后续的通信
3. 服务器收到SYN后，服务器会把SYN和ACK开启，并向客户端发送TCP报文
###### 问题？
- 怎么样的握手才能判断出那些请求或者响应需要丢弃？
通过序号，
- 如果每一次，客户端发送的SYN序号，服务器都要记住，并生成自己的序号，那么服务器就需要非常多的资源，如果黑客不断发送SYN,又不进行下一步（DDoS），那么服务器就会崩溃,怎么办？
服务器不保存自己的序号，而是根据服务器的IP地址和端口号等私有信息进行算法运算得到序号
##### 注意
这里的确认号，都是由序号+1得到，而且就控制位来说也是具有唯一性，第一次是SYN,第二次是SYN+ACK，第三次是ACK，这样两边不仅可以根据序号
和确认号，还可以根据控制位来区分进行到哪一步，丢弃一些不需要的报文

**这是握手机制的核心**,

> TCP报文中有SYN , ACK, 和 FIN等标识，如果设置1；开启标识，设置0；关闭标识， 
> SYN：全拼为：Synchronization；同步的意思
> ACK：全拼为：Acknowledgement；确认的意思
> FIN: 全拼为：Finish；完成的意思

#### 握手后
握手之后就建立了连接，这个时候客户端就可以发送HTTP请求，服务器响应内容，

#### 四次挥手
假设现在内容交流完毕，各自可能会发送关闭连接的请求，这个过程就是**四次挥手**，
发送HTTP请求的时候，序号和确认号不断递增，
1. 假设客户端主动发送结束请求，发送FIN+ACK
2. 服务端先发送一个ACK确认，此时客户端并未正式关闭通道，因为服务端可能还有需要发送的数据，等服务端发送完数据后，会再发一个FIN+ACK来进行最后的确认，注意，这时候序号和确认号不需要改变，因为没有一来一回，只是多了一个控制位来确认结束
3. 客户端发送ACK确认
四次挥手的原因也就找到了，因为可能存在未发送完的数据

##### 注意
- 客户端和服务端都能主动发起关闭请求



#### 本文出处为技术蛋老师的视频，原地址：https://www.bilibili.com/video/BV18h41187Ep?spm_id_from=333.880.my_history.page.click&vd_source=ce628a5bd43df277d141676215ef5ff3


