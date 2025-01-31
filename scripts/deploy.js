const { ethers,run,network } = require("hardhat")

async function main(){
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()

  // Not functionable in version 6^ ethers ----->
  
  await simpleStorage.waitForDeployment()
  console.log(`Deployed contract to: ${simpleStorage.target}`)
  // console.log(network.config);
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")

    // Not functionable in version 6^ ethers ----->
    
    await simpleStorage.deploymentTransaction().wait(6)
    await verify(simpleStorage.target, [])

    //______________________________________________

    
  }

  const currentValue = await simpleStorage.favouriteNumber()
  console.log(`Current Value is: ${currentValue}`)

  // Update the current value
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.favouriteNumber()
  console.log(`Updated Value is: ${updatedValue}`)
}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })