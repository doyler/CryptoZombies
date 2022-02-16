const main = async () => {
  const zombieFactoryContractFactory = await hre.ethers.getContractFactory('ZombieFactory');
  const zombieFactoryContract = await zombieFactoryContractFactory.deploy({
    // Contract is not payable yet
    //value: hre.ethers.utils.parseEther("0.1"),
  });
  await zombieFactoryContract.deployed();
  console.log("Contract address:", zombieFactoryContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    zombieFactoryContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // Call the function.
  let txn = await zombieFactoryContract.createRandomZombie("Zombie #1");
  // Wait for it to be mined.
  await txn.wait();
  console.log("Minted NFT #1");
  
  txn = await zombieFactoryContract.createRandomZombie("Zombie #2");
  // Wait for it to be mined.
  await txn.wait();
  console.log("Minted NFT #2");

  contractBalance = await hre.ethers.provider.getBalance(zombieFactoryContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();