import { ILanguage } from "./interfaces";

export class PTBRLanguage implements ILanguage {
  getHabitLoadedSuccessfullyMessage(name: string): string {
    return "Vício carregado com sucesso";
  }

  getHabitNotLoadedMessage(name: string): string {
    return "Vício não pôde ser encontrado";
  }

  getHabitRemovedSuccessfullyMessage(_name: string): string {
    return "Vício removido com sucesso";
  }

  getHabitNotRemovedMessage(_name: string): string {
    return "Vício não pôde ser removido";
  }

  getNoHabitFoundErrorMessage(): string {
    return "Nenhum vício foi encontrado";
  }

  getHabitsLoadedSuccessfullyMessage(): string {
    return "Vícios listados com sucesso";
  }

  getHabitsNotLoadedMessage(): string {
    return "Houve um problema ao listar seus vícios";
  }

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
