"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidator__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_factoryV2",
                type: "address",
            },
            {
                internalType: "address",
                name: "_positionManager",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "tokens",
                type: "address[]",
            },
            {
                internalType: "address[]",
                name: "baseTokens",
                type: "address[]",
            },
            {
                internalType: "uint256",
                name: "amountToBorrow",
                type: "uint256",
            },
        ],
        name: "batchValidate",
        outputs: [
            {
                internalType: "enum ITokenValidator.Status[]",
                name: "isFotResults",
                type: "uint8[]",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "factoryV2",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "positionManager",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount0",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "uniswapV2Call",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "address[]",
                name: "baseTokens",
                type: "address[]",
            },
            {
                internalType: "uint256",
                name: "amountToBorrow",
                type: "uint256",
            },
        ],
        name: "validate",
        outputs: [
            {
                internalType: "enum ITokenValidator.Status",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60c060405234801561001057600080fd5b506040516110e03803806110e083398101604081905261002f91610069565b6001600160601b0319606092831b8116608052911b1660a05261009b565b80516001600160a01b038116811461006457600080fd5b919050565b6000806040838503121561007b578182fd5b6100848361004d565b91506100926020840161004d565b90509250929050565b60805160601c60a05160601c61101c6100c4600039806103f65250806103d2525061101c6000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806368e0d4e11161005057806368e0d4e1146100aa578063791b98bc146100bf578063be7672e5146100c757610067565b80630143aace1461006c57806310d1e85c14610095575b600080fd5b61007f61007a366004610b75565b6100e7565b60405161008c9190610dea565b60405180910390f35b6100a86100a3366004610bcf565b61016c565b005b6100b26103d0565b60405161008c9190610d7e565b6100b26103f4565b6100da6100d5366004610c60565b610418565b60405161008c9190610d9f565b6000805b8381101561015e5760006101208787878581811061010557fe5b905060200201602081019061011a9190610b3d565b866104d6565b9050600181600281111561013057fe5b14806101475750600281600281111561014557fe5b145b156101555791506101649050565b506001016100eb565b50600090505b949350505050565b60003390506000808273ffffffffffffffffffffffffffffffffffffffff16630dfe16816040518163ffffffff1660e01b815260040160206040518083038186803b1580156101ba57600080fd5b505afa1580156101ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101f29190610b59565b8373ffffffffffffffffffffffffffffffffffffffff1663d21220a76040518163ffffffff1660e01b815260040160206040518083038186803b15801561023857600080fd5b505afa15801561024c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102709190610b59565b9150915060008088116102835781610285565b825b905060008061029687890189610ce9565b915091506000828473ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016102d69190610d7e565b60206040518083038186803b1580156102ee57600080fd5b505afa158015610302573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103269190610cd1565b03905081811461039e57604080518082018252600381527f464f540000000000000000000000000000000000000000000000000000000000602082015290517f08c379a00000000000000000000000000000000000000000000000000000000081526103959190600401610dfe565b60405180910390fd5b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161039590610e11565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b60608467ffffffffffffffff8111801561043157600080fd5b5060405190808252806020026020018201604052801561045b578160200160208202803683370190505b50905060005b858110156104cc5761049587878381811061047857fe5b905060200201602081019061048d9190610b3d565b8686866100e7565b8282815181106104a157fe5b602002602001019060028111156104b457fe5b908160028111156104c157fe5b905250600101610461565b5095945050505050565b60008273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141561051457506000610895565b600061059e3073ffffffffffffffffffffffffffffffffffffffff166368e0d4e16040518163ffffffff1660e01b815260040160206040518083038186803b15801561055f57600080fd5b505afa158015610573573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105979190610b59565b868661089c565b60408051600481526024810182526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f0dfe168100000000000000000000000000000000000000000000000000000000179052905191925060009173ffffffffffffffffffffffffffffffffffffffff84169161061d91610d62565b6000604051808303816000865af19150503d806000811461065a576040519150601f19603f3d011682016040523d82523d6000602084013e61065f565b606091505b5091505080516000141561067857600092505050610895565b60008180602001905181019061068e9190610b59565b90506000808273ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff16146106ce576000876106d2565b8660005b9150915060008973ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016107119190610d7e565b60206040518083038186803b15801561072957600080fd5b505afa15801561073d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107619190610cd1565b905060008690508073ffffffffffffffffffffffffffffffffffffffff1663022c0d9f858530868e60405160200161079a929190610e7f565b6040516020818303038152906040526040518563ffffffff1660e01b81526004016107c89493929190610e8d565b600060405180830381600087803b1580156107e257600080fd5b505af19250505080156107f3575060015b610863576107ff610f08565b8061080a5750610859565b61081381610987565b1561082957600198505050505050505050610895565b610832816109ea565b1561084857600298505050505050505050610895565b600098505050505050505050610895565b3d6000803e3d6000fd5b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161039590610e48565b9392505050565b60008060006108ab8585610a56565b604080517fffffffffffffffffffffffffffffffffffffffff000000000000000000000000606094851b811660208084019190915293851b81166034830152825160288184030181526048830184528051908501207fff0000000000000000000000000000000000000000000000000000000000000060688401529a90941b9093166069840152607d8301989098527f96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f609d808401919091528851808403909101815260bd909201909752805196019590952095945050505050565b60408051808201909152600381527f464f5400000000000000000000000000000000000000000000000000000000006020918201528151908201207f0d441c7cb74abc94cc606c98870ca9174ef5b167b2f7ffed505658cf4574b003145b919050565b60408051808201909152600f8082527f5452414e534645525f4641494c45440000000000000000000000000000000000602083015282516000929180821015610a3957600093505050506109e5565b602092830181902091819003850190920191909120149050919050565b6000808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610a9257600080fd5b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1610610acc578284610acf565b83835b909250905073ffffffffffffffffffffffffffffffffffffffff8216610af457600080fd5b9250929050565b60008083601f840112610b0c578182fd5b50813567ffffffffffffffff811115610b23578182fd5b6020830191508360208083028501011115610af457600080fd5b600060208284031215610b4e578081fd5b813561089581610fea565b600060208284031215610b6a578081fd5b815161089581610fea565b60008060008060608587031215610b8a578283fd5b8435610b9581610fea565b9350602085013567ffffffffffffffff811115610bb0578384fd5b610bbc87828801610afb565b9598909750949560400135949350505050565b600080600080600060808688031215610be6578081fd5b8535610bf181610fea565b94506020860135935060408601359250606086013567ffffffffffffffff80821115610c1b578283fd5b818801915088601f830112610c2e578283fd5b813581811115610c3c578384fd5b896020828501011115610c4d578384fd5b9699959850939650602001949392505050565b600080600080600060608688031215610c77578081fd5b853567ffffffffffffffff80821115610c8e578283fd5b610c9a89838a01610afb565b90975095506020880135915080821115610cb2578283fd5b50610cbf88828901610afb565b96999598509660400135949350505050565b600060208284031215610ce2578081fd5b5051919050565b60008060408385031215610cfb578182fd5b50508035926020909101359150565b60008151808452610d22816020860160208601610ed2565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60038110610d5e57fe5b9052565b60008251610d74818460208701610ed2565b9190910192915050565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b6020808252825182820181905260009190848201906040850190845b81811015610dde57610dce838551610d54565b9284019291840191600101610dbb565b50909695505050505050565b60208101610df88284610d54565b92915050565b6000602082526108956020830184610d0a565b60208082526007908201527f556e6b6e6f776e00000000000000000000000000000000000000000000000000604082015260600190565b60208082526010908201527f556e6578706563746564206572726f7200000000000000000000000000000000604082015260600190565b918252602082015260400190565b600085825284602083015273ffffffffffffffffffffffffffffffffffffffff8416604083015260806060830152610ec86080830184610d0a565b9695505050505050565b60005b83811015610eed578181015183820152602001610ed5565b83811115610efc576000848401525b50505050565b60e01c90565b600060443d1015610f1857610fe7565b600481823e6308c379a0610f2c8251610f02565b14610f3657610fe7565b6040517ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3d016004823e80513d67ffffffffffffffff8160248401118184111715610f845750505050610fe7565b82840192508251915080821115610f9e5750505050610fe7565b503d83016020828401011115610fb657505050610fe7565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01681016020016040529150505b90565b73ffffffffffffffffffffffffffffffffffffffff8116811461100c57600080fd5b5056fea164736f6c6343000706000a";
class TokenValidator__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_factoryV2, _positionManager, overrides) {
        return super.deploy(_factoryV2, _positionManager, overrides || {});
    }
    getDeployTransaction(_factoryV2, _positionManager, overrides) {
        return super.getDeployTransaction(_factoryV2, _positionManager, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.TokenValidator__factory = TokenValidator__factory;
TokenValidator__factory.bytecode = _bytecode;
TokenValidator__factory.abi = _abi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW5WYWxpZGF0b3JfX2ZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvdHlwZXMvb3RoZXIvZmFjdG9yaWVzL1Rva2VuVmFsaWRhdG9yX19mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQ0FBK0M7QUFDL0Msb0JBQW9CO0FBQ3BCLG9CQUFvQjs7O0FBR3BCLG1DQUE2RTtBQU03RSxNQUFNLElBQUksR0FBRztJQUNYO1FBQ0UsTUFBTSxFQUFFO1lBQ047Z0JBQ0UsWUFBWSxFQUFFLFNBQVM7Z0JBQ3ZCLElBQUksRUFBRSxZQUFZO2dCQUNsQixJQUFJLEVBQUUsU0FBUzthQUNoQjtZQUNEO2dCQUNFLFlBQVksRUFBRSxTQUFTO2dCQUN2QixJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixJQUFJLEVBQUUsU0FBUzthQUNoQjtTQUNGO1FBQ0QsZUFBZSxFQUFFLFlBQVk7UUFDN0IsSUFBSSxFQUFFLGFBQWE7S0FDcEI7SUFDRDtRQUNFLE1BQU0sRUFBRTtZQUNOO2dCQUNFLFlBQVksRUFBRSxXQUFXO2dCQUN6QixJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsV0FBVzthQUNsQjtZQUNEO2dCQUNFLFlBQVksRUFBRSxXQUFXO2dCQUN6QixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsSUFBSSxFQUFFLFdBQVc7YUFDbEI7WUFDRDtnQkFDRSxZQUFZLEVBQUUsU0FBUztnQkFDdkIsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsSUFBSSxFQUFFLFNBQVM7YUFDaEI7U0FDRjtRQUNELElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRTtZQUNQO2dCQUNFLFlBQVksRUFBRSwrQkFBK0I7Z0JBQzdDLElBQUksRUFBRSxjQUFjO2dCQUNwQixJQUFJLEVBQUUsU0FBUzthQUNoQjtTQUNGO1FBQ0QsZUFBZSxFQUFFLFlBQVk7UUFDN0IsSUFBSSxFQUFFLFVBQVU7S0FDakI7SUFDRDtR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