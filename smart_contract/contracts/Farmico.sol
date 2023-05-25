//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ProductTraceability {
    // Initializing the contract
    struct Product {
        string name;
        string origin;
        uint256 dateOfHarvest;
        address farmer;
        address[] transporters;
        string[] locationUpdates;
        address retailer;
        uint256 price;
        uint256[] dates;
    }

    mapping(address => bool) public farmers;
    mapping(address => bool) public transporters;
    mapping(address => bool) public processors;
    mapping(address => bool) public retailers;

    // Mapping to store product IDs and their corresponding Product struct
    mapping(uint256 => Product) public products;
    uint256 public totalProducts;

    event ProductCreated(string name, uint256 productId, address farmer);
    event LocationUpdated(
        uint256 productId,
        address transporter,
        string location
    );

    //Register page functions

    function registerAsFarmer() public {
        farmers[msg.sender] = true;
    }

    function registerAsTransporter() public {
        transporters[msg.sender] = true;
    }

    function registerAsRetailer() public {
        retailers[msg.sender] = true;
    }

    //modifier functions
    // modifier onlyFarmer() {
    //     require(
    //         farmers[msg.sender] == true,
    //         "Only farmers can perform this action."
    //     );
    //     _;
    // }

    // modifier onlyTransporter() {
    //     require(
    //         transporters[msg.sender] == true,
    //         "Only transporters can perform this action."
    //     );
    //     _;
    // }

    // modifier onlyRetailer() {
    //     require(
    //         retailers[msg.sender] == true,
    //         "Only retailers can perform this action."
    //     );
    //     _;
    // }

    function isFarmer(address _address) public view returns (bool) {
        return farmers[_address];
    }

    function isTransporter(address _address) public view returns (bool) {
        return transporters[_address];
    }

    function isRetailer(address _address) public view returns (bool) {
        return retailers[_address];
    }

    // Function to create a new product
    function createProduct(
        string memory name,
        string memory origin,
        uint256 dateOfHarvest
    ) public returns (uint256) {
        uint256 productId = totalProducts + 1;
        products[productId] = Product(
            name,
            origin,
            dateOfHarvest,
            msg.sender,
            new address[](0),
            new string[](0),
            address(0),
            0,
            new uint256[](0)
        );
        totalProducts++;
        products[productId].locationUpdates.push(origin);
        products[productId].dates.push(dateOfHarvest);
        emit ProductCreated(name, productId, msg.sender);
        return productId;
    }

    // Function for a transporter to update a product's location
    function updateProductLocation(
        uint256 productId,
        string memory location
    ) public {
        products[productId].transporters.push(msg.sender);
        products[productId].locationUpdates.push(location);
        products[productId].dates.push(block.timestamp);
    }

    // Function for a retailer to claim ownership of a product
    function claimProduct(uint256 productId, uint256 _price) public {
        // Make sure the product is available for claiming
        require(
            products[productId].retailer == address(0),
            "This product has already been claimed by a retailer"
        );
        products[productId].retailer = msg.sender;
        products[productId].price = _price;
    }

    // Function to get a product's information
    function getProduct(
        uint256 productId
    )
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            address,
            address[] memory,
            string[] memory,
            uint256[] memory,
            address,
            uint256
        )
    {
        Product memory product = products[productId];
        return (
            product.name,
            product.origin,
            product.dateOfHarvest,
            product.farmer,
            product.transporters,
            product.locationUpdates,
            product.dates,
            product.retailer,
            product.price
        );
    }
}
