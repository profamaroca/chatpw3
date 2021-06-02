import { Repository, EntityRepository } from "typeorm";

import { Setting } from "../entities/Setting";

// será filha da classe Repository, herdando tudo que ela tem
@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting>{}

export { SettingsRepository }