import { Request, Response } from "express";

import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";

import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsController {

  async create (request: Request, response: Response){
    const { chat, username } = request.body;

    // passar esse trampo para o service correspondente
    // receber o retorno do service
    // e montar a response

    try {
      const settingsRepository = getCustomRepository(SettingsRepository);

      const userAlreadyExists = await settingsRepository.findOne({
        username
      });

      if (userAlreadyExists){
        throw new Error("User already exists!");
      }

      const settings = settingsRepository.create({
        chat,
        username,
      });
    
      await settingsRepository.save(settings);
  
      return response.json(settings);
    }catch(err){
      return response.status(400).json({
        message: err.message
      });
    }
  }


}

export { SettingsController };