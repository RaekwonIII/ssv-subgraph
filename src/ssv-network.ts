import {
  Address,
  BigInt,
  ByteArray,
  Bytes,
  crypto,
} from "@graphprotocol/graph-ts";

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
  OperatorWhitelistingContractUpdated as OperatorWhitelistingContractUpdatedEvent,
  OperatorMultipleWhitelistRemoved as OperatorMultipleWhitelistRemovedEvent,
  OperatorMultipleWhitelistUpdated as OperatorMultipleWhitelistUpdatedEvent,
  OperatorPrivacyStatusUpdated as OperatorPrivacyStatusUpdatedEvent,
  OperatorWithdrawn as OperatorWithdrawnEvent,
  ValidatorAdded as ValidatorAddedEvent,
  ValidatorRemoved as ValidatorRemovedEvent,
} from "../generated/SSVNetwork/SSVNetwork";
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
  OperatorMultipleWhitelistUpdated,
  OperatorMultipleWhitelistRemoved,
  OperatorWhitelistingContractUpdated,
  OperatorPrivacyStatusUpdated,
  OperatorWithdrawn,
  ValidatorAdded,
  ValidatorRemoved,
  DAOValues,
} from "../generated/schema";
import { log } from "matchstick-as";
import web3 from "web3";

const daoID = "DAOValues";

const SIGNATURE_LENGHT = 192;
const PUBLIC_KEY_LENGHT = 96;

// ###### DAO Events ######

export function handleDeclareOperatorFeePeriodUpdated(
  event: DeclareOperatorFeePeriodUpdatedEvent
): void {
  let entity = new DeclareOperatorFeePeriodUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let dao = DAOValues.load(event.address);
  if (!dao) {
    log.error(
      `New DAO Event, DAO values store with ID ${daoID} does not exist on the database, creating it`,
      []
    );
    dao = new DAOValues(event.address);
    dao.networkFee = BigInt.zero();
    dao.liquidationThreshold = BigInt.zero();
    dao.minimumLiquidationCollateral = BigInt.zero();
    dao.operatorFeeIncreaseLimit = BigInt.zero();
    dao.declareOperatorFeePeriod = BigInt.zero();
    dao.executeOperatorFeePeriod = BigInt.zero();
    dao.operatorMaximumFee = BigInt.zero();
  }
  dao.updateType = "DECLARE_OPERATOR_FEE_PERIOD";
  dao.declareOperatorFeePeriod = event.params.value;
  dao.lastUpdateBlockNumber = event.block.number;
  dao.lastUpdateBlockTimestamp = event.block.timestamp;
  dao.lastUpdateTransactionHash = event.transaction.hash;
  dao.save();
}

export function handleExecuteOperatorFeePeriodUpdated(
  event: ExecuteOperatorFeePeriodUpdatedEvent
): void {
  let entity = new ExecuteOperatorFeePeriodUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let dao = DAOValues.load(event.address);
  if (!dao) {
    log.error(
      `New DAO Event, DAO values store with ID ${daoID} does not exist on the database, creating it`,
      []
    );
    dao = new DAOValues(event.address);
    dao.networkFee = BigInt.zero();
    dao.liquidationThreshold = BigInt.zero();
    dao.minimumLiquidationCollateral = BigInt.zero();
    dao.operatorFeeIncreaseLimit = BigInt.zero();
    dao.declareOperatorFeePeriod = BigInt.zero();
    dao.executeOperatorFeePeriod = BigInt.zero();
    dao.operatorMaximumFee = BigInt.zero();
  }
  dao.updateType = "EXECUTE_OPERATOR_FEE_PERIOD";
  dao.executeOperatorFeePeriod = event.params.value;
  dao.lastUpdateBlockNumber = event.block.number;
  dao.lastUpdateBlockTimestamp = event.block.timestamp;
  dao.lastUpdateTransactionHash = event.transaction.hash;
  dao.save();
}

export function handleFeeRecipientAddressUpdated(
  event: FeeRecipientAddressUpdatedEvent
): void {
  let entity = new FeeRecipientAddressUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.recipientAddress = event.params.recipientAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleLiquidationThresholdPeriodUpdated(
  event: LiquidationThresholdPeriodUpdatedEvent
): void {
  let entity = new LiquidationThresholdPeriodUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let dao = DAOValues.load(event.address);
  if (!dao) {
    log.error(
      `New DAO Event, DAO values store with ID ${daoID} does not exist on the database, creating it`,
      []
    );
    dao = new DAOValues(event.address);
    dao.networkFee = BigInt.zero();
    dao.liquidationThreshold = BigInt.zero();
    dao.minimumLiquidationCollateral = BigInt.zero();
    dao.operatorFeeIncreaseLimit = BigInt.zero();
    dao.declareOperatorFeePeriod = BigInt.zero();
    dao.executeOperatorFeePeriod = BigInt.zero();
    dao.operatorMaximumFee = BigInt.zero();
  }
  dao.updateType = "LIQUIDATION_THRESHOLD";
  dao.liquidationThreshold = event.params.value;
  dao.lastUpdateBlockNumber = event.block.number;
  dao.lastUpdateBlockTimestamp = event.block.timestamp;
  dao.lastUpdateTransactionHash = event.transaction.hash;
  dao.save();
}

export function handleMinimumLiquidationCollateralUpdated(
  event: MinimumLiquidationCollateralUpdatedEvent
): void {
  let entity = new MinimumLiquidationCollateralUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let dao = DAOValues.load(event.address);
  if (!dao) {
    log.error(
      `New DAO Event, DAO values store with ID ${daoID} does not exist on the database, creating it`,
      []
    );
    dao = new DAOValues(event.address);
    dao.networkFee = BigInt.zero();
    dao.liquidationThreshold = BigInt.zero();
    dao.minimumLiquidationCollateral = BigInt.zero();
    dao.operatorFeeIncreaseLimit = BigInt.zero();
    dao.declareOperatorFeePeriod = BigInt.zero();
    dao.executeOperatorFeePeriod = BigInt.zero();
    dao.operatorMaximumFee = BigInt.zero();
  }
  dao.updateType = "MIN_LIQUIDATION_COLLATERAL";
  dao.minimumLiquidationCollateral = event.params.value;
  dao.lastUpdateBlockNumber = event.block.number;
  dao.lastUpdateBlockTimestamp = event.block.timestamp;
  dao.lastUpdateTransactionHash = event.transaction.hash;
  dao.save();
}

export function handleNetworkEarningsWithdrawn(
  event: NetworkEarningsWithdrawnEvent
): void {
  let entity = new NetworkEarningsWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.value = event.params.value;
  entity.recipient = event.params.recipient;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNetworkFeeUpdated(event: NetworkFeeUpdatedEvent): void {
  let entity = new NetworkFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldFee = event.params.oldFee;
  entity.newFee = event.params.newFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let dao = DAOValues.load(event.address);
  if (!dao) {
    log.error(
      `New DAO Event, DAO values store with ID ${daoID} does not exist on the database, creating it`,
      []
    );
    dao = new DAOValues(event.address);
    dao.networkFee = BigInt.zero();
    dao.liquidationThreshold = BigInt.zero();
    dao.minimumLiquidationCollateral = BigInt.zero();
    dao.operatorFeeIncreaseLimit = BigInt.zero();
    dao.declareOperatorFeePeriod = BigInt.zero();
    dao.executeOperatorFeePeriod = BigInt.zero();
    dao.operatorMaximumFee = BigInt.zero();
  }
  dao.updateType = "NETWORK_FEE";
  dao.networkFee = event.params.newFee;
  dao.lastUpdateBlockNumber = event.block.number;
  dao.lastUpdateBlockTimestamp = event.block.timestamp;
  dao.lastUpdateTransactionHash = event.transaction.hash;
  dao.save();
}

export function handleOperatorFeeIncreaseLimitUpdated(
  event: OperatorFeeIncreaseLimitUpdatedEvent
): void {
  let entity = new OperatorFeeIncreaseLimitUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let dao = DAOValues.load(event.address);
  if (!dao) {
    log.error(
      `New DAO Event, DAO values store with ID ${daoID} does not exist on the database, creating it`,
      []
    );
    dao = new DAOValues(event.address);
    dao.networkFee = BigInt.zero();
    dao.liquidationThreshold = BigInt.zero();
    dao.minimumLiquidationCollateral = BigInt.zero();
    dao.operatorFeeIncreaseLimit = BigInt.zero();
    dao.declareOperatorFeePeriod = BigInt.zero();
    dao.executeOperatorFeePeriod = BigInt.zero();
    dao.operatorMaximumFee = BigInt.zero();
  }
  dao.updateType = "OPERATOR_FEE_INCREASE_LIMIT";
  dao.operatorFeeIncreaseLimit = event.params.value;
  dao.lastUpdateBlockNumber = event.block.number;
  dao.lastUpdateBlockTimestamp = event.block.timestamp;
  dao.lastUpdateTransactionHash = event.transaction.hash;
  dao.save();
}

export function handleOperatorMaximumFeeUpdated(
  event: OperatorMaximumFeeUpdatedEvent
): void {
  let entity = new OperatorMaximumFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.maxFee = event.params.maxFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let dao = DAOValues.load(event.address);
  if (!dao) {
    log.error(
      `New DAO Event, DAO values store with ID ${daoID} does not exist on the database, creating it`,
      []
    );
    dao = new DAOValues(event.address);
    dao.networkFee = BigInt.zero();
    dao.liquidationThreshold = BigInt.zero();
    dao.minimumLiquidationCollateral = BigInt.zero();
    dao.operatorFeeIncreaseLimit = BigInt.zero();
    dao.declareOperatorFeePeriod = BigInt.zero();
    dao.executeOperatorFeePeriod = BigInt.zero();
    dao.operatorMaximumFee = BigInt.zero();
  }
  dao.updateType = "DECLARE_OPERATOR_FEE_PERIOD";
  dao.operatorMaximumFee = event.params.maxFee;
  dao.lastUpdateBlockNumber = event.block.number;
  dao.lastUpdateBlockTimestamp = event.block.timestamp;
  dao.lastUpdateTransactionHash = event.transaction.hash;
  dao.save();
}

// ###### Cluster Events ######

export function handleClusterDeposited(event: ClusterDepositedEvent): void {
  let entity = new ClusterDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operatorIds = event.params.operatorIds;
  entity.value = event.params.value;
  entity.cluster_validatorCount = event.params.cluster.validatorCount;
  entity.cluster_networkFeeIndex = event.params.cluster.networkFeeIndex;
  entity.cluster_index = event.params.cluster.index;
  entity.cluster_active = event.params.cluster.active;
  entity.cluster_balance = event.params.cluster.balance;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let owner = Account.load(event.params.owner);
  if (!owner) {
    owner = new Account(event.params.owner);
    owner.nonce = BigInt.zero();
    owner.save();
  }

  let clusterId = `${event.params.owner.toHexString()}-${event.params.operatorIds.join(
    "-"
  )}`;
  let cluster = Cluster.load(clusterId);
  if (!cluster) {
    log.error(
      `Cluster ${clusterId} is being deposited, but it does not exist on the database`,
      []
    );
    cluster = new Cluster(clusterId);
  }

  cluster.owner = owner.id;
  cluster.operatorIds = event.params.operatorIds;
  cluster.validatorCount = event.params.cluster.validatorCount;
  log.info(
    `Set validator count of cluster ${cluster.id} to ${event.params.cluster.validatorCount}`,
    []
  );
  cluster.networkFeeIndex = event.params.cluster.networkFeeIndex;
  cluster.index = event.params.cluster.index;
  cluster.active = event.params.cluster.active;
  cluster.balance = event.params.cluster.balance;
  cluster.lastUpdateBlockNumber = event.block.number;
  cluster.lastUpdateBlockTimestamp = event.block.timestamp;
  cluster.lastUpdateTransactionHash = event.transaction.hash;
  cluster.save();
}

export function handleClusterLiquidated(event: ClusterLiquidatedEvent): void {
  let entity = new ClusterLiquidated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operatorIds = event.params.operatorIds;
  entity.cluster_validatorCount = event.params.cluster.validatorCount;
  entity.cluster_networkFeeIndex = event.params.cluster.networkFeeIndex;
  entity.cluster_index = event.params.cluster.index;
  entity.cluster_active = event.params.cluster.active;
  entity.cluster_balance = event.params.cluster.balance;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let owner = Account.load(event.params.owner);
  if (!owner) {
    owner = new Account(event.params.owner);
    owner.nonce = BigInt.zero();
    owner.save();
  }

  let clusterId = `${event.params.owner.toHexString()}-${event.params.operatorIds.join(
    "-"
  )}`;
  let cluster = Cluster.load(clusterId);
  if (!cluster) {
    log.error(
      `Cluster ${clusterId} is being liquidated, but it does not exist on the database`,
      []
    );
    cluster = new Cluster(clusterId);
  }

  cluster.owner = owner.id;
  cluster.operatorIds = event.params.operatorIds;
  cluster.validatorCount = event.params.cluster.validatorCount;
  log.info(
    `Set validator count of cluster ${cluster.id} to ${event.params.cluster.validatorCount}`,
    []
  );
  cluster.networkFeeIndex = event.params.cluster.networkFeeIndex;
  cluster.index = event.params.cluster.index;
  cluster.active = event.params.cluster.active;
  cluster.balance = event.params.cluster.balance;
  cluster.lastUpdateBlockNumber = event.block.number;
  cluster.lastUpdateBlockTimestamp = event.block.timestamp;
  cluster.lastUpdateTransactionHash = event.transaction.hash;
  cluster.save();
}

export function handleClusterReactivated(event: ClusterReactivatedEvent): void {
  let entity = new ClusterReactivated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operatorIds = event.params.operatorIds;
  entity.cluster_validatorCount = event.params.cluster.validatorCount;
  entity.cluster_networkFeeIndex = event.params.cluster.networkFeeIndex;
  entity.cluster_index = event.params.cluster.index;
  entity.cluster_active = event.params.cluster.active;
  entity.cluster_balance = event.params.cluster.balance;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let owner = Account.load(event.params.owner);
  if (!owner) {
    owner = new Account(event.params.owner);
    owner.nonce = BigInt.zero();
    owner.save();
  }

  let clusterId = `${event.params.owner.toHexString()}-${event.params.operatorIds.join(
    "-"
  )}`;
  let cluster = Cluster.load(clusterId);
  if (!cluster) {
    log.error(
      `Cluster ${clusterId} is being reactivated, but it does not exist on the database`,
      []
    );
    cluster = new Cluster(clusterId);
  }

  cluster.owner = owner.id;
  cluster.operatorIds = event.params.operatorIds;
  cluster.validatorCount = event.params.cluster.validatorCount;
  log.info(
    `Set validator count of cluster ${cluster.id} to ${event.params.cluster.validatorCount}`,
    []
  );
  cluster.networkFeeIndex = event.params.cluster.networkFeeIndex;
  cluster.index = event.params.cluster.index;
  cluster.active = event.params.cluster.active;
  cluster.balance = event.params.cluster.balance;
  cluster.lastUpdateBlockNumber = event.block.number;
  cluster.lastUpdateBlockTimestamp = event.block.timestamp;
  cluster.lastUpdateTransactionHash = event.transaction.hash;
  cluster.save();
}

export function handleClusterWithdrawn(event: ClusterWithdrawnEvent): void {
  let entity = new ClusterWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operatorIds = event.params.operatorIds;
  entity.value = event.params.value;
  entity.cluster_validatorCount = event.params.cluster.validatorCount;
  entity.cluster_networkFeeIndex = event.params.cluster.networkFeeIndex;
  entity.cluster_index = event.params.cluster.index;
  entity.cluster_active = event.params.cluster.active;
  entity.cluster_balance = event.params.cluster.balance;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let owner = Account.load(event.params.owner);
  if (!owner) {
    owner = new Account(event.params.owner);
    owner.nonce = BigInt.zero();
    owner.save();
  }

  let clusterId = `${event.params.owner.toHexString()}-${event.params.operatorIds.join(
    "-"
  )}`;
  let cluster = Cluster.load(clusterId);
  if (!cluster) {
    log.error(
      `Cluster ${clusterId} is being withdrawn, but it does not exist on the database`,
      []
    );
    cluster = new Cluster(clusterId);
  }

  cluster.owner = owner.id;
  cluster.operatorIds = event.params.operatorIds;
  cluster.validatorCount = event.params.cluster.validatorCount;
  log.info(
    `Set validator count of cluster ${cluster.id} to ${event.params.cluster.validatorCount}`,
    []
  );
  cluster.networkFeeIndex = event.params.cluster.networkFeeIndex;
  cluster.index = event.params.cluster.index;
  cluster.active = event.params.cluster.active;
  cluster.balance = event.params.cluster.balance;
  cluster.lastUpdateBlockNumber = event.block.number;
  cluster.lastUpdateBlockTimestamp = event.block.timestamp;
  cluster.lastUpdateTransactionHash = event.transaction.hash;
  cluster.save();
}

export function handleValidatorAdded(event: ValidatorAddedEvent): void {
  let entity = new ValidatorAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operatorIds = event.params.operatorIds;
  entity.publicKey = event.params.publicKey;
  entity.shares = event.params.shares;
  entity.cluster_validatorCount = event.params.cluster.validatorCount;
  entity.cluster_networkFeeIndex = event.params.cluster.networkFeeIndex;
  entity.cluster_index = event.params.cluster.index;
  entity.cluster_active = event.params.cluster.active;
  entity.cluster_balance = event.params.cluster.balance;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let owner = Account.load(event.params.owner);
  if (!owner) {
    owner = new Account(event.params.owner);
    log.info(
      `New Address ${owner.id.toHexString()} is adding a validator, creating new Account`,
      []
    );
    owner.nonce = BigInt.zero();
  }
  log.info(
    `Old nonce of Account ${owner.id.toHexString()}: ${owner.nonce}`,
    []
  );
  owner.nonce = owner.nonce.plus(BigInt.fromI32(1));
  log.info(
    `Increased nonce of Account ${owner.id.toHexString()} to ${owner.nonce}`,
    []
  );
  owner.save();

  let clusterId = `${event.params.owner.toHexString()}-${event.params.operatorIds.join(
    "-"
  )}`;
  let cluster = Cluster.load(clusterId);
  if (!cluster) {
    log.info(
      `Validator ${event.params.publicKey.toHexString()} is being added to new Cluster ${clusterId}`,
      []
    );
    cluster = new Cluster(clusterId);
  }

  cluster.owner = owner.id;
  cluster.operatorIds = event.params.operatorIds;
  cluster.validatorCount = event.params.cluster.validatorCount;
  log.info(
    `Set validator count of cluster ${cluster.id} to ${event.params.cluster.validatorCount}`,
    []
  );
  cluster.networkFeeIndex = event.params.cluster.networkFeeIndex;
  cluster.index = event.params.cluster.index;
  cluster.active = event.params.cluster.active;
  cluster.balance = event.params.cluster.balance;
  cluster.lastUpdateBlockNumber = event.block.number;
  cluster.lastUpdateBlockTimestamp = event.block.timestamp;
  cluster.lastUpdateTransactionHash = event.transaction.hash;
  cluster.save();

  let validatorId = event.params.publicKey;
  let validator = Validator.load(validatorId);
  if (!validator) {
    log.info(
      `new Validator ${event.params.publicKey.toHexString()} being added to Cluster ${clusterId}`,
      []
    );
    validator = new Validator(validatorId);
  }

  validator.owner = owner.id; // this does not sound right 🧐
  validator.operators = event.params.operatorIds.map<string>((id: BigInt) =>
    id.toString()
  );
  validator.cluster = cluster.id; // this does not sound right 🧐
  validator.active = event.params.cluster.active;
  validator.valid = false;
  validator.shares = event.params.shares;
  validator.lastUpdateBlockNumber = event.block.number;
  validator.lastUpdateBlockTimestamp = event.block.timestamp;
  validator.lastUpdateTransactionHash = event.transaction.hash;
  validator.save();
}

// function splitArray(parts: number, arr: Uint8Array): Uint8Array[] {
//   const partLength = Math.floor(arr.length / parts);
//   const partsArr = [];
//   for (let i = 0; i < parts; i++) {
//     const start = i * partLength;
//     const end = start + partLength;
//     partsArr.push(arr.slice(start, end));
//   }
//   return partsArr;
// }

// function extractSharesFromBytes(
//   bytes: Bytes,
//   operatorCount: number
// ): { sharesPublicKeys: string[]; encryptedKeys: string[] } {
//   // Validate the byte string format (hex string starting with '0x')
//   let bytesString = bytes.toString();
//   if (!bytesString.startsWith("0x")) {
//     throw new Error("Invalid byte string format");
//   }

//   // Validate the operator count (positive integer)
//   if (operatorCount <= 0 || !isInteger(operatorCount)) {
//     log.error("Invalid operator count", []);
//     throw new Error("Invalid operator count");
//   }

//   const sharesPt = bytesString.replace("0x", "").substring(SIGNATURE_LENGHT);

//   const pkSplit = sharesPt.substring(0, operatorCount * PUBLIC_KEY_LENGHT);
//   const pkArray = ByteArray.fromHexString("0x" + pkSplit);
//   const sharesPublicKeys = splitArray(operatorCount, pkArray).map((item) =>
//     ByteArray.fromUTF8(item.toString()).toHexString()
//   );

//   const eSplit = bytesString.substring(operatorCount * PUBLIC_KEY_LENGHT);
//   const eArray = ByteArray.fromHexString("0x" + eSplit);
//   const encryptedKeys = splitArray(operatorCount, eArray).map((item) =>
//     Buffer.from(
//       ByteArray.fromUTF8(item.toString())
//         .toHexString()
//         .replace("0x", ""),
//       "hex"
//     ).toString("base64")
//   );

//   // if everything is ok, return true
//   return { sharesPublicKeys, encryptedKeys };
// }

// async function validateSingleShares(
//   shares: Bytes,
//   fromSignatureData: {
//     ownerNonce: BigInt;
//     publicKey: Bytes;
//     ownerAddress: Address;
//   }
// ): Promise<void> {
//   const { ownerAddress, ownerNonce, publicKey } = fromSignatureData;
//   if (!isInteger(ownerNonce) || ownerNonce < 0) {
//     throw new Error(`Owner nonce is not positive integer ${ownerNonce}`);
//   }

//   const address = web3.utils.toChecksumAddress(ownerAddress.toString());
//   const signaturePt = shares
//     .toString()
//     .replace("0x", "")
//     .substring(0, SIGNATURE_LENGHT);
//   if (!bls.deserializeHexStrToSecretKey) {
//     await bls.init(bls.BLS12_381);
//   }

//   const blsPublicKey = bls.deserializeHexStrToPublicKey(
//     publicKey.toHexString().replace("0x", "")
//   );
//   const signature = bls.deserializeHexStrToSignature(signaturePt);

//   const messageHash = crypto.keccak256(
//     ByteArray.fromUTF8(`${address}:${ownerNonce}`)
//   );

//   if (!blsPublicKey.verify(signature, new Uint8Array(messageHash))) {
//     throw new Error(`Single shares signature is invalid 0x${signaturePt}`);
//   }
// }

// function deserializeHexStrToPublicKey(sharesPublicKeys: string[]) {
//   const cantDeserializeSharePublicKeys = [];
//   for (const sharesPublicKey of sharesPublicKeys) {
//     try {
//       bls.deserializeHexStrToPublicKey(sharesPublicKey.replace("0x", ""));
//     } catch (e) {
//       cantDeserializeSharePublicKeys.push(sharesPublicKey);
//     }
//   }
//   if (cantDeserializeSharePublicKeys.length || !sharesPublicKeys.length) {
//     throw new Error(JSON.stringify(cantDeserializeSharePublicKeys));
//   }
// }

// async function validateShares(item: ValidatorAddedEvent, owner: Account) {
//   let error;
//   let isValid = true;
//   let sharesPublicKeys;

//   // Try to save public keys and encrypted keys anywhere regardless of further validations
//   try {
//     const shares = extractSharesFromBytes(
//       item.params.shares,
//       item.params.operatorIds.length
//     );
//     sharesPublicKeys = shares.sharesPublicKeys;
//   } catch (e) {
//     error = e;
//     log.error("Can not extract shares from bytes", []);
//   }

//   // Now validate signature, regardless if shares extracted or not
//   if (!error) {
//     let fromSignatureData;
//     try {
//       fromSignatureData = {
//         ownerNonce: owner.nonce,
//         publicKey: item.params.publicKey,
//         ownerAddress: item.params.owner,
//       };

//       await validateSingleShares(item.params.shares, fromSignatureData);
//     } catch (e) {
//       error = e;
//       log.error("Failed to validate single shares", []);
//       if (owner.nonce) {
//         log.error(`Used nonce: ${owner.nonce}.`, []);
//       }
//       log.error(`Signature Data: ${fromSignatureData}`, []);
//     }
//   }

//   // validate deserialization of all public keys in shares
//   if (!error && sharesPublicKeys) {
//     try {
//       deserializeHexStrToPublicKey(sharesPublicKeys);
//     } catch (e) {
//       error = e;
//       log.error("Can not deserialize shares public keys", []);
//     }
//   }

//   // validate deserialization of validator public key
//   try {
//     const pubkey = bls.deserializeHexStrToPublicKey(
//       item.params.publicKey.toHexString().replace("0x", "")
//     );
//   } catch (e) {
//     error = e;
//     log.error("Can not deserialize validator public key", []);
//   }

//   // Save errors
//   if (error) {
//     isValid = false;
//     log.error(
//       `Validator ${item.params.publicKey} shares validation failed: ${error.message}`,
//       []
//     );
//   }
//   return isValid;
// }

export function handleValidatorRemoved(event: ValidatorRemovedEvent): void {
  let entity = new ValidatorRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operatorIds = event.params.operatorIds;
  entity.publicKey = event.params.publicKey;
  entity.cluster_validatorCount = event.params.cluster.validatorCount;
  entity.cluster_networkFeeIndex = event.params.cluster.networkFeeIndex;
  entity.cluster_index = event.params.cluster.index;
  entity.cluster_active = event.params.cluster.active;
  entity.cluster_balance = event.params.cluster.balance;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let owner = Account.load(event.params.owner);
  if (!owner) {
    owner = new Account(event.params.owner);
    owner.nonce = BigInt.zero();
    owner.save();
  }

  let clusterId = `${event.params.owner.toHexString()}-${event.params.operatorIds.join(
    "-"
  )}`;
  let cluster = Cluster.load(clusterId);
  if (!cluster) {
    log.error(
      `Validator ${event.params.publicKey.toHexString()} is being removed from Cluster ${clusterId} which does not exist on DB`,
      []
    );
    cluster = new Cluster(clusterId);
  }

  cluster.owner = owner.id;
  cluster.operatorIds = event.params.operatorIds;
  cluster.validatorCount = event.params.cluster.validatorCount;
  log.info(
    `Set validator count of cluster ${cluster.id} to ${event.params.cluster.validatorCount}`,
    []
  );
  cluster.networkFeeIndex = event.params.cluster.networkFeeIndex;
  cluster.index = event.params.cluster.index;
  cluster.active = event.params.cluster.active;
  cluster.balance = event.params.cluster.balance;
  cluster.lastUpdateBlockNumber = event.block.number;
  cluster.lastUpdateBlockTimestamp = event.block.timestamp;
  cluster.lastUpdateTransactionHash = event.transaction.hash;
  cluster.save();

  let validatorId = event.params.publicKey;
  let validator = Validator.load(validatorId);
  if (!validator) {
    log.info(
      `new Validator ${event.params.publicKey.toHexString()} being added to Cluster ${clusterId}`,
      []
    );
    log.error(
      `Could not create ${event.params.publicKey.toHexString()} on the database, because of missing shares information`,
      []
    );
  } else {
    validator.operators = event.params.operatorIds.map<string>((id: BigInt) =>
      id.toString()
    );
    validator.owner = owner.id; // this does not sound right 🧐
    validator.active = false;
    validator.lastUpdateBlockNumber = event.block.number;
    validator.lastUpdateBlockTimestamp = event.block.timestamp;
    validator.lastUpdateTransactionHash = event.transaction.hash;
    validator.save();
  }
}

// ###### Operator Events ######

export function handleOperatorAdded(event: OperatorAddedEvent): void {
  let entity = new OperatorAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operatorId = event.params.operatorId;
  entity.owner = event.params.owner;
  entity.publicKey = event.params.publicKey;
  entity.fee = event.params.fee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let owner = Account.load(event.params.owner);
  if (!owner) {
    owner = new Account(event.params.owner);
    owner.nonce = BigInt.zero();
    owner.save();
  }

  let operatorId = event.params.operatorId.toString();
  let operator = Operator.load(operatorId);
  if (!operator) {
    operator = new Operator(operatorId);
    operator.operatorId = event.params.operatorId;
    operator.owner = owner.id;
    operator.publicKey = event.params.publicKey;
    operator.active = true;
    operator.fee = event.params.fee;
    operator.previousFee = event.params.fee;
    operator.whitelisted = [];
    operator.isPrivate = false;
    operator.whitelistedContract = new Address(
      0x0000000000000000000000000000000000000000
    );
    operator.totalWithdrawn = BigInt.zero();
  }

  operator.lastUpdateBlockNumber = event.block.number;
  operator.lastUpdateBlockTimestamp = event.block.timestamp;
  operator.lastUpdateTransactionHash = event.transaction.hash;
  operator.save();
}

export function handleOperatorFeeDeclarationCancelled(
  event: OperatorFeeDeclarationCancelledEvent
): void {
  let entity = new OperatorFeeDeclarationCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operatorId = event.params.operatorId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let owner = Account.load(event.params.owner);
  if (!owner) {
    log.error(
      `Cancelling fee declaration for Operator ${
        event.params.operatorId
      }, but Owner ${event.params.owner.toHexString()} did not exist on the database`,
      []
    );
    owner = new Account(event.params.owner);
    owner.nonce = BigInt.zero();
    owner.save();
  }

  let operatorId = event.params.operatorId.toString();
  let operator = Operator.load(operatorId);
  if (!operator) {
    log.error(
      `Cancelling fee declaration for Operator ${event.params.operatorId}, but it does not exist on the database`,
      []
    );
    log.error(
      `Could not create ${operatorId} on the database, because of missing publicKey and fee information`,
      []
    );
  } else {
    operator.operatorId = event.params.operatorId;
    operator.owner = owner.id;
    operator.fee = operator.previousFee; // reset fee to previous one, as fee change was cancelled
    operator.lastUpdateBlockNumber = event.block.number;
    operator.lastUpdateBlockTimestamp = event.block.timestamp;
    operator.lastUpdateTransactionHash = event.transaction.hash;
    operator.save();
  }
}

export function handleOperatorFeeDeclared(
  event: OperatorFeeDeclaredEvent
): void {
  let entity = new OperatorFeeDeclared(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operatorId = event.params.operatorId;
  entity.blockNumber = event.params.blockNumber;
  entity.fee = event.params.fee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let owner = Account.load(event.params.owner);
  if (!owner) {
    log.error(
      `Declaring fees for Operator ${
        event.params.operatorId
      }, but Owner ${event.params.owner.toHexString()} did not exist on the database`,
      []
    );
    owner = new Account(event.params.owner);
    owner.nonce = BigInt.zero();
    owner.save();
  }

  let operatorId = event.params.operatorId.toString();
  let operator = Operator.load(operatorId);
  if (!operator) {
    log.error(
      `Declaring fees for Operator ${event.params.operatorId}, but it does not exist on the database`,
      []
    );
    log.error(
      `Could not create ${operatorId} on the database, because of missing publicKey and fee information`,
      []
    );
  } else {
    operator.operatorId = event.params.operatorId;
    operator.owner = owner.id;
    operator.previousFee = operator.fee; // storing current fee, in case fee change gets cancelled
    operator.fee = event.params.fee;
    operator.lastUpdateBlockNumber = event.block.number;
    operator.lastUpdateBlockTimestamp = event.block.timestamp;
    operator.lastUpdateTransactionHash = event.transaction.hash;
    operator.save();
  }
}

export function handleOperatorFeeExecuted(
  event: OperatorFeeExecutedEvent
): void {
  let entity = new OperatorFeeExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operatorId = event.params.operatorId;
  entity.blockNumber = event.params.blockNumber;
  entity.fee = event.params.fee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let owner = Account.load(event.params.owner);
  if (!owner) {
    log.error(
      `Executing fees change for Operator ${
        event.params.operatorId
      }, but Owner ${event.params.owner.toHexString()} did not exist on the database`,
      []
    );
    owner = new Account(event.params.owner);
    owner.nonce = BigInt.zero();
    owner.save();
  }

  let operatorId = event.params.operatorId.toString();
  let operator = Operator.load(operatorId);
  if (!operator) {
    log.error(
      `Executing fees change for Operator ${event.params.operatorId}, but it does not exist on the database`,
      []
    );
    log.error(
      `Could not create ${operatorId} on the database, because of missing publicKey information`,
      []
    );
  } else {
    operator.operatorId = event.params.operatorId;
    operator.owner = owner.id;
    operator.fee = event.params.fee;
    operator.lastUpdateBlockNumber = event.block.number;
    operator.lastUpdateBlockTimestamp = event.block.timestamp;
    operator.lastUpdateTransactionHash = event.transaction.hash;
    operator.save();
  }
}

export function handleOperatorRemoved(event: OperatorRemovedEvent): void {
  let entity = new OperatorRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operatorId = event.params.operatorId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let operatorId = event.params.operatorId.toString();
  let operator = Operator.load(operatorId);
  if (!operator) {
    log.error(
      `Operator ${operatorId} is being removed, but it does not exist on the database`,
      []
    );
    log.error(
      `Could not create ${operatorId} on the database, because of missing owner information`,
      []
    );
  } else {
    operator.operatorId = event.params.operatorId;
    operator.active = false;
    operator.lastUpdateBlockNumber = event.block.number;
    operator.lastUpdateBlockTimestamp = event.block.timestamp;
    operator.lastUpdateTransactionHash = event.transaction.hash;
    operator.save();
  }
}

export function handleOperatorMultipleWhitelistUpdated(
  event: OperatorMultipleWhitelistUpdatedEvent
): void {
  let entity = new OperatorMultipleWhitelistUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.operatorIds = event.params.operatorIds;
  entity.whitelistAddresses = changetype<Bytes[]>(
    event.params.whitelistAddresses
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let whitelistIDList: Bytes[] = [];
  for (var i = 0; i < event.params.whitelistAddresses.length; i++) {
    let whitelisted = Account.load(event.params.whitelistAddresses[i]);
    if (!whitelisted) {
      log.info(
        `Adding new whitelisted address ${event.params.whitelistAddresses[
          i
        ].toHexString()} to Multiple Operators: ${
          event.params.operatorIds
        }}, this is a new Account`,
        []
      );
      whitelisted = new Account(event.params.whitelistAddresses[i]);
      whitelisted.nonce = BigInt.zero();
      whitelisted.save();
    }
    whitelistIDList.push(whitelisted.id);
  }

  for (let j = 0; j < event.params.operatorIds.length; j++) {
    let operatorId = event.params.operatorIds[j].toString();
    let operator = Operator.load(operatorId);
    if (!operator) {
      log.error(
        `Executing whitelist additions for Operator ${event.params.operatorIds[j]}, but it does not exist on the database`,
        []
      );
      log.error(
        `Could not create ${operatorId} on the database, because of missing owner, publicKey and fee information`,
        []
      );
    } else {
      if (!operator.whitelisted) {
        operator.whitelisted = [];
      }
      operator.operatorId = event.params.operatorIds[j];
      operator.whitelisted = operator.whitelisted.concat(whitelistIDList);
      operator.lastUpdateBlockNumber = event.block.number;
      operator.lastUpdateBlockTimestamp = event.block.timestamp;
      operator.lastUpdateTransactionHash = event.transaction.hash;
      operator.save();
    }
  }
}

export function handleOperatorMultipleWhitelistRemoved(
  event: OperatorMultipleWhitelistRemovedEvent
): void {
  let entity = new OperatorMultipleWhitelistRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operatorIds = event.params.operatorIds;
  entity.whitelistAddresses = changetype<Bytes[]>(
    event.params.whitelistAddresses
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let whitelistIDList: Bytes[] = [];
  let whitelistAddressSet = new Set<Bytes>();
  for (let i = 0; i < event.params.whitelistAddresses.length; i++) {
    let address = event.params.whitelistAddresses[i];
    let whitelisted = Account.load(address);
    if (!whitelisted) {
      log.info(
        `Removing whitelisted address ${address.toHexString()} to Multiple Operators: ${
          event.params.operatorIds
        }, this is a new Account`,
        []
      );
      whitelisted = new Account(address);
      whitelisted.nonce = BigInt.zero();
      whitelisted.save();
    }
    whitelistIDList.push(whitelisted.id);
    whitelistAddressSet.add(whitelisted.id);
  }

  for (let j = 0; j < event.params.operatorIds.length; j++) {
    let operatorId = event.params.operatorIds[j].toString();
    let operator = Operator.load(operatorId);
    if (!operator) {
      log.error(
        `Executing whitelist removals for Operator ${event.params.operatorIds[j]}, but it does not exist on the database`,
        []
      );
      log.error(
        `Could not create ${operatorId} on the database, because of missing owner, publicKey and fee information`,
        []
      );
    } else {
      if (!operator.whitelisted) {
        operator.whitelisted = [];
      }

      operator.operatorId = event.params.operatorIds[j];

      let whitelistArray = operator.whitelisted;
      for (let k = 0; k < whitelistArray.length; k++) {
        if (whitelistAddressSet.has(whitelistArray[k])) {
          whitelistArray.splice(k, 1);
        }
      }
      operator.whitelisted = whitelistArray;
      operator.lastUpdateBlockNumber = event.block.number;
      operator.lastUpdateBlockTimestamp = event.block.timestamp;
      operator.lastUpdateTransactionHash = event.transaction.hash;
      operator.save();
    }
  }
}

export function handleOperatorWhitelistingContractUpdated(
  event: OperatorWhitelistingContractUpdatedEvent
): void {
  let entity = new OperatorWhitelistingContractUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.operatorIds = event.params.operatorIds;
  entity.whitelistingContract = event.params.whitelistingContract;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  for (var i = 0; i < event.params.operatorIds.length; i++) {
    let operatorId = event.params.operatorIds[i].toString();
    let operator = Operator.load(operatorId);
    if (!operator) {
      log.error(
        `Executing whitelist contract updates for Operator ${event.params.operatorIds[i]}, but it does not exist on the database`,
        []
      );
      log.error(
        `Could not create ${operatorId} on the database, because of missing owner, publicKey and fee information`,
        []
      );
    } else {
      if (!operator.whitelisted) {
        operator.whitelisted = [];
      }
      operator.operatorId = event.params.operatorIds[i];
      operator.whitelistedContract = event.params.whitelistingContract;
      operator.lastUpdateBlockNumber = event.block.number;
      operator.lastUpdateBlockTimestamp = event.block.timestamp;
      operator.lastUpdateTransactionHash = event.transaction.hash;
      operator.save();
    }
  }
}

export function handleOperatorPrivacyStatusUpdated(
  event: OperatorPrivacyStatusUpdatedEvent
): void {
  let entity = new OperatorPrivacyStatusUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.operatorIds = event.params.operatorIds;
  entity.toPrivate = event.params.toPrivate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  for (var i = 0; i < event.params.operatorIds.length; i++) {
    let operatorId = event.params.operatorIds[i].toString();
    let operator = Operator.load(operatorId);
    if (!operator) {
      log.error(
        `Executing privacy status updates for Operator ${event.params.operatorIds[i]}, but it does not exist on the database`,
        []
      );
      log.error(
        `Could not create ${operatorId} on the database, because of missing owner, publicKey and fee information`,
        []
      );
    } else {
      if (!operator.whitelisted) {
        operator.whitelisted = [];
      }
      operator.operatorId = event.params.operatorIds[i];
      operator.isPrivate = event.params.toPrivate;
      operator.lastUpdateBlockNumber = event.block.number;
      operator.lastUpdateBlockTimestamp = event.block.timestamp;
      operator.lastUpdateTransactionHash = event.transaction.hash;
      operator.save();
    }
  }
}

export function handleOperatorWithdrawn(event: OperatorWithdrawnEvent): void {
  let entity = new OperatorWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operatorId = event.params.operatorId;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let owner = Account.load(event.params.owner);
  if (!owner) {
    log.error(
      `Executing fees change for Operator ${
        event.params.operatorId
      }, but Owner ${event.params.owner.toHexString()} did not exist on the database`,
      []
    );
    owner = new Account(event.params.owner);
    owner.nonce = BigInt.zero();
    owner.save();
  }

  let operatorId = event.params.operatorId.toString();
  let operator = Operator.load(operatorId);
  if (!operator) {
    log.error(
      `Executing fees change for Operator ${event.params.operatorId}, but it does not exist on the database`,
      []
    );
    log.error(
      `Could not create ${operatorId} on the database, because of missing publicKey and fee information`,
      []
    );
  } else {
    operator.operatorId = event.params.operatorId;
    operator.totalWithdrawn.minus(event.params.value);
    operator.lastUpdateBlockNumber = event.block.number;
    operator.lastUpdateBlockTimestamp = event.block.timestamp;
    operator.lastUpdateTransactionHash = event.transaction.hash;
    operator.save();
  }
}
