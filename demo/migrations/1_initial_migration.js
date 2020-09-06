// 获得部署的合约名称（而非文件名）
const Migrations = artifacts.require("Migrations");
// 智能合约的导出操作
module.exports = function(deployer) {
    deployer.deploy(Migrations);
};