import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import {
  ClusterDeposited as ClusterDepositedEvent,
  ClusterLiquidated as ClusterLiquidatedEvent,
  ClusterReactivated as ClusterReactivatedEvent,
  ClusterWithdrawn as ClusterWithdrawnEvent,
  DeclareOperatorFeePeriodUpdated as DeclareOperatorFeePeriodUpdatedEvent,
  ExecuteOperatorFeePeriodUpdated as ExecuteOperatorFeePeriodUpdatedEvent,
  FeeRecipientAddressUpdated as FeeRecipientAddressUpdatedEvent,
  LiquidationThresholdPeriodUpdated as LiquidationThresholdPeriodUpdatedEvent,
  MinimumLiquidationCollateralUpdated as MinimumLiquidationCollateralUpdatedEvent,
  NetworkEarningsWithdrawn as NetworkEarningsWithdrawnEvent,
  NetworkFeeUpdated as NetworkFeeUpdatedEvent,
  OperatorAdded as OperatorAddedEvent,
  OperatorFeeDeclarationCancelled as OperatorFeeDeclarationCancelledEvent,
  OperatorFeeDeclared as OperatorFeeDeclaredEvent,
  OperatorFeeExecuted as OperatorFeeExecutedEvent,
  OperatorFeeIncreaseLimitUpdated as OperatorFeeIncreaseLimitUpdatedEvent,
  OperatorMaximumFeeUpdated as OperatorMaximumFeeUpdatedEvent,
  OperatorRemoved as OperatorRemovedEvent,
  OperatorWhitelistUpdated as OperatorWhitelistUpdatedEvent,
  OperatorWithdrawn as OperatorWithdrawnEvent,
  ValidatorAdded as ValidatorAddedEvent,
  ValidatorRemoved as ValidatorRemovedEvent
} from "../generated/SSVNetwork/SSVNetwork"
import {
  Validator,
  Cluster,
  Operator,
  Account,
  ClusterDeposited,
  ClusterLiquidated,
  ClusterReactivated,
  ClusterWithdrawn,
  DeclareOperatorFeePeriodUpdated,
  ExecuteOperatorFeePeriodUpdated,
  FeeRecipientAddressUpdated,
  LiquidationThresholdPeriodUpdated,
  MinimumLiquidationCollateralUpdated,
  NetworkEarningsWithdrawn,
  NetworkFeeUpdated,
  OperatorAdded,
  OperatorFeeDeclarationCancelled,
  OperatorFeeDeclared,
  OperatorFeeExecuted,
  OperatorFeeIncreaseLimitUpdated,
  OperatorMaximumFeeUpdated,
  OperatorRemoved,
  OperatorWhitelistUpdated,
  OperatorWithdrawn,
  ValidatorAdded,
  ValidatorRemoved
} from "../generated/schema"
import { log } from "matchstick-as"

// export function handleBlock(block: ethereum.Block): void {
//   // TODO need to update clusters balance
//   log.info("Running every block!", [])
// }

// ###### DAO Events ######

export function handleDeclareOperatorFeePeriodUpdated(
  event: DeclareOperatorFeePeriodUpdatedEvent
): void {
  let entity = new DeclareOperatorFeePeriodUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExecuteOperatorFeePeriodUpdated(
  event: ExecuteOperatorFeePeriodUpdatedEvent
): void {
  let entity = new ExecuteOperatorFeePeriodUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeRecipientAddressUpdated(
  event: FeeRecipientAddressUpdatedEvent
): void {
  let entity = new FeeRecipientAddressUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.recipientAddress = event.params.recipientAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLiquidationThresholdPeriodUpdated(
  event: LiquidationThresholdPeriodUpdatedEvent
): void {
  let entity = new LiquidationThresholdPeriodUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinimumLiquidationCollateralUpdated(
  event: MinimumLiquidationCollateralUpdatedEvent
): void {
  let entity = new MinimumLiquidationCollateralUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNetworkEarningsWithdrawn(
  event: NetworkEarningsWithdrawnEvent
): void {
  let entity = new NetworkEarningsWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.value = event.params.value
  entity.recipient = event.params.recipient

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNetworkFeeUpdated(event: NetworkFeeUpdatedEvent): void {
  let entity = new NetworkFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldFee = event.params.oldFee
  entity.newFee = event.params.newFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOperatorFeeIncreaseLimitUpdated(
  event: OperatorFeeIncreaseLimitUpdatedEvent
): void {
  let entity = new OperatorFeeIncreaseLimitUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOperatorMaximumFeeUpdated(
  event: OperatorMaximumFeeUpdatedEvent
): void {
  let entity = new OperatorMaximumFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.maxFee = event.params.maxFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// ###### Cluster Events ######

export function handleClusterDeposited(event: ClusterDepositedEvent): void {
  let entity = new ClusterDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operatorIds = event.params.operatorIds
  entity.value = event.params.value
  entity.cluster_validatorCount = event.params.cluster.validatorCount
  entity.cluster_networkFeeIndex = event.params.cluster.networkFeeIndex
  entity.cluster_index = event.params.cluster.index
  entity.cluster_active = event.params.cluster.active
  entity.cluster_balance = event.params.cluster.balance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let owner = Account.load(event.params.owner)
  if (!owner){
    owner = new Account(event.params.owner)
    owner.nonce = BigInt.zero()
    owner.save()
  }

  let clusterId = `${event.params.owner.toHexString()}-${event.params.operatorIds.join("-")}`
  let cluster = Cluster.load(clusterId) 
  if (!cluster) {
    log.error(`Cluster ${clusterId} is being deposited, but it does not exist on the database`, [])
    cluster = new Cluster(clusterId)
  }

  cluster.owner = owner.id
  cluster.operatorIds = event.params.operatorIds
  cluster.validatorCount = event.params.cluster.validatorCount
  cluster.networkFeeIndex = event.params.cluster.networkFeeIndex
  cluster.index = event.params.cluster.index
  cluster.active = event.params.cluster.active
  cluster.balance = event.params.cluster.balance
  cluster.lastUpdateBlockNumber = event.block.number
  cluster.lastUpdateBlockTimestamp = event.block.timestamp
  cluster.lastUpdateTransactionHash = event.transaction.hash
  cluster.save()
}

export function handleClusterLiquidated(event: ClusterLiquidatedEvent): void {
  let entity = new ClusterLiquidated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operatorIds = event.params.operatorIds
  entity.cluster_validatorCount = event.params.cluster.validatorCount
  entity.cluster_networkFeeIndex = event.params.cluster.networkFeeIndex
  entity.cluster_index = event.params.cluster.index
  entity.cluster_active = event.params.cluster.active
  entity.cluster_balance = event.params.cluster.balance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let owner = Account.load(event.params.owner)
  if (!owner){
    owner = new Account(event.params.owner)
    owner.nonce = BigInt.zero()
    owner.save()
  }

  let clusterId = `${event.params.owner.toHexString()}-${event.params.operatorIds.join("-")}`
  let cluster = Cluster.load(clusterId) 
  if (!cluster) {
    log.error(`Cluster ${clusterId} is being liquidated, but it does not exist on the database`, [])
    cluster = new Cluster(clusterId)
  }

  cluster.owner = owner.id
  cluster.operatorIds = event.params.operatorIds
  cluster.validatorCount = event.params.cluster.validatorCount
  cluster.networkFeeIndex = event.params.cluster.networkFeeIndex
  cluster.index = event.params.cluster.index
  cluster.active = event.params.cluster.active
  cluster.balance = event.params.cluster.balance
  cluster.lastUpdateBlockNumber = event.block.number
  cluster.lastUpdateBlockTimestamp = event.block.timestamp
  cluster.lastUpdateTransactionHash = event.transaction.hash
  cluster.save()
}

export function handleClusterReactivated(event: ClusterReactivatedEvent): void {
  let entity = new ClusterReactivated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operatorIds = event.params.operatorIds
  entity.cluster_validatorCount = event.params.cluster.validatorCount
  entity.cluster_networkFeeIndex = event.params.cluster.networkFeeIndex
  entity.cluster_index = event.params.cluster.index
  entity.cluster_active = event.params.cluster.active
  entity.cluster_balance = event.params.cluster.balance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let owner = Account.load(event.params.owner)
  if (!owner){
    owner = new Account(event.params.owner)
    owner.nonce = BigInt.zero()
    owner.save()
  }

  let clusterId = `${event.params.owner.toHexString()}-${event.params.operatorIds.join("-")}`
  let cluster = Cluster.load(clusterId) 
  if (!cluster) {
    log.error(`Cluster ${clusterId} is being reactivated, but it does not exist on the database`, [])
    cluster = new Cluster(clusterId)
  }

  cluster.owner = owner.id
  cluster.operatorIds = event.params.operatorIds
  cluster.validatorCount = event.params.cluster.validatorCount
  cluster.networkFeeIndex = event.params.cluster.networkFeeIndex
  cluster.index = event.params.cluster.index
  cluster.active = event.params.cluster.active
  cluster.balance = event.params.cluster.balance
  cluster.lastUpdateBlockNumber = event.block.number
  cluster.lastUpdateBlockTimestamp = event.block.timestamp
  cluster.lastUpdateTransactionHash = event.transaction.hash
  cluster.save()
}

export function handleClusterWithdrawn(event: ClusterWithdrawnEvent): void {
  let entity = new ClusterWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operatorIds = event.params.operatorIds
  entity.value = event.params.value
  entity.cluster_validatorCount = event.params.cluster.validatorCount
  entity.cluster_networkFeeIndex = event.params.cluster.networkFeeIndex
  entity.cluster_index = event.params.cluster.index
  entity.cluster_active = event.params.cluster.active
  entity.cluster_balance = event.params.cluster.balance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let owner = Account.load(event.params.owner)
  if (!owner){
    owner = new Account(event.params.owner)
    owner.nonce = BigInt.zero()
    owner.save()
  }

  let clusterId = `${event.params.owner.toHexString()}-${event.params.operatorIds.join("-")}`
  let cluster = Cluster.load(clusterId) 
  if (!cluster) {
    log.error(`Cluster ${clusterId} is being withdrawn, but it does not exist on the database`, [])
    cluster = new Cluster(clusterId)
    cluster.owner = owner.id
    cluster.operatorIds = event.params.operatorIds
    cluster.validatorCount = event.params.cluster.validatorCount
  }
  cluster.networkFeeIndex = event.params.cluster.networkFeeIndex
  cluster.index = event.params.cluster.index
  cluster.active = event.params.cluster.active
  cluster.balance = event.params.cluster.balance
  cluster.lastUpdateBlockNumber = event.block.number
  cluster.lastUpdateBlockTimestamp = event.block.timestamp
  cluster.lastUpdateTransactionHash = event.transaction.hash
  cluster.save()
}

export function handleValidatorAdded(event: ValidatorAddedEvent): void {
  let entity = new ValidatorAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operatorIds = event.params.operatorIds
  entity.publicKey = event.params.publicKey
  entity.shares = event.params.shares
  entity.cluster_validatorCount = event.params.cluster.validatorCount
  entity.cluster_networkFeeIndex = event.params.cluster.networkFeeIndex
  entity.cluster_index = event.params.cluster.index
  entity.cluster_active = event.params.cluster.active
  entity.cluster_balance = event.params.cluster.balance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let owner = Account.load(event.params.owner)
  if (!owner){
    owner = new Account(event.params.owner)
    owner.nonce = BigInt.zero()
    owner.save()
  }
  owner.nonce = owner.nonce.plus(new BigInt(1))
  owner.save()

  let clusterId = `${event.params.owner.toHexString()}-${event.params.operatorIds.join("-")}`
  let cluster = Cluster.load(clusterId) 
  if (!cluster) {
    log.info(`Validator ${event.params.publicKey.toHexString()} is being added to new Cluster ${clusterId}`, [])
    cluster = new Cluster(clusterId)
    cluster.validatorCount = BigInt.zero() // setting to zero, so we ALWAYS add 1, both for new, and existing clusters
  }

  cluster.owner = owner.id
  cluster.operatorIds = event.params.operatorIds
  cluster.validatorCount = cluster.validatorCount.plus(new BigInt(1))
  cluster.networkFeeIndex = event.params.cluster.networkFeeIndex
  cluster.index = event.params.cluster.index
  cluster.active = event.params.cluster.active
  cluster.balance = event.params.cluster.balance
  cluster.lastUpdateBlockNumber = event.block.number
  cluster.lastUpdateBlockTimestamp = event.block.timestamp
  cluster.lastUpdateTransactionHash = event.transaction.hash
  cluster.save()

  let validatorId = event.params.publicKey
  let validator = Validator.load(validatorId) 
  if (!validator) {
    log.info(`new Validator ${event.params.publicKey.toHexString()} being added to Cluster ${clusterId}`, [])
    validator = new Validator(validatorId)
  }

  validator.owner = owner.id // this does not sound right 🧐
  validator.operators = event.params.operatorIds.map<Bytes>((id: BigInt) => Bytes.fromByteArray(Bytes.fromBigInt(id))) // this does not sound right 🧐
  validator.cluster = cluster.id // this does not sound right 🧐
  validator.active = event.params.cluster.active
  validator.shares = event.params.shares
  validator.lastUpdateBlockNumber = event.block.number
  validator.lastUpdateBlockTimestamp = event.block.timestamp
  validator.lastUpdateTransactionHash = event.transaction.hash
  validator.save()
}

export function handleValidatorRemoved(event: ValidatorRemovedEvent): void {
  let entity = new ValidatorRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operatorIds = event.params.operatorIds
  entity.publicKey = event.params.publicKey
  entity.cluster_validatorCount = event.params.cluster.validatorCount
  entity.cluster_networkFeeIndex = event.params.cluster.networkFeeIndex
  entity.cluster_index = event.params.cluster.index
  entity.cluster_active = event.params.cluster.active
  entity.cluster_balance = event.params.cluster.balance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let owner = Account.load(event.params.owner)
  if (!owner){
    owner = new Account(event.params.owner)
    owner.nonce = BigInt.zero()
    owner.save()
  }

  let clusterId = `${event.params.owner.toHexString()}-${event.params.operatorIds.join("-")}`
  let cluster = Cluster.load(clusterId) 
  if (!cluster) {
    log.error(`Validator ${event.params.publicKey.toHexString()} is being removed from Cluster ${clusterId} which does not exist on DB`, [])
    cluster = new Cluster(clusterId)
  }


  cluster.owner = owner.id
  cluster.operatorIds = event.params.operatorIds
  cluster.validatorCount = event.params.cluster.validatorCount
  cluster.networkFeeIndex = event.params.cluster.networkFeeIndex
  cluster.index = event.params.cluster.index
  cluster.active = event.params.cluster.active
  cluster.balance = event.params.cluster.balance
  cluster.lastUpdateBlockNumber = event.block.number
  cluster.lastUpdateBlockTimestamp = event.block.timestamp
  cluster.lastUpdateTransactionHash = event.transaction.hash
  cluster.save()

  let validatorId = event.params.publicKey
  let validator = Validator.load(validatorId) 
  if (!validator) {
    log.info(`new Validator ${event.params.publicKey.toHexString()} being added to Cluster ${clusterId}`, [])
    log.error(`Could not create ${event.params.publicKey.toHexString()} on the database, because of missing shares information`, [])
  }
  else {
    validator.operators = event.params.operatorIds.map<Bytes>((id: BigInt) => Bytes.fromByteArray(Bytes.fromBigInt(id))) // this does not sound right 🧐
    validator.owner = owner.id // this does not sound right 🧐
    validator.active = false
    validator.lastUpdateBlockNumber = event.block.number
    validator.lastUpdateBlockTimestamp = event.block.timestamp
    validator.lastUpdateTransactionHash = event.transaction.hash
    validator.save()
  }
}

// ###### Operator Events ######

export function handleOperatorAdded(event: OperatorAddedEvent): void {
  let entity = new OperatorAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operatorId = event.params.operatorId
  entity.owner = event.params.owner
  entity.publicKey = event.params.publicKey
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let owner = Account.load(event.params.owner)
  if (!owner){
    owner = new Account(event.params.owner)
    owner.nonce = BigInt.zero()
    owner.save()
  }

  let operatorId = Bytes.fromByteArray(Bytes.fromBigInt(event.params.operatorId))
  let operator = Operator.load(operatorId) 
  if (!operator) {
    operator = new Operator(operatorId)
    operator.operatorId = event.params.operatorId
    operator.owner = owner.id
    operator.publicKey = event.params.publicKey
    operator.active = true // TODO this is wrong at the moment, need a MANY-TO-MANY with validators. When operator.validators > 1, then this is true
    operator.fee = event.params.fee
    operator.whitelisted = []
    operator.totalWithdrawn = BigInt.zero()
  }
  
  operator.lastUpdateBlockNumber = event.block.number
  operator.lastUpdateBlockTimestamp = event.block.timestamp
  operator.lastUpdateTransactionHash = event.transaction.hash
  operator.save()
}

export function handleOperatorFeeDeclarationCancelled(
  event: OperatorFeeDeclarationCancelledEvent
): void {
  let entity = new OperatorFeeDeclarationCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operatorId = event.params.operatorId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let owner = Account.load(event.params.owner)
  if (!owner){
    log.error(`Cancelling fee declaration for Operator ${event.params.operatorId}, but Owner ${event.params.owner.toHexString()} did not exist on the database`, [])
    owner = new Account(event.params.owner)
    owner.nonce = BigInt.zero()
    owner.save()
  }

  let operatorId = Bytes.fromByteArray(Bytes.fromBigInt(event.params.operatorId))
  let operator = Operator.load(operatorId) 
  if (!operator) {
    log.error(`Cancelling fee declaration for Operator ${event.params.operatorId}, but it does not exist on the database`, [])
    log.error(`Could not create ${operatorId} on the database, because of missing publicKey and fee information`, [])
  }
  else {
    operator.operatorId = event.params.operatorId
    operator.owner = owner.id
    operator.active = true // TODO this is wrong at the moment, need a MANY-TO-MANY with validators. When operator.validators > 1, then this is true
    operator.lastUpdateBlockNumber = event.block.number
    operator.lastUpdateBlockTimestamp = event.block.timestamp
    operator.lastUpdateTransactionHash = event.transaction.hash
    operator.save()
  }

}

export function handleOperatorFeeDeclared(
  event: OperatorFeeDeclaredEvent
): void {
  let entity = new OperatorFeeDeclared(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operatorId = event.params.operatorId
  entity.blockNumber = event.params.blockNumber
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let owner = Account.load(event.params.owner)
  if (!owner){
    log.error(`Declaring fees for Operator ${event.params.operatorId}, but Owner ${event.params.owner.toHexString()} did not exist on the database`, [])
    owner = new Account(event.params.owner)
    owner.nonce = BigInt.zero()
    owner.save()
  }

  let operatorId = new Bytes(event.params.operatorId.toI32())
  let operator = Operator.load(operatorId) 
  if (!operator) {
    log.error(`Declaring fees for Operator ${event.params.operatorId}, but it does not exist on the database`, [])
    log.error(`Could not create ${operatorId} on the database, because of missing publicKey and fee information`, [])
  }
  else {
    operator.operatorId = event.params.operatorId
    operator.owner = owner.id
    operator.fee = event.params.fee // TODO is this going to be wrong when the declaration is cancelled via OperatorFeeDeclarationCancelledEvent?
    operator.active = true // TODO this is wrong at the moment, need a MANY-TO-MANY with validators. When operator.validators > 1, then this is true
    operator.lastUpdateBlockNumber = event.block.number
    operator.lastUpdateBlockTimestamp = event.block.timestamp
    operator.lastUpdateTransactionHash = event.transaction.hash
    operator.save()
  }
}

export function handleOperatorFeeExecuted(
  event: OperatorFeeExecutedEvent
): void {
  let entity = new OperatorFeeExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operatorId = event.params.operatorId
  entity.blockNumber = event.params.blockNumber
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let owner = Account.load(event.params.owner)
  if (!owner){
    log.error(`Executing fees change for Operator ${event.params.operatorId}, but Owner ${event.params.owner.toHexString()} did not exist on the database`, [])
    owner = new Account(event.params.owner)
    owner.nonce = BigInt.zero()
    owner.save()
  }

  let operatorId = new Bytes(event.params.operatorId.toI32())
  let operator = Operator.load(operatorId) 
  if (!operator) {
    log.error(`Executing fees change for Operator ${event.params.operatorId}, but it does not exist on the database`, [])
    log.error(`Could not create ${operatorId} on the database, because of missing publicKey information`, [])
  }
  else {
    operator.operatorId = event.params.operatorId
    operator.owner = owner.id
    operator.active = true // TODO this is wrong at the moment, need a MANY-TO-MANY with validators. When operator.validators > 1, then this is true
    operator.fee = event.params.fee
    operator.lastUpdateBlockNumber = event.block.number
    operator.lastUpdateBlockTimestamp = event.block.timestamp
    operator.lastUpdateTransactionHash = event.transaction.hash
    operator.save()
  }
}

export function handleOperatorRemoved(event: OperatorRemovedEvent): void {
  let entity = new OperatorRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operatorId = event.params.operatorId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let operatorId = Bytes.fromByteArray(Bytes.fromBigInt(event.params.operatorId))
  let operator = Operator.load(operatorId) 
  if (!operator) {
    log.error(`Operator ${operatorId} is being removed, but it does not exist on the database`, [])
    log.error(`Could not create ${operatorId} on the database, because of missing owner information`, [])
  }
  else {
    operator.operatorId = event.params.operatorId
    operator.active = true
    operator.lastUpdateBlockNumber = event.block.number
    operator.lastUpdateBlockTimestamp = event.block.timestamp
    operator.lastUpdateTransactionHash = event.transaction.hash
    operator.save()
  }
}

export function handleOperatorWhitelistUpdated(
  event: OperatorWhitelistUpdatedEvent
): void {
  let entity = new OperatorWhitelistUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operatorId = event.params.operatorId
  entity.whitelisted = event.params.whitelisted

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let whitelisted = Account.load(event.params.whitelisted)
  if (!whitelisted){
    log.info(`Adding new whitelisted address ${event.params.whitelisted.toHexString()} to Operator ${event.params.operatorId}, this is a new Account`, [])
    whitelisted = new Account(event.params.whitelisted)
    whitelisted.nonce = BigInt.zero()
    whitelisted.save()
  }

  let operatorId = Bytes.fromByteArray(Bytes.fromBigInt(event.params.operatorId))
  let operator = Operator.load(operatorId) 
  if (!operator) {
    log.error(`Executing fees change for Operator ${event.params.operatorId}, but it does not exist on the database`, [])
    log.error(`Could not create ${operatorId} on the database, because of missing owner, publicKey and fee information`, [])
  }
  else {
    if (!operator.whitelisted) {
      operator.whitelisted = []
    }
    operator.operatorId = event.params.operatorId
    operator.whitelisted.push( whitelisted.id)
    operator.active = true // TODO this is wrong at the moment, need a MANY-TO-MANY with validators. When operator.validators > 1, then this is true
    operator.lastUpdateBlockNumber = event.block.number
    operator.lastUpdateBlockTimestamp = event.block.timestamp
    operator.lastUpdateTransactionHash = event.transaction.hash
    operator.save()
  }
}

export function handleOperatorWithdrawn(event: OperatorWithdrawnEvent): void {
  let entity = new OperatorWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operatorId = event.params.operatorId
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let owner = Account.load(event.params.owner)
  if (!owner){
    log.error(`Executing fees change for Operator ${event.params.operatorId}, but Owner ${event.params.owner.toHexString()} did not exist on the database`, [])
    owner = new Account(event.params.owner)
    owner.nonce = BigInt.zero()
    owner.save()
  }

  let operatorId = Bytes.fromByteArray(Bytes.fromBigInt(event.params.operatorId))
  let operator = Operator.load(operatorId) 
  if (!operator) {
    log.error(`Executing fees change for Operator ${event.params.operatorId}, but it does not exist on the database`, [])
    log.error(`Could not create ${operatorId} on the database, because of missing publicKey and fee information`, [])
  }
  else {
    operator.operatorId = event.params.operatorId
    operator.totalWithdrawn.minus(event.params.value)
    operator.active = true // TODO this is wrong at the moment, need a MANY-TO-MANY with validators. When operator.validators > 1, then this is true
    operator.lastUpdateBlockNumber = event.block.number
    operator.lastUpdateBlockTimestamp = event.block.timestamp
    operator.lastUpdateTransactionHash = event.transaction.hash
    operator.save()
  }
}
