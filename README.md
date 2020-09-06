## web3js api
### 基础API命令
```
// 记录了web3容器对象的版本
web3.version

// 返回当前在用的通信服务提供器，如果没有的话则返回null。
web3.currentProvider
```

### 基于eth的命令
```
// 记录了默认地址
web3.eth.defaultAccount

// 返回当前节点控制的账户列表
web3.eth.getAccounts()

// 获取指定块中特定账户地址的余额
web3.eth.getBalance()
```

### 单位转换
```
// 将给定的以太金额转换为以wei为单位的数值
web3.utils.toWei()

// 将给定的以wei为单位的值转换为其他单位的数值
web3.utils.fromWei()

```