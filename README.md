## Truffle Api
### 编译合约
```
truffle compile
```
### 部署合约
```
truffle develop

deploy
// 重新部署
deploy --reset 
```

### 显示已部署的合约地址
```
truffle networks
```

## Web3js Api
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

// 转账
web3.eth.sendTransaction({from: '0x9b7A9Af2e363D6e598C6EF925eb3cce40f808244', to: '0xEeF80F3850eBe5c9351451d2D3330Bff89F879e4', value: web3.utils.toWei('5', 'ether')})
```

### 单位转换
```
// 将给定的以太金额转换为以wei为单位的数值
web3.utils.toWei()

// 将给定的以wei为单位的值转换为其他单位的数值
web3.utils.fromWei()

```

### 部署合约
#### 智能合约内部相互调用
```
var myContract
[合约名].deployed().then(function(instance){myContract = instance})
myContract.[调用方法]
```
#### 通过json接口调用合约方法
> 适合项目之外的合约调用，比如另外一个账户给这个合约转账，就需要用到这个合约地址
```
// 创建合约对象
var myContract = new web3.eth.Contract([合约abi的json数据], [部署的合约地址])
// 调用合约方法
myContract.methods.mulAtoB(4,4).call()
```