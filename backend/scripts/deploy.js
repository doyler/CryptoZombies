const main = async () => {
  const zombieFactoryContractFactory = await hre.ethers.getContractFactory('ZombieFactory');
  const zombieFactoryContract = await zombieFactoryContractFactory.deploy();
  await zombieFactoryContract.deployed();
  console.log("Contract deployed to:", zombieFactoryContract.address);

  // Call the function.
  let txn = await zombieFactoryContract.createRandomZombie("Zombie #1");
  // Wait for it to be mined.
  await txn.wait();
  console.log("Minted NFT #1");

  txn = await zombieFactoryContract.createRandomZombie("Zombie #2");
  // Wait for it to be mined.
  await txn.wait();
  console.log("Minted NFT #2");
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