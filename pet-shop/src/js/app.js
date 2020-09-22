App = {
    web3Provider: null,
    contracts: {},

    init: async function() {
        // Load pets.
        $.getJSON('../pets.json', function(data) {
            var petsRow = $('#petsRow');
            var petTemplate = $('#petTemplate');

            for (i = 0; i < data.length; i++) {
                petTemplate.find('.panel-title').text(data[i].name);
                petTemplate.find('img').attr('src', data[i].picture);
                petTemplate.find('.pet-breed').text(data[i].breed);
                petTemplate.find('.pet-age').text(data[i].age);
                petTemplate.find('.pet-location').text(data[i].location);
                petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

                petsRow.append(petTemplate.html());
            }
        });

        return await App.initWeb3();
    },

    initWeb3: async function() {
        // 检查新版MetaMask
        if (window.ethereum) {
            console.log('if......');
            App.web3Provider = window.ethereum;
            try {
                // 请求用户账号授权
                await window.ethereum.enable();
            } catch (error) {
                // 用户拒绝了访问
                console.error("User denied account access")
            }
        }
        // 老版 MetaMask
        else if (window.web3) {
            console.log('else if......');
            App.web3Provider = window.web3.currentProvider;
        }
        // 如果没有注入的web3实例，回退到使用 Ganache
        else {
            console.log('else......');
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function() {

        $.getJSON('Adoption.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            var AdoptionArtifact = data;
            App.contracts.Adoption = TruffleContract(AdoptionArtifact);

            // Set the provider for our contract.
            App.contracts.Adoption.setProvider(App.web3Provider);
            // Use our contract to retieve and mark the adopted pets.
            return App.markAdopted();
        });
        console.log('initContract.....');
        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '.btn-adopt', App.handleAdopt);
    },
    // 标记宠物的领养状态
    markAdopted: function(adopters, account) {
        console.log('markAdopted...');
        var adoptionInstance;
        // 根据宠物状态来修改按钮
        App.contracts.Adoption.deployed().then(function(instance) {
            adoptionInstance = instance;
            // 返回 address[16] public adopters
            return adoptionInstance.getAdopters();
        }).then(function(adopters) {
            console.log('adopters --->', adopters.length);
            for (i = 0; i < adopters.length; i++) {
                if (adopters[i] != '0x0000000000000000000000000000000000000000') {
                    console.log('宠物的领养地址：', adopters[i]);
                    $(".panel-pet").eq(i).find('button').text('success').attr('disabled', true);
                }
            }
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    handleAdopt: function(event) {
        event.preventDefault();

        var petId = parseInt($(event.target).data('id'));
        console.log('宠物的ID为：', petId);
        // 合约实例化
        var adoptionInstance;
        // 由于当前采用的是 truffle 4.x + web3 0.x的版本，因此选择合适的API查看
        App.contracts.Adoption.deployed().then(function(instance) {
            adoptionInstance = instance;
            return adoptionInstance.adopt(petId);
        }).then(function(result) {
            console.log('result --->', result);
            return App.markAdopted();
        }).catch(function(err) {
            console.log(err.message);
        });
    }
};

$(function() {
    $(window).load(function() {
        App.init();
    });
});