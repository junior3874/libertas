import { ILanguage } from "./ILanguage";

export class PTBRLanguage implements ILanguage {
  getSuccessToastTitle(): string {
    return "Sucesso";
  }

  getErrorToastTitle(): string {
    return "Error";
  }

  getHabitCreatedSuccessfullyMessage(_name: string): string {
    return "Vício criado com sucesso";
  }

  getHabitNotCreatedMessage(_name: string): string {
    return "Vício não pôde ser criado";
  }

  getHabitAlreadyExistsErrorMessage(name: string): string {
    return `Vício '${name}' já existe`;
  }

  getMissingParamsErrorMessage(params: string[]): string {
    return `Você precisa especificar: ${params.join(", ")}`;
  }

  getHabitNameParamMessage(): string {
    return "nome";
  }

  getPerformedLastDateParamMessage(): string {
    return "última data";
  }
}
