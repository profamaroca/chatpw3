import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {

  async create (request: Request, response: Response){
    const { chat, username } = request.body;

    // passar esse trampo para o service correspondente
    // receber o retorno do service
    // e montar a response

    const settingsService = new SettingsService();

    try {
      const settings = await settingsService.create({chat, username});
  
      return response.json(settings);
    }catch(err){
      return response.status(400).json({
        message: err.message
      });
    }
  }


}

export { SettingsController };