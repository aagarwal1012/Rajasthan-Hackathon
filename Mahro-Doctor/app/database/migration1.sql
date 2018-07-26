ALTER TABLE `mahro_doctor`.`doctors` 
ADD COLUMN `aadhar` VARCHAR(45) NULL AFTER `district`,
ADD UNIQUE INDEX `aadhar_UNIQUE` (`aadhar` ASC);
;
ALTER TABLE `mahro_doctor`.`users` 
ADD COLUMN `aadhar` VARCHAR(45) NULL AFTER `district`,
ADD UNIQUE INDEX `aadhar_UNIQUE` (`aadhar` ASC);
;
